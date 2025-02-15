"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

const formSchema = z.object({
  newMailNotifications: z.enum(["none", "important", "all"]),
  marketingCommunications: z.boolean(),
});

const defaultValues = {
  newMailNotifications: "all" as const,
  marketingCommunications: false,
};

export default function NotificationsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    // TODO: Email notifications (desktop/PWA)

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSaving(false);
    }, 1000);
  }

  function handleReset() {
    form.reset(defaultValues);
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what notifications you want to receive.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="newMailNotifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Mail Notifications</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[240px]">
                          <Bell className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="important">Important Only</SelectItem>
                        <SelectItem value="all">All Messages</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose which messages you want to receive notifications for
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketingCommunications"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Marketing Communications</FormLabel>
                      <FormDescription>Receive updates about new features</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
