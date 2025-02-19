import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SWRConfig } from "swr";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SWRConfig
        value={{ keepPreviousData: true, revalidateOnFocus: false, revalidateIfStale: false }}
      >
        <AppSidebar />
        <div className="w-full bg-sidebar md:p-3">{children}</div>
      </SWRConfig>
    </div>
  );
}
