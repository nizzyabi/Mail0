import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SettingsCard({
  title,
  description,
  children,
  footer,
  className,
}: SettingsCardProps) {
  return (
    <Card className={cn("w-full overflow-hidden rounded-2xl border-0 px-3 pt-0", className)}>
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto px-0">{children}</CardContent>
      {footer && <div className="py-4">{footer}</div>}
    </Card>
  );
}
