import type { Metadata } from "next";
import Shell, { CtaBand, PageHead } from "@/components/Shell";
import Photo from "@/components/Photo";
import Checklist from "@/components/Checklist";

export const metadata: Metadata = {
  title: "איך זה עובד: מהשאלון ועד החתימה",
  description: "ארבעה שלבים, בממוצע 24 יום: שאלון, שיחת היכרות, תמהיל ומכרז בין בנקים, וחתימה. ורשימת המסמכים שצריך להכין.",
  alternates: { canonical: "/process/" },
};

const STAGES = [
  { days: "יום 1", t: "שאלון של 3 דקות", you: "עונים על שלוש שאלות קצרות מהטלפון.", me: "עוברת על התשובות ומכינה תמונה ראשונה: כמה אפשר, ומה מגביל.", color: "var(--accent)" },
  { days: "ימים 2-3", t: "שיחת היכרות", you: "30 דקות בטלפון או בזום. שואלים כל מה שמציק.", me: "אומרת מה אפשרי, מה עולה הייעוץ, ושולחת רשימת מסמכים.", color: "var(--accent-35)" },
  { days: "ימים 4-18", t: "תמהיל ומכרז", you: "אוספים מסמכים. זהו.", me: "בונה 2-3 תמהילים, שולחת למכרז בין הבנקים ומנהלת את המשא ומתן.", color: "var(--ink-30)" },
  { days: "ימים 19-24", t: "אישור וחתימה", you: "בוחרים הצעה וחותמים.", me: "בודקת כל סעיף לפני החתימה, ומלווה עד שהכסף עובר.", color: "var(--ink)" },
];

export default function Page() {
  return (
    <Shell>
      <PageHead crumbs={[["איך זה עובד"]]} title="מהשאלון ועד החתימה, ב-24 יום." lead="ארבעה שלבים. בכל אחד כתוב מה אתם עושים ומה אני עושה, כדי שתדעו בדיוק איפה אתם עומדים." />

      {/* the timeline: one line that fills, like the mix bar */}
      <section className="section" aria-labelledby="stages">
        <div className="wrap">
          <h2 id="stages" className="sr-only">שלבי התהליך</h2>
          <div className="reveal flex h-4 gap-1" aria-hidden>
            {STAGES.map((s, i) => (
              <span key={s.t} className="rounded-full" style={{ background: s.color, flexGrow: [1, 2, 15, 6][i] }} />
            ))}
          </div>
          <ol className="mt-[var(--s-group)] grid gap-x-[var(--s-in)] gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s, i) => (
              <li key={s.t} className="reveal flex flex-col gap-4">
                <p className="flex items-baseline justify-between">
                  <span className="num t2 !font-medium text-[var(--ink-30)]">0{i + 1}</span>
                  <span className="meta">{s.days}</span>
                </p>
                <h3 className="t3">{s.t}</h3>
                <dl className="flex flex-col gap-3">
                  <div className="rounded-[16px] bg-paper p-4">
                    <dt className="meta">אתם</dt>
                    <dd className="mt-1">{s.you}</dd>
                  </div>
                  <div className="rounded-[16px] bg-ink p-4 text-[var(--on-ink)]">
                    <dt className="meta !text-[var(--on-ink-60)]">אני</dt>
                    <dd className="mt-1">{s.me}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* atmosphere + documents */}
      <section className="section pt-0" aria-labelledby="docs">
        <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1fr_1.1fr] md:items-start">
          <div className="reveal md:sticky md:top-24">
            <Photo name="table" alt="ידיים של זוג עוברות על הצעות משכנתא מודפסות ליד שולחן המטבח" w={1856} h={2304} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/5] w-full rounded-[28px] object-cover md:aspect-[4/4.4]" />
          </div>
          <div className="reveal">
            <p className="meta">רשימת מסמכים</p>
            <h2 id="docs" className="t2 mt-4 max-w-[14ch]">מה להכין לשלב 3.</h2>
            <p className="mt-5 max-w-[44ch] text-[var(--ink-60)]">סמנו מה כבר יש לכם. הרשימה נשמרת בדפדפן הזה, כך שאפשר לחזור אליה מהטלפון בזמן שאוספים.</p>
            <div className="mt-[var(--s-group)]"><Checklist /></div>
          </div>
        </div>
      </section>

      <CtaBand title="השלב הראשון לוקח שלוש דקות." text="משם אני לוקחת את רוב העבודה." />
    </Shell>
  );
}
