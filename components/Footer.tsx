import Link from "next/link";
import Logo from "./Logo";
import { ADDRESS, EMAIL, HOURS, PHONE, PHONE_TEL, SERVICES, WHATSAPP } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-[var(--on-ink)]">
      <div className="wrap grid gap-[var(--s-group)] py-[var(--s-group)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Logo invert />
          <p className="max-w-sm text-[var(--on-ink-60)]">שלוש דקות של שאלון, ושיחה אחת שמסדרת לכם את שלושים השנים הבאות.</p>
          <Link href="/questionnaire/" className="btn btn-sm">לשאלון ההתאמה <span className="arrow" aria-hidden>←</span></Link>
        </div>
        <nav aria-label="שירותים" className="flex flex-col gap-2">
          <p className="meta !text-[var(--on-ink-60)]">שירותים</p>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}/`} className="hover:text-accent">{s.label}</Link>
          ))}
        </nav>
        <nav aria-label="באתר" className="flex flex-col gap-2">
          <p className="meta !text-[var(--on-ink-60)]">באתר</p>
          <Link href="/calculator/" className="hover:text-accent">מחשבון משכנתא</Link>
          <Link href="/process/" className="hover:text-accent">איך זה עובד</Link>
          <Link href="/about/" className="hover:text-accent">מי אני</Link>
          <Link href="/faq/" className="hover:text-accent">שאלות נפוצות</Link>
          <Link href="/admin/" className="hover:text-accent">כניסת יועצת</Link>
        </nav>
        <div className="flex flex-col gap-2">
          <p className="meta !text-[var(--on-ink-60)]">יצירת קשר</p>
          <a href={`tel:${PHONE_TEL}`} className="num hover:text-accent">{PHONE}</a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-accent">וואטסאפ</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent">{EMAIL}</a>
          <p className="text-[var(--on-ink-60)]">{ADDRESS}</p>
          <p className="text-[length:var(--t5)] text-[var(--on-ink-60)]">{HOURS}</p>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-[var(--on-ink-15)] pb-28 pt-6 text-[length:var(--t5)] text-[var(--on-ink-60)] md:flex-row md:justify-between md:pb-6">
        <p>אתר הדגמה. השמות, המספרים והריביות בדויים, ואינם ייעוץ או הצעה לאשראי.</p>
        <p className="flex flex-wrap gap-x-4">
          <Link href="/privacy/" className="hover:text-[var(--on-ink)]">מדיניות פרטיות</Link>
          <Link href="/accessibility/" className="hover:text-[var(--on-ink)]">הצהרת נגישות</Link>
          <span>עיצוב ובנייה: חיים בניסטי</span>
        </p>
      </div>
    </footer>
  );
}
