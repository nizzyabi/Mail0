import { AppSidebar } from "@/components/ui/app-sidebar";

export default function MailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="w-full bg-sidebar md:p-2">
        <div className="flex-col overflow-hidden shadow-sm md:flex md:rounded-xl md:border">
          {children}
        </div>
      </div>
    </>
  );
}
