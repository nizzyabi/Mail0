import {
  Archive,
  ArchiveX,
  Forward,
  MoreVertical,
  Paperclip,
  Reply,
  ReplyAll,
  X,
  Send,
  FileIcon,
  Copy,
  Maximize2,
  Minimize2,
  Loader2,
} from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useThread } from "@/hooks/use-threads";
import MailDisplay from "./mail-display";
import { useMail } from "./use-mail";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ThreadDisplayProps {
  mail: string | null;
  onClose?: () => void;
  isMobile?: boolean;
}

export function ThreadDisplay({ mail, onClose, isMobile }: ThreadDisplayProps) {
  const [, setMail] = useMail();
  const { data: emailData, isLoading } = useThread(mail ?? "");
  const [isMuted, setIsMuted] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (emailData) {
      setIsMuted(emailData[0].unread ?? false);
    }
  }, [emailData]);

  const handleClose = useCallback(() => {
    onClose?.();
    setMail({ selected: null, bulkSelected: [] });
  }, [onClose, setMail]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const handleAttachment = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAttachments([...attachments, ...Array.from(e.target.files)]);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const truncateFileName = (name: string, maxLength = 15) => {
    if (name.length <= maxLength) return name;
    const extIndex = name.lastIndexOf(".");
    if (extIndex !== -1 && name.length - extIndex <= 5) {
      return `${name.slice(0, maxLength - 5)}...${name.slice(extIndex)}`;
    }
    return `${name.slice(0, maxLength)}...`;
  };

  const handleCopy = async () => {
    if (emailData) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(emailData, null, 2));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  if (!emailData) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-4 p-8">
        <Loader2 className="size-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div
        className={cn(
          "relative flex h-full flex-col bg-background transition-all duration-300",
          isMobile ? "" : "rounded-r-lg",
          isFullscreen ? "fixed inset-0 z-50 bg-background" : "",
        )}
      >
        <div className="flex items-center border-b p-[7px]">
          <div className="flex flex-1 items-center gap-2">
            {!isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="md:h-fit md:px-2"
                    disabled={!emailData}
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Close</TooltipContent>
              </Tooltip>
            )}
            <div className="max-w-[300px] flex-1 truncate text-sm font-medium">
              {emailData[0].title || "No subject"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:h-fit md:px-2"
                  disabled={!emailData}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:h-fit md:px-2"
                  disabled={!emailData}
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy email data</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{copySuccess ? "Copied!" : "Copy email data"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="md:h-fit md:px-2" disabled={!emailData}>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="md:h-fit md:px-2" disabled={!emailData}>
                  <Reply className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="md:h-fit md:px-2" disabled={!emailData}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ArchiveX className="mr-2 h-4 w-4" /> Move to spam
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReplyAll className="mr-2 h-4 w-4" /> Reply all
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="mr-2 h-4 w-4" /> Forward
                </DropdownMenuItem>
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Add label</DropdownMenuItem>
                <DropdownMenuItem>Mute thread</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="h-full space-y-4 overflow-y-scroll">
          {[...(emailData || [])].reverse().map((message, index) => (
            <div
              key={message.id}
              className={cn("transition-all duration-200", index > 0 && "border-t border-border")}
            >
              <MailDisplay
                emailData={message}
                isFullscreen={isFullscreen}
                isMuted={isMuted}
                isLoading={isLoading}
                index={index}
              />
            </div>
          ))}
        </div>

        {!isFullscreen && (
          <div className="relative bottom-0 left-0 right-0 z-10 mb-4 bg-background px-4 pb-4 pt-2">
            <form className="relative space-y-2.5 rounded-[calc(var(--radius)-2px)] border bg-secondary/50 p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Reply className="h-4 w-4" />
                  <p className="truncate">
                    {emailData[0]?.sender?.name} ({emailData[0]?.sender?.email})
                  </p>
                </div>
              </div>

              <Textarea
                className="min-h-[60px] w-full resize-none border-0 bg-background leading-relaxed placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
                placeholder="Write your reply..."
                spellCheck={true}
                // autoFocus
              />

              {(attachments.length > 0 || isUploading) && (
                <div className="relative z-50 min-h-[32px]">
                  <div className="hide-scrollbar absolute inset-x-0 flex gap-2 overflow-x-auto">
                    {isUploading && (
                      <Badge
                        variant="secondary"
                        className="inline-flex shrink-0 animate-pulse items-center bg-background/50 px-2 py-1.5 text-xs"
                      >
                        Uploading...
                      </Badge>
                    )}
                    {attachments.map((file, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Badge
                            key={index}
                            variant="secondary"
                            className="inline-flex shrink-0 items-center gap-1 bg-background/50 px-2 py-1.5 text-xs"
                          >
                            <span className="max-w-[120px] truncate">
                              {truncateFileName(file.name)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-4 w-4 hover:bg-background/80"
                              onClick={(e) => {
                                e.preventDefault();
                                removeAttachment(index);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="w-64 p-0">
                          <div className="relative h-32 w-full">
                            {file.type.startsWith("image/") ? (
                              <Image
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={file.name}
                                fill
                                className="rounded-t-md object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center p-4">
                                <FileIcon className="h-16 w-16 text-primary" />
                              </div>
                            )}
                          </div>
                          <div className="bg-secondary p-2">
                            <p className="text-sm font-medium">{truncateFileName(file.name, 30)}</p>
                            <p className="text-xs text-muted-foreground">
                              Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Last modified: {new Date(file.lastModified).toLocaleDateString()}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-8 w-8 hover:bg-background/80"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("attachment-input")?.click();
                        }}
                      >
                        <Paperclip className="h-4 w-4" />
                        <span className="sr-only">Add attachment</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                  <input
                    type="file"
                    id="attachment-input"
                    className="hidden"
                    onChange={handleAttachment}
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    Save draft
                  </Button>
                  <Button size="sm" className="h-8">
                    Send <Send className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

<style jsx global>{`
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>;
