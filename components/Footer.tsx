import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-[var(--on-ink)]">
      <div className="wrap grid gap-[var(--s-group)] py-[var(--s-group)] md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Logo invert />
          <p className="max-w-sm text-[var(--on-ink-60)]">שלוש דקות של שאלון, ושיחה אחת שמסדרת לכם את שלושים השנים הבאות.</p>
          <Link href="/questionnaire" className="btn btn-sm">לשאלון ההתאמה <span className="arrow" aria-hidden>←</span></Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="meta !text-[var(--on-ink-60)]">יצירת קשר</p>
          <a href="tel:+972500000000" className="num hover:text-accent">050-000-0000</a>
          <a href="mailto:michal@example.com" className="hover:text-accent">michal@example.com</a>
          <p className="text-[var(--on-ink-60)]">דרך מנחם בגין 132, תל אביב</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="meta !text-[var(--on-ink-60)]">באתר</p>
          <a href="/#mixer" className="hover:text-accent">התמהיל</a>
          <a href="/#how" className="hover:text-accent">איך זה עובד</a>
          <Link href="/admin" className="hover:text-accent">כניסת יועצת</Link>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-[var(--on-ink-15)] pt-6 pb-28 md:pb-6 text-[length:var(--t5)] text-[var(--on-ink-60)] md:flex-row md:justify-between">
        <p>אתר הדגמה. השמות, המספרים והריביות בדויים, ואינם ייעוץ או הצעה לאשראי.</p>
        <p>עיצוב ובנייה: חיים בניסטי</p>
      </div>
    </footer>
  );
}
