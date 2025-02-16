import { SWRConfig } from "swr";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SWRConfig
        value={{ keepPreviousData: true, revalidateOnFocus: false, revalidateIfStale: false }}
      >
        {children}
      </SWRConfig>
    </div>
  );
}
