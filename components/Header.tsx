"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || "/";
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const active = (href: string) => path.replace(/\/$/, "").startsWith(href.replace(/\/$/, ""));

  const links = (cls: string) =>
    NAV.map((n) => (
      <li key={n.href} className="shrink-0">
        <Link href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`${cls} transition-colors hover:text-accent aria-[current=page]:text-accent`}>
          {n.label}
        </Link>
      </li>
    ));

  return (
    <header className={`sticky top-0 z-40 transition-[background,box-shadow] duration-500 ${scrolled ? "bg-[rgb(228_233_236/0.88)] shadow-[0_1px_0_var(--ink-12)] backdrop-blur-md" : "bg-bg"}`}>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="ראשי" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.98rem] font-medium">{links("")}</ul>
        </nav>
        <Link href="/questionnaire/" className="btn btn-sm !hidden md:!inline-flex">
          לשאלון ההתאמה <span className="arrow" aria-hidden>←</span>
        </Link>
      </div>
      <nav aria-label="ראשי, טלפון" className="md:hidden">
        <ul className="wrap flex gap-5 overflow-x-auto pb-3 text-[length:var(--t5)] font-medium [scrollbar-width:none]">{links("inline-flex min-h-8 items-center")}</ul>
      </nav>
    </header>
  );
}
