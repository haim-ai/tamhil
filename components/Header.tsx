"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/#mixer", label: "התמהיל" },
  { href: "/#how", label: "איך זה עובד" },
  { href: "/#michal", label: "מי אני" },
  { href: "/#faq", label: "שאלות" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow] duration-500 ${scrolled ? "bg-[rgb(228_233_236/0.86)] shadow-[0_1px_0_var(--ink-12)] backdrop-blur-md" : ""}`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="ראשי" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.98rem] font-medium">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-accent">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/questionnaire" className="btn btn-sm !hidden md:!inline-flex">
          לשאלון ההתאמה <span className="arrow" aria-hidden>←</span>
        </Link>
      </div>
      <nav aria-label="ראשי, טלפון" className="md:hidden">
        <ul className="wrap flex gap-5 overflow-x-auto pb-3 text-[length:var(--t5)] font-medium [scrollbar-width:none]">
          {NAV.map((n) => (
            <li key={n.href} className="shrink-0">
              <a href={n.href} className="inline-flex min-h-8 items-center">{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
