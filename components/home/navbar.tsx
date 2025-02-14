import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="mx-auto flex w-full items-center justify-between p-4">
      <div className="w-[180px]">
        <p className="text-2xl font-bold">Mail0</p>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden gap-10 text-sm text-muted-foreground md:flex">
        <Link href="https://github.com/nizzyabi/Mail0">Github</Link>
        <Link href=" https://discord.gg/5nwrvt3JH2">Discord</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Terms & Privacy</Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-9 w-9" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-52">
            <SheetHeader>
              <SheetTitle className="text-left text-2xl">Mail0</SheetTitle>
            </SheetHeader>
            <div className="mt-7 flex flex-col gap-3 text-muted-foreground">
              <Link href="https://github.com/nizzyabi/mail0">Github</Link>
              <Link href="https://discord.gg/5nwrvt3JH2">Discord</Link>
              <Link href="/about">About</Link>
              <Link href="/privacy">Terms & Privacy</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/login" className="hidden w-[180px] justify-end md:flex">
        <Button variant="main" className="group h-9">
          Developers start here
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </Link>
    </div>
  );
}
