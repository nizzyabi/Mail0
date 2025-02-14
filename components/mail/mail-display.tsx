import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ParsedMessage } from "@/types";
import { BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  emailData: ParsedMessage;
  isFullscreen: boolean;
  isMuted: boolean;
  isLoading: boolean;
};

const MailDisplay = ({ emailData, isFullscreen, isMuted, isLoading }: Props) => {
  return (
    <div
      className={cn(
        "relative m-4 flex-1 overflow-hidden rounded-xl bg-neutral-900 p-4",
        isFullscreen && "h-[calc(100vh-4rem)]",
      )}
    >
      <div className="relative inset-0 h-full overflow-y-auto pb-0">
        <div className="flex flex-col gap-4 px-4 py-4">
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
              <div className="font-semibold">{emailData.sender.name}</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{emailData.sender.email}</span>
                {isMuted && <BellOff className="h-4 w-4" />}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="h-full w-full p-0">
          <div className="flex h-full w-full flex-1 flex-col p-0">
            {emailData.blobUrl ? (
              <iframe
                key={emailData.id}
                src={emailData.blobUrl}
                className={cn(
                  "w-full flex-1 rounded-lg border-none transition-opacity duration-200",
                  isLoading ? "opacity-50" : "opacity-100",
                )}
                title="Email Content"
                sandbox="allow-same-origin"
                style={{
                  minHeight: "500px",
                  height: "100%",
                  overflow: "auto",
                }}
              />
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
  );
};

export default MailDisplay;
