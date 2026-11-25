import type { Metadata } from "next";
import Link from "next/link";
import Shell, { PageHead } from "@/components/Shell";
import Photo from "@/components/Photo";
import ContactForm from "@/components/ContactForm";
import { ADDRESS, EMAIL, HOURS, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/content";

export const metadata: Metadata = {
  title: "צור קשר",
  description: `טלפון ${PHONE}, וואטסאפ, מייל או טופס קצר. המשרד ב${ADDRESS}.`,
  alternates: { canonical: "/contact/" },
};

const WAYS = [
  { k: "טלפון", v: PHONE, href: `tel:${PHONE_TEL}`, note: "הכי מהיר בשעות העבודה", ltr: true },
  { k: "וואטסאפ", v: "שלחו הודעה", href: WHATSAPP, note: "עונה גם בערב", ltr: false },
  { k: "מייל", v: EMAIL, href: `mailto:${EMAIL}`, note: "למסמכים ולשאלות ארוכות", ltr: true },
];

export default function Page() {
  return (
    <Shell>
      <PageHead crumbs={[["צור קשר"]]} title="איך מגיעים אליי." lead="הדרך הכי טובה להתחיל היא השאלון. אבל אם אתם מעדיפים לדבר קודם, הנה כל הדרכים." />

      <section className="section" aria-label="דרכי יצירת קשר">
        <div className="wrap grid gap-[var(--s-group)] lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-[var(--s-group)]">
            <ul className="reveal flex flex-col divide-y divide-[var(--ink-12)] border-y hair">
              {WAYS.map((w) => (
                <li key={w.k}>
                  <a href={w.href} target={w.href.startsWith("http") ? "_blank" : undefined} rel={w.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="meta block">{w.k}</span>
                      <span className="t3 mt-1 block transition-colors group-hover:text-accent" dir={w.ltr ? "ltr" : undefined} style={w.ltr ? { textAlign: "right" } : undefined}>{w.v}</span>
                    </span>
                    <span className="text-[length:var(--t5)] text-[var(--ink-60)]">{w.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="reveal grid gap-[var(--s-in)] sm:grid-cols-2">
              <div>
                <p className="meta">המשרד</p>
                <p className="mt-2">{ADDRESS}</p>
                <p className="mt-1 text-[length:var(--t5)] text-[var(--ink-60)]">קומת קרקע, חניה בחניון הסמוך.</p>
              </div>
              <div>
                <p className="meta">שעות</p>
                <p className="mt-2">{HOURS}</p>
                <p className="mt-1 text-[length:var(--t5)] text-[var(--ink-60)]">פגישות במשרד בתיאום מראש.</p>
              </div>
            </div>
            <Photo name="office" alt="המשרד של מיכל: שולחן עץ, כיסאות כחולים, צמח גדול וחלון לרחוב עם עצים" w={2752} h={1536} sizes="(min-width: 1024px) 45vw, 100vw" className="reveal aspect-[16/9] w-full rounded-[28px] object-cover" />
          </div>
          <div className="reveal flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col items-start gap-4 rounded-[28px] bg-ink p-[clamp(1.25rem,3vw,2.5rem)] text-[var(--on-ink)]">
              <p className="meta !text-[var(--on-ink-60)]">מומלץ</p>
              <h2 className="t2 max-w-[14ch]">השאלון, 3 דקות.</h2>
              <p className="text-[var(--on-ink-60)]">ככה אני מגיעה לשיחה עם התמונה המלאה, והשיחה הופכת לחצי מהזמן.</p>
              <Link href="/questionnaire/" className="btn">לשאלון ההתאמה <span className="arrow" aria-hidden>←</span></Link>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}
