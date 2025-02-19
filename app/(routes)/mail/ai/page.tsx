"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollToBottom } from "@/components/ai/use-scroll-to-bottom";
import { Sparkles, AlertTriangle, BarChart3 } from "lucide-react";
import { LoadingMessage } from "@/components/ai/loading-message";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/components/ai/messages";
import { Button } from "@/components/ui/button";
import { ReactNode, useRef } from "react";
import { Send } from "lucide-react";
import { useActions } from "ai/rsc";
import { cn } from "@/lib/utils";
import { useState } from "react";

const suggestions = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    text: "Show me my weekly emails",
    prompt: "Show me my emails from the last week",
    variant: "personal",
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    text: "Check for suspicious emails",
    prompt: "Check my inbox for any suspicious or spam emails",
    variant: "important",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    text: "Show email analysis",
    prompt: "Give me an analysis of my email patterns",
    variant: "updates",
  },
];

export default function AIPage() {
  const { sendMessage } = useActions();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<ReactNode>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  const handleSuggestionClick = (prompt: string) => {
    if (isProcessing) return;
    setMessage(prompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      setMessages((messages) => [
        ...messages,
        <Message key={messages.length} role="user" content={message} />,
      ]);

      const currentMessage = message;
      setMessage("");

      const response: ReactNode = await sendMessage(currentMessage);
      setMessages((messages) => [...messages, response]);
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-inherit flex h-[calc(100vh-2rem)]">
      <Card className="flex h-full w-full flex-col overflow-hidden border bg-card shadow-sm">
        <CardHeader className="border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <SidebarToggle className="h-8 w-8" />
            <CardTitle className="text-base font-medium">AI Assistant</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 p-4">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto rounded-lg border bg-muted/50 p-4"
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-8">
                <p className="text-center text-muted-foreground">
                  Start a conversation with your AI assistant
                </p>
                <div className="grid max-w-2xl gap-2 sm:grid-cols-3 sm:gap-4">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      className={cn(
                        "group flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "bg-card",
                      )}
                      disabled={isProcessing}
                    >
                      <div
                        className={cn(
                          "rounded-md p-2 transition-colors",
                          suggestion.variant === "personal" &&
                            "bg-blue-100 text-blue-900 group-hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:group-hover:bg-blue-900/30",
                          suggestion.variant === "important" &&
                            "bg-amber-100 text-amber-900 group-hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:group-hover:bg-amber-900/30",
                          suggestion.variant === "updates" &&
                            "bg-emerald-100 text-emerald-900 group-hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:group-hover:bg-emerald-900/30",
                        )}
                      >
                        {suggestion.icon}
                      </div>
                      <span className="text-sm font-medium">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((message) => message)}
                {isProcessing && <LoadingMessage />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className={cn(
                "min-h-[80px] flex-1 resize-none bg-background",
                "focus-visible:ring-1 focus-visible:ring-offset-1",
              )}
              disabled={isProcessing}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={isProcessing || !message.trim()}
              className={cn(
                "h-[80px] w-[80px] rounded-lg transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isProcessing && "cursor-not-allowed opacity-50",
              )}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
