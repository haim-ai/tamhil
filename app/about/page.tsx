import type { Metadata } from "next";
import Shell, { CtaBand, PageHead } from "@/components/Shell";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "מי אני: מיכל שגיא, יועצת משכנתאות",
  description: "9 שנים ניהלתי מחלקת משכנתאות בבנק. היום אני בצד שלכם: בונה תמהיל ומנהלת מכרז בין הבנקים.",
  alternates: { canonical: "/about/" },
};

const STORY = [
  { k: "2008", t: "התחלתי בצד של הבנק.", d: "פקידת משכנתאות בסניף בפתח תקווה. ראיתי כל יום זוגות חותמים על הצעה ראשונה, בלי להבין מה יש בה." },
  { k: "2015", t: "ניהלתי מחלקה שלמה.", d: "תשע שנים כמנהלת מחלקת משכנתאות. למדתי איך בנק מתמחר לקוח, ומתי הוא מוכן לרדת במחיר." },
  { k: "2017", t: "עברתי צד.", d: "פתחתי משרד עצמאי עם כלל אחד: לא לקבל שקל מאף בנק. ככה מותר לי לריב איתם בשבילכם." },
];

const RULES = [
  { t: "מספרים, לא תחושות", d: "כל המלצה מגיעה עם החזר חודשי, סך הכל לתשלום ומבחן סערה." },
  { t: "אומרת גם כשאין", d: "אם אין מה לחסוך במחזור, או שהדירה גדולה מדי, אגיד את זה בשיחה הראשונה." },
  { t: "אתם מבינים, אתם מחליטים", d: "יוצאים מכל פגישה עם תמהיל שאתם יודעים להסביר לבד." },
];

export default function Page() {
  return (
    <Shell>
      <PageHead crumbs={[["מי אני"]]} title="נעים מאוד, מיכל." lead="יועצת משכנתאות מוסמכת. 16 שנה בתחום, 9 מהן מהצד של הבנק." />

      {/* portrait + the line that sums it up */}
      <section className="section" aria-label="היכרות">
        <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <Photo name="michal" alt="מיכל שגיא, יועצת משכנתאות, במשרד שלה ליד החלון" w={1792} h={2400} priority sizes="(min-width: 768px) 42vw, 100vw" className="reveal aspect-[3/4] w-full rounded-[28px] object-cover" />
          <blockquote className="reveal t2 !font-medium !leading-[1.08]">
            ״תשע שנים ראיתי מהצד של הבנק איך אנשים חותמים על משכנתא שהם לא מבינים. היום אני יושבת בצד השני של השולחן.״
          </blockquote>
        </div>
      </section>

      {/* how it started: zigzag, one step at a time */}
      <section className="section pt-0" aria-labelledby="story">
        <div className="wrap">
          <h2 id="story" className="t2 reveal">איך הכל התחיל.</h2>
          <ol className="mt-[var(--s-group)] flex flex-col gap-[var(--s-group)]">
            {STORY.map((s, i) => (
              <li key={s.k} className={`reveal grid gap-4 border-t pt-6 hair md:w-[62%] md:grid-cols-[auto_1fr] md:gap-8 ${i === 1 ? "md:ms-auto" : i === 2 ? "md:mx-auto" : ""}`}>
                <span className="num t2 !font-medium text-accent">{s.k}</span>
                <div>
                  <h3 className="t3">{s.t}</h3>
                  <p className="mt-2 text-[var(--ink-60)]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* atmosphere: a real meeting */}
      <section aria-label="פגישה במשרד" className="reveal">
        <Photo name="meeting" alt="מיכל מסבירה לזוג צעיר תרשים פשוט ליד שולחן עגול במשרד" w={2752} h={1536} sizes="100vw" className="aspect-[16/9] max-h-[80svh] w-full object-cover md:aspect-[21/9]" />
      </section>

      {/* three rules */}
      <section className="section" aria-labelledby="rules">
        <div className="wrap">
          <h2 id="rules" className="t2 reveal max-w-[14ch]">שלושה כללים שלא זזים.</h2>
          <ol className="mt-[var(--s-group)] grid gap-x-[var(--s-in)] gap-y-10 md:grid-cols-3">
            {RULES.map((r, i) => (
              <li key={r.t} className="reveal border-t pt-6 hair">
                <span className="num t2 !font-medium text-[var(--ink-30)]">0{i + 1}</span>
                <h3 className="t3 mt-4">{r.t}</h3>
                <p className="mt-3 text-[var(--ink-60)]">{r.d}</p>
              </li>
            ))}
          </ol>
          <dl className="reveal mt-[var(--s-out)] grid grid-cols-2 gap-6 border-t pt-8 hair md:grid-cols-4">
            {[["16", "שנה בתחום"], ["1,240", "משפחות שליוויתי"], ["14", "בנקים וגופי מימון"], ["24", "ימים בממוצע עד אישור"]].map(([v, l]) => (
              <div key={l}>
                <dt className="num font-bold leading-none tracking-[-0.04em] text-[length:clamp(2.6rem,1rem+4vw,5rem)]">{v}</dt>
                <dd className="meta mt-2">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title="שיחה ראשונה, בחינם." text="מתחילים בשאלון של שלוש דקות, ואני חוזרת אליכם תוך יום עסקים." />
    </Shell>
  );
}
