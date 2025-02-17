import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BellOff, Lock } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import { MailIframe } from "./mail-iframe";
import { ParsedMessage } from "@/types";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
  emailData: ParsedMessage;
  isFullscreen: boolean;
  isMuted: boolean;
  isLoading: boolean;
  index: number;
};

const MailDisplay = ({ emailData, isFullscreen, isMuted, index }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (index === 0) {
      setIsCollapsed(false);
    }
  }, [index]);

  return (
    <div
      className={cn(
        "relative m-4 flex-1 overflow-hidden rounded-lg border border-border bg-secondary/50 p-4",
        isFullscreen && "h-[calc(100vh-4rem)]",
      )}
    >
      <div className="relative inset-0 h-full overflow-y-auto pb-0">
        <div
          className={cn("flex flex-col gap-4 transition-all duration-200", !isCollapsed && "pb-4")}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage alt={emailData.sender.name} />
                <AvatarFallback>
                  {emailData.sender.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-start gap-2">
                  <span className="font-semibold">{emailData.sender.name}</span>
                  <span className="flex grow-0 items-center gap-2 text-sm text-muted-foreground">
                    <span>{emailData.sender.email}</span>
                    {isMuted && <BellOff className="h-4 w-4" />}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(emailData.receivedOn), "PPp")}
                  </time>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs underline">
                        Details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] space-y-2" align="start">
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">From:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">Reply-To:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">To:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">Cc:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">Date:</span>{" "}
                        {format(new Date(emailData.receivedOn), "PPpp")}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">Mailed-By:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-muted-foreground">Signed-By:</span>{" "}
                        {emailData.sender.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-medium text-muted-foreground">Security:</span>{" "}
                        <Lock className="h-3 w-3" /> {emailData.sender.email}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-6 px-2"
              >
                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "h-0 overflow-hidden transition-all duration-200",
            !isCollapsed && "h-[1px]",
          )}
        >
          <Separator />
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-all duration-200",
            isCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="h-fit w-full p-0">
              {emailData.decodedBody ? (
                // <p className="flex h-[500px] w-full items-center justify-center">
                //   There should be an iframe in here
                // </p>
                <MailIframe html={emailData.decodedBody} />
              ) : (
                <div
                  className="flex h-[500px] w-full items-center justify-center"
                  style={{ minHeight: "500px" }}
                >
                  <div className="h-32 w-32 animate-pulse rounded-full bg-secondary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailDisplay;
