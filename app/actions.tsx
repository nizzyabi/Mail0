import { ConnectionError, AuthError, GenericError } from "@/components/ai/error-messages";
import { createAI, createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { Message, TextStreamMessage } from "@/components/ai/messages";
import { EmailSummary } from "@/components/ai/email-summary";
import { CoreMessage, generateId } from "ai";
import { $fetch } from "@/lib/auth-client";
import { openai } from "@ai-sdk/openai";
import type { ReactNode } from "react";
import * as React from "react";
import { z } from "zod";

// Define all necessary types
interface EmailData {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  labels: Array<{
    id: string;
    name: string;
  }>;
}

interface EmailStats {
  totalEmails: number;
  topSenders: Array<[string, number]>;
  commonSubjects: string[];
  timeOfDay: {
    morning: number;
    afternoon: number;
    evening: number;
  };
  suspiciousEmails: Array<{
    subject: string;
    from: string;
    reason: string;
  }>;
  unreadCount: number;
}

interface InitialThread {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  sender: {
    name: string;
    email: string;
  };
  receivedOn: string;
  unread: boolean;
}

interface ThreadsResponse {
  threads: InitialThread[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

interface MailResponse {
  data: ThreadsResponse;
}

interface ConnectionResponse {
  connections: Array<{
    id: string;
    email: string;
    name: string;
    picture: string;
    createdAt: string;
  }>;
}

// Helper function to analyze emails
function analyzeEmails(emails: EmailData[]): EmailStats {
  console.log("📊 Starting email analysis...", { totalEmails: emails.length });

  const stats: EmailStats = {
    totalEmails: emails.length,
    topSenders: [],
    commonSubjects: [],
    timeOfDay: { morning: 0, afternoon: 0, evening: 0 },
    suspiciousEmails: [],
    unreadCount: 0,
  };

  const senderCount = new Map<string, number>();
  const wordCount = new Map<string, number>();
  const suspiciousKeywords = [
    "urgent",
    "account suspended",
    "verify account",
    "lottery",
    "winner",
    "inheritance",
    "bank transfer",
    "cryptocurrency",
    "investment opportunity",
    "password expired",
    "security alert",
  ];
  const suspiciousTLDs = [".xyz", ".tk", ".ml", ".ga", ".cf"];

  for (const email of emails) {
    // Log suspicious patterns found
    const suspiciousPatterns = [];

    const sender = email.from;
    senderCount.set(sender, (senderCount.get(sender) || 0) + 1);

    const words = email.subject
      .toLowerCase()
      .split(/\s+/)
      .filter((word: string) => word.length > 3);

    for (const word of words) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    // Spam/Suspicious detection
    const subjectLower = email.subject.toLowerCase();
    const fromLower = email.from.toLowerCase();

    // Check for suspicious keywords in subject
    const foundKeywords = suspiciousKeywords.filter((keyword) =>
      subjectLower.includes(keyword.toLowerCase()),
    );
    if (foundKeywords.length > 0) {
      suspiciousPatterns.push(`Keywords found: ${foundKeywords.join(", ")}`);
    }

    // Check for suspicious TLDs
    const hasSuspiciousTLD = suspiciousTLDs.some((tld) => fromLower.endsWith(tld));
    if (hasSuspiciousTLD) {
      suspiciousPatterns.push(`Suspicious TLD detected in: ${fromLower}`);
    }

    // Check for mismatched sender name and domain
    const [displayName, emailAddress] = email.from.split("<").map((s) => s.trim());
    const domainPart = emailAddress?.split("@")[1]?.replace(">", "");
    const mismatchedSender =
      displayName &&
      domainPart &&
      !displayName.toLowerCase().includes(domainPart.split(".")[0].toLowerCase());

    if (mismatchedSender) {
      suspiciousPatterns.push(`Mismatched sender: ${displayName} vs ${domainPart}`);
    }

    if (suspiciousPatterns.length > 0) {
      console.log("⚠️ Suspicious email detected:", {
        subject: email.subject,
        from: email.from,
        patterns: suspiciousPatterns,
      });

      stats.suspiciousEmails.push({
        subject: email.subject,
        from: email.from,
        reason: suspiciousPatterns.join("; "),
      });
    }

    try {
      const hour = new Date(email.date).getHours();
      if (hour < 12) stats.timeOfDay.morning++;
      else if (hour < 17) stats.timeOfDay.afternoon++;
      else stats.timeOfDay.evening++;
    } catch (error) {
      console.warn("⚠️ Invalid date format:", { date: email.date, error });
    }

    // Count unread emails
    if (email.labels?.some((label) => label.name === "UNREAD")) {
      stats.unreadCount++;
    }
  }

  stats.topSenders = Array.from(senderCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  stats.commonSubjects = Array.from(wordCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);

  console.log("📊 Analysis complete:", {
    totalEmails: stats.totalEmails,
    unreadCount: stats.unreadCount,
    suspiciousCount: stats.suspiciousEmails.length,
    timeDistribution: stats.timeOfDay,
  });

  return stats;
}

// Main message handler
const sendMessage = async (message: string) => {
  "use server";
  console.log("🚀 Processing new message:", { message });

  const messages = getMutableAIState<typeof AI>("messages");
  messages.update([...(messages.get() as CoreMessage[]), { role: "user", content: message }]);

  const contentStream = createStreamableValue("");
  const textComponent = <TextStreamMessage content={contentStream.value} />;

  try {
    const { value: stream } = await streamUI({
      model: openai("gpt-4o-mini-2024-07-18"),
      system: `You are a friendly email assistant. Help users manage and understand their emails.
When users ask to see or fetch their emails, use the fetchEmails tool.
When users want analysis or summaries, use the summarizeEmails tool.`,
      messages: messages.get() as CoreMessage[],
      text: async function* ({ content, done }) {
        if (done) {
          messages.done([...(messages.get() as CoreMessage[]), { role: "assistant", content }]);
          contentStream.done();
        } else {
          contentStream.update(content);
        }
        return textComponent;
      },
      tools: {
        fetchEmails: {
          description: "Fetch emails from the inbox",
          parameters: z.object({
            folder: z
              .string()
              .optional()
              .describe('Folder to fetch from (e.g., "inbox", "sent", "spam")'),
            max: z.string().optional().describe("Maximum number of emails to fetch"),
          }),
          generate: async function* ({ folder = "inbox", max = "5" }) {
            console.log("📨 Fetching emails:", { folder, max });
            const toolCallId = generateId();

            try {
              // First check if we have a vald connection
              const connectionResponse = await $fetch<ConnectionResponse>(
                "/api/v1/mail/connections",
                {
                  baseURL: process.env.NEXT_PUBLIC_APP_URL,
                },
              );

              console.log("📬 Connection response:", connectionResponse);

              if (!connectionResponse?.data?.connections.length) {
                console.error("🔒 No email connections found");
                return <Message role="assistant" content={<ConnectionError />} />;
              }

              const response = await $fetch<MailResponse>("/api/v1/mail", {
                query: {
                  folder,
                  max,
                },
                baseURL: process.env.NEXT_PUBLIC_APP_URL,
              });

              console.log("📬 Mail response:", response);

              if (!response?.data?.data?.threads?.length) {
                console.log("📭 No emails found");
                return (
                  <Message role="assistant" content="No emails found in the specified folder." />
                );
              }

              const emails = response.data.data.threads.map((thread: InitialThread) => ({
                subject: thread.subject,
                from: thread.sender.email,
                date: thread.receivedOn,
                snippet: thread.title,
              }));

              messages.done([
                ...(messages.get() as CoreMessage[]),
                {
                  role: "assistant",
                  content: [
                    {
                      type: "tool-call",
                      toolCallId,
                      toolName: "fetchEmails",
                      args: { folder, max },
                    },
                  ],
                },
              ]);

              return (
                <Message
                  role="assistant"
                  content={`Found ${emails.length} emails in ${folder}:
${emails.map((e: { subject: string; from: string }) => `\n- ${e.subject} (from: ${e.from})`).join("")}`}
                />
              );
            } catch (error: any) {
              console.error("❌ Error fetching emails:", {
                error,
                status: error.response?.status,
                folder,
                max,
                baseURL: process.env.NEXT_PUBLIC_APP_URL,
              });

              // Check if it's an authentication error
              if (error.response?.status === 401) {
                return <Message role="assistant" content={<AuthError />} />;
              }

              return <Message role="assistant" content={<GenericError />} />;
            }
          },
        },
        summarizeEmails: {
          description: "Get a summary of emails from a specific time period",
          parameters: z.object({
            period: z
              .string()
              .describe('Time period to summarize emails for (e.g., "week", "month")'),
          }),
          generate: async function* ({ period }) {
            console.log("📊 Starting email summary:", { period });
            const toolCallId = generateId();
            const endDate = new Date();
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0);

            if (period.includes("week")) {
              startDate.setDate(startDate.getDate() - 7);
            } else if (period.includes("month")) {
              startDate.setDate(startDate.getDate() - 30);
            }

            endDate.setHours(23, 59, 59, 999);

            try {
              // First check if we have a valid connection
              const connectionResponse = await $fetch<ConnectionResponse>(
                "/api/v1/mail/connections",
                {
                  baseURL: process.env.NEXT_PUBLIC_APP_URL,
                },
              );

              console.log("📬 Connection response:", connectionResponse);

              if (!connectionResponse?.data?.connections?.length) {
                console.error("🔒 No email connections found");
                return <Message role="assistant" content={<ConnectionError />} />;
              }

              const afterDate = startDate.toISOString().split("T")[0];
              const beforeDate = endDate.toISOString().split("T")[0];

              console.log("📅 Date range:", { afterDate, beforeDate });

              const response = await $fetch<MailResponse>("/api/v1/mail", {
                query: {
                  folder: "inbox",
                  max: "50",
                  q: `after:${afterDate} before:${beforeDate}`,
                },
                baseURL: process.env.NEXT_PUBLIC_APP_URL,
              });

              console.log("📬 Mail response:", response);

              if (!response?.data?.data?.threads?.length) {
                console.log("📭 No emails found in period");
                return (
                  <Message
                    role="assistant"
                    content="No emails found in the specified time period."
                  />
                );
              }

              const emails: EmailData[] = response.data.data.threads.map(
                (thread: InitialThread) => ({
                  id: thread.id,
                  subject: thread.subject,
                  from: thread.sender.email,
                  date: thread.receivedOn,
                  snippet: thread.title,
                  labels: thread.tags.map((tag: string) => ({ id: tag, name: tag })),
                }),
              );

              messages.done([
                ...(messages.get() as CoreMessage[]),
                {
                  role: "assistant",
                  content: [
                    {
                      type: "tool-call",
                      toolCallId,
                      toolName: "summarizeEmails",
                      args: { period },
                    },
                  ],
                },
                {
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolName: "summarizeEmails",
                      toolCallId,
                      result: `Analyzed ${emails.length} emails from the past ${period}`,
                    },
                  ],
                },
              ]);

              const summary = analyzeEmails(emails);
              return (
                <Message
                  role="assistant"
                  content={<EmailSummary period={period} summary={summary} />}
                />
              );
            } catch (error: any) {
              console.error("❌ Error summarizing emails:", {
                error,
                status: error.response?.status,
                period,
                baseURL: process.env.NEXT_PUBLIC_APP_URL,
              });

              // Check if it's an authentication error
              if (error.response?.status === 401) {
                return <Message role="assistant" content={<AuthError />} />;
              }

              return <Message role="assistant" content={<GenericError />} />;
            }
          },
        },
      },
    });

    return stream;
  } catch (error) {
    console.error("❌ Error in sendMessage:", { error, message });
    throw error;
  }
};

// Export types and AI instance
export type UIState = Array<ReactNode>;

export type AIState = {
  chatId: string;
  messages: Array<CoreMessage>;
};

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
  onSetAIState: async ({ done }) => {
    "use server";
    if (done) {
      // save to database if needed
    }
  },
});
