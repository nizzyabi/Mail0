import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { KeyRoundIcon } from "lucide-react";

export default function SecurityPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your security preferences and account protection.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch id="2fa" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Login Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified about new login attempts</p>
            </div>
            <Switch id="login-notifications" defaultChecked />
          </div>
        </div>
        <div className="flex items-center gap-2.5 pt-4">
          <Button variant="outline">
            <KeyRoundIcon />
            Change Password
          </Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
