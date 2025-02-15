"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

// TODO: More customization options
const formSchema = z.object({
  inboxType: z.enum(["default", "important", "unread"]),
});

export default function AppearancePage() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inboxType: "default",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);

    // TODO: Save this in account
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize colors, fonts and view options.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <ModeToggle />
            </div>
            <FormField
              control={form.control}
              name="inboxType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Inbox type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="default" />
                        <Label htmlFor="default">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="important" id="important" />
                        <Label htmlFor="important">Important First</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unread" id="unread" />
                        <Label htmlFor="unread">Unread First</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <div className="flex justify-end p-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
