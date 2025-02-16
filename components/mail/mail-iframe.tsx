import { fixNonReadableColors, template } from "@/lib/email-utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function MailIframe({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(300);
  const { resolvedTheme } = useTheme();

  const iframeDoc = useMemo(() => template(html), [html]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const url = URL.createObjectURL(new Blob([iframeDoc], { type: "text/html" }));
    iframeRef.current.src = url;
    iframeRef.current.onload = () => {
      setHeight(iframeRef.current?.contentWindow?.document.body.scrollHeight || 300);
      if (iframeRef.current?.contentWindow?.document.body)
        fixNonReadableColors(iframeRef.current.contentWindow.document.body);
    };
    return () => URL.revokeObjectURL(url);
  }, [html]);

  useEffect(() => {
    if (iframeRef.current?.contentWindow?.document.body) {
      iframeRef.current.contentWindow.document.body.style.backgroundColor =
        resolvedTheme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
      fixNonReadableColors(iframeRef.current.contentWindow.document.body);
    }
  }, [resolvedTheme]);

  return (
    <iframe
      height={height}
      ref={iframeRef}
      className={cn("w-full flex-1 border-none transition-opacity duration-200")}
      title="Email Content"
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-scripts"
      style={{
        width: "100%",
        overflow: "auto",
      }}
    />
  );
}
