import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ description, children, className }: SettingsCardProps) {
  return (
    <Card className={`max-w-2xl border-none ${className}`}>
      <CardHeader>
        {/* <CardTitle>{title}</CardTitle> */}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
