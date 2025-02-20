"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/responsive-modal";
import { useOpenComposeModal } from "@/hooks/use-open-compose-modal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "../ui/tooltip";
import { MailCompose } from "./mail-compose";
import { X } from "lucide-react";

export default function MailComposeModal() {
  const { isOpen, setIsOpen, close } = useOpenComposeModal();

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaContent className="md:min-w-[500px]">
        <CredenzaHeader className="flex flex-row justify-between">
          <CredenzaTitle className="text-2xl font-semibold tracking-tight">
            New Message
          </CredenzaTitle>
          <CredenzaClose asChild>
            <Button
              className="hidden h-5 w-5 flex-shrink-0 p-0 md:inline-flex"
              size="sm"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </CredenzaClose>
        </CredenzaHeader>
        <CredenzaBody>
          <TooltipProvider>
            <MailCompose onClose={close} />
          </TooltipProvider>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
