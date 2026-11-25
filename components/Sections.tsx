import Link from "next/link";

const CTA = ({ children = "לשאלון ההתאמה" }: { children?: React.ReactNode }) => (
  <Link href="/questionnaire" className="btn">
    {children} <span className="arrow" aria-hidden>←</span>
  </Link>
);

/* 02 · how it works: four steps on one line that fills like the mix bar */
const STEPS = [
  { t: "שאלון של 3 דקות", d: "אתם עונים על מה שהבנק היה שואל, מהספה, בלי פקיד מולכם." },
  { t: "שיחת היכרות", d: "30 דקות בטלפון או בזום. אני אומרת מה אפשרי, ובכמה." },
  { t: "תמהיל ומכרז", d: "אני בונה 2-3 תמהילים ושולחת אותם למכרז. הבנקים מתחרים עליכם." },
  { t: "חתימה בשקט", d: "אני איתכם עד החתימה, ובודקת כל סעיף לפני שאתם חותמים." },
];

export function How() {
  return (
    <section id="how" className="section scroll-mt-16" aria-labelledby="how-title">
      <div className="wrap">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="meta">02 · איך זה עובד</p>
            <h2 id="how-title" className="t2 mt-4 max-w-[13ch]">ארבעה צעדים, ואתם לא הולכים לבנק.</h2>
          </div>
          <p className="max-w-sm text-[var(--ink-60)]">מהשאלון ועד החתימה עוברים בממוצע 24 יום. רוב העבודה קורית אצלי, לא אצלכם.</p>
        </div>

        <ol className="reveal mt-[var(--s-group)] grid gap-x-1 gap-y-10 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex flex-col gap-4">
              <span
                className="block h-3 rounded-full"
                style={{ background: i === 0 ? "var(--accent)" : i === 3 ? "var(--ink)" : i === 1 ? "var(--accent-35)" : "var(--ink-30)" }}
                aria-hidden
              />
              <span className="num t2 !font-medium text-[var(--ink-30)]">0{i + 1}</span>
              <h3 className="t3">{s.t}</h3>
              <p className="max-w-[28ch] text-[var(--ink-60)]">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 03 · why: the bank's first offer against the offer after the tender */
export function Why() {
  return (
    <section className="section bg-paper" aria-labelledby="why-title">
      <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1.25fr_1fr] md:items-center">
        <div className="reveal">
          <p className="meta">03 · למה דרכי</p>
          <p className="num mt-6 font-bold leading-[0.85] tracking-[-0.05em] text-[clamp(5rem,2rem+14vw,15rem)]" dir="ltr">
            −0.62%
          </p>
          <h2 id="why-title" className="t3 mt-6 max-w-[24ch]">פחות ריבית בממוצע, מול ההצעה הראשונה שהבנק נתן ללקוחות שלי.</h2>
        </div>

        <div className="reveal flex flex-col gap-[var(--s-group)]">
          <figure aria-label="דוגמה: החזר חודשי בהצעה הראשונה של הבנק מול אחרי מכרז">
            <div className="flex flex-col gap-3">
              <div>
                <p className="flex justify-between text-[length:var(--t5)]"><span>ההצעה הראשונה של הבנק</span><span className="num font-medium">7,180 ₪</span></p>
                <span className="mt-2 block h-5 w-full rounded-full bg-[var(--ink-30)]" />
              </div>
              <div>
                <p className="flex justify-between text-[length:var(--t5)]"><span>אחרי מכרז בין 4 בנקים</span><span className="num font-medium">6,690 ₪</span></p>
                <span className="mt-2 block h-5 w-[93%] rounded-full bg-accent" />
              </div>
            </div>
            <figcaption className="meta mt-3">490 ₪ בחודש, כפול 25 שנה. משכנתא של 1.2 מיליון, דוגמה מתיק אמיתי.</figcaption>
          </figure>
          <ul className="flex flex-col divide-y divide-[var(--ink-12)] border-y hair">
            {["לא עובדת אצל אף בנק, ולא מקבלת מהם עמלה.", "שכר קבוע שסוגרים מראש, בלי אחוזים מהמשכנתא.", "ליווי עד החתימה, ובדיקה חוזרת כל שנה."].map((t) => (
              <li key={t} className="py-4">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 04 · about: one quote does the talking */
export function About() {
  return (
    <section id="michal" className="section scroll-mt-16" aria-labelledby="about-title">
      <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[auto_1fr]">
        <div className="reveal flex flex-col items-start gap-5">
          <p className="meta">04 · מי אני</p>
          <div className="grid aspect-square w-[clamp(9rem,18vw,14rem)] place-items-center rounded-full bg-ink text-[clamp(3rem,6vw,5rem)] font-bold text-[var(--on-ink)]" aria-hidden>
            מ״ש
          </div>
          <div>
            <h2 id="about-title" className="t3 !font-bold">מיכל שגיא</h2>
            <p className="text-[var(--ink-60)]">יועצת משכנתאות מוסמכת</p>
          </div>
        </div>
        <div className="reveal flex flex-col gap-[var(--s-group)]">
          <blockquote className="t2 !font-medium !leading-[1.08]">
            ״רוב האנשים בוחרים משכנתא כמו שבוחרים מנה במסעדה זרה: מה שהמלצר המליץ. אני כאן כדי שתבינו את התפריט.״
          </blockquote>
          <dl className="grid gap-6 border-t pt-6 hair sm:grid-cols-3">
            {[
              ["9 שנים", "מנהלת מחלקת משכנתאות בבנק, לפני שעברתי צד"],
              ["1,240", "משפחות שליוויתי עד החתימה"],
              ["24 יום", "בממוצע מהשאלון ועד אישור סופי"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="num t3 !font-bold">{v}</dt>
                <dd className="mt-1 text-[length:var(--t5)] text-[var(--ink-60)]">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* 05 · voices: all visible, no carousel */
const VOICES = [
  { q: "הבנק הציע לנו 7,400 בחודש. מיכל חזרה עם 6,850 ועם תמהיל שאנחנו באמת מבינים.", n: "שני ואלון", d: "דירה ראשונה, ראשון לציון" },
  { q: "הפריים קפץ ונכנסתי ללחץ. תוך שבועיים מחזרנו, וההחזר ירד ב-1,100 ₪.", n: "רונית מ.", d: "מחזור משכנתא, חיפה" },
  { q: "כעצמאי כל בנק שלח אותי הביתה. היא ידעה בדיוק אילו מסמכים להביא ולאן.", n: "יואב ט.", d: "עצמאי, משפרי דיור" },
];

export function Voices() {
  return (
    <section className="section bg-ink text-[var(--on-ink)]" aria-labelledby="voices-title">
      <div className="wrap">
        <p className="meta reveal !text-[var(--on-ink-60)]">05 · לקוחות</p>
        <h2 id="voices-title" className="t2 reveal mt-4 max-w-[15ch]">מה קורה אחרי שהתמהיל נסגר.</h2>
        <div className="mt-[var(--s-group)] grid gap-4 md:grid-cols-[1.3fr_1fr_1fr]">
          {VOICES.map((v, i) => (
            <figure key={v.n} className={`reveal flex flex-col justify-between gap-8 rounded-[22px] p-[var(--s-in)] ${i === 0 ? "bg-accent text-[var(--paper)]" : "border border-[var(--on-ink-15)]"}`}>
              <blockquote className={i === 0 ? "t3 !font-medium" : "t4"}>״{v.q}״</blockquote>
              <figcaption>
                <p className="font-medium">{v.n}</p>
                <p className={`text-[length:var(--t5)] ${i === 0 ? "opacity-75" : "text-[var(--on-ink-60)]"}`}>{v.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 06 · FAQ: open list, no accordion */
const FAQ = [
  ["כמה זה עולה?", "שכר קבוע שסוגרים מראש, לפי מורכבות התיק. בשיחה הראשונה תדעו בדיוק, והיא בחינם."],
  ["למה לא ללכת לבנק לבד?", "אפשר. אבל בנק אחד מציע את מה שטוב לו. כשכמה בנקים מתמחרים אתכם, ההצעות משתנות."],
  ["מתי כדאי להתחיל?", "לפני שחותמים על חוזה. אישור עקרוני מראש מונע הפתעות ביום החתימה."],
  ["כדאי למחזר משכנתא קיימת?", "לפעמים כן. בשאלון בוחרים 'מחזור', ואני בודקת אם יש מה לחסוך, בלי התחייבות."],
];

export function Faq() {
  return (
    <section id="faq" className="section scroll-mt-16" aria-labelledby="faq-title">
      <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1fr_2fr]">
        <div className="reveal">
          <p className="meta">06 · שאלות</p>
          <h2 id="faq-title" className="t2 mt-4">מה שואלים אותי הכי הרבה.</h2>
        </div>
        <dl className="reveal grid gap-x-[var(--s-in)] gap-y-10 sm:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <div key={q} className="border-t pt-5 hair">
              <dt className="t3">{q}</dt>
              <dd className="mt-3 text-[var(--ink-60)]">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* final call */
export function Final() {
  return (
    <section className="section pt-0" aria-labelledby="final-title">
      <div className="wrap">
        <div className="reveal flex flex-col items-start gap-[var(--s-group)] border-t pt-[var(--s-out)] hair">
          <h2 id="final-title" className="t1 max-w-[12ch]">שלוש דקות עכשיו. שלושים שנה של שקט.</h2>
          <CTA>מתחילים את השאלון</CTA>
        </div>
      </div>
    </section>
  );
}

/* phones: one CTA always within reach */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-[rgb(228_233_236/0.92)] p-3 backdrop-blur-md hair md:hidden">
      <Link href="/questionnaire" className="btn w-full">
        לשאלון ההתאמה · 3 דקות <span className="arrow" aria-hidden>←</span>
      </Link>
    </div>
  );
}
