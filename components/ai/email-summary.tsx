import type { EmailStats } from "@/app/types";
import * as React from "react";

interface EmailSummaryProps {
  period: string;
  summary: EmailStats;
}

export function EmailSummary({ period, summary }: EmailSummaryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email Summary for the Last {period}</h3>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Total Emails</p>
            <p className="text-2xl font-bold">{summary.totalEmails}</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Unread</p>
            <p className="text-2xl font-bold">{summary.unreadCount}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Top Senders:</h4>
          <ul className="list-disc space-y-1 pl-5">
            {summary.topSenders.map(([sender, count]) => (
              <li key={sender}>
                <span className="font-medium">{sender}</span>: {count} emails
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Common Subject Words:</h4>
          <div className="flex flex-wrap gap-2">
            {summary.commonSubjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-blue-100 px-2 py-1 text-sm dark:bg-blue-900"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Time of Day Distribution:</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800">
              <p className="text-sm text-gray-500">Morning</p>
              <p className="text-xl font-bold">{summary.timeOfDay.morning}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800">
              <p className="text-sm text-gray-500">Afternoon</p>
              <p className="text-xl font-bold">{summary.timeOfDay.afternoon}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800">
              <p className="text-sm text-gray-500">Evening</p>
              <p className="text-xl font-bold">{summary.timeOfDay.evening}</p>
            </div>
          </div>
        </div>

        {summary.suspiciousEmails.length > 0 && (
          <div>
            <h4 className="mb-2 font-medium text-amber-500">⚠️ Suspicious Emails Detected:</h4>
            <div className="space-y-2">
              {summary.suspiciousEmails.map((email, index) => (
                <div key={index} className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                  <p className="font-medium">{email.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">From: {email.from}</p>
                  <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                    Reason: {email.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
