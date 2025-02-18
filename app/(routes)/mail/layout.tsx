import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function MailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="w-full bg-sidebar md:p-3">{children}</div>
    </>
  );
}
