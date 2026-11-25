import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { MobileBar } from "./Sections";

/** Every public page: skip link, header, footer, the phone CTA bar, and the reveal observer. */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[var(--on-ink)]">
        דלגו לתוכן
      </a>
      <Header />
      <main id="main" className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBar />
      <Reveal />
    </>
  );
}

/** Breadcrumbs + a title that says at once what is on the page (Styleliner: no vague titles). */
export function PageHead({ crumbs, title, lead, label, children }: { crumbs: [string, string?][]; title: string; lead?: string; label?: string; children?: React.ReactNode }) {
  return (
    <div className="wrap pt-[clamp(1.5rem,4vw,3.5rem)]">
      <nav aria-label="פירורי לחם" className="meta">
        <ol className="flex flex-wrap gap-x-2">
          <li><Link href="/" className="hover:text-accent">בית</Link></li>
          {crumbs.map(([t, href]) => (
            <li key={t} className="flex gap-x-2">
              <span aria-hidden>/</span>
              {href ? <Link href={href} className="hover:text-accent">{t}</Link> : <span aria-current="page" className="text-ink">{t}</span>}
            </li>
          ))}
        </ol>
      </nav>
      {label && <p className="meta mt-[var(--s-group)]">{label}</p>}
      <h1 className={`t1 max-w-[14ch] !text-[clamp(3rem,1rem+6.5vw,7.5rem)] ${label ? "mt-3" : "mt-[var(--s-group)]"}`}>{title}</h1>
      {lead && <p className="t3 mt-6 max-w-[38ch] !font-normal text-[var(--ink-60)]">{lead}</p>}
      {children}
    </div>
  );
}

/** A closing call at the end of an inner page. */
export function CtaBand({ title, text, href = "/questionnaire/", cta = "לשאלון ההתאמה · 3 דקות" }: { title: string; text?: string; href?: string; cta?: string }) {
  return (
    <section className="wrap pb-[var(--s-out)]" aria-label="הנעה לפעולה">
      <div className="reveal flex flex-col items-start justify-between gap-6 rounded-[28px] bg-accent p-[clamp(1.5rem,4vw,3.5rem)] text-[var(--paper)] md:flex-row md:items-end">
        <div>
          <h2 className="t2 max-w-[16ch]">{title}</h2>
          {text && <p className="mt-4 max-w-[44ch] opacity-80">{text}</p>}
        </div>
        <Link href={href} className="btn shrink-0 !bg-[var(--paper)] !text-ink">
          {cta} <span className="arrow" aria-hidden>←</span>
        </Link>
      </div>
    </section>
  );
}
