import Link from "next/link";
import Photo from "./Photo";
import { SERVICES } from "@/lib/content";

const CTA = ({ children = "לשאלון ההתאמה" }: { children?: React.ReactNode }) => (
  <Link href="/questionnaire/" className="btn">
    {children} <span className="arrow" aria-hidden>←</span>
  </Link>
);

/* 01 · services: four doors, one per situation */
export function ServicesTeaser() {
  return (
    <section className="section !pt-[var(--s-group)]" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="meta">01 · שירותים</p>
            <h2 id="svc-title" className="t2 mt-4 max-w-[16ch]">באיזה מצב אתם?</h2>
          </div>
          <Link href="/services/" className="link font-medium">לכל השירותים</Link>
        </div>
        <ul className="mt-[var(--s-group)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.slug} className="reveal">
              <Link href={`/services/${s.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-paper transition hover:shadow-[0_24px_50px_-30px_rgb(20_32_27/0.45)]">
                <span className="block overflow-hidden">
                  <Photo name={s.image.name} alt="" w={s.image.w} h={s.image.h} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-1 flex-col gap-2 p-5">
                  <span className="t3 !font-bold">{s.label}</span>
                  <span className="flex-1 text-[length:var(--t5)] text-[var(--ink-60)]">{s.short}</span>
                  <span className="mt-2 text-[length:var(--t5)] font-medium text-accent">לעמוד השירות ←</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 02 · how it works: the kitchen-table photo stays, the four steps scroll past it */
const STEPS = [
  { t: "שאלון של 3 דקות", d: "אתם עונים על מה שהבנק היה שואל, מהספה, בלי פקיד מולכם." },
  { t: "שיחת היכרות", d: "30 דקות בטלפון או בזום. אני אומרת מה אפשרי, ובכמה." },
  { t: "תמהיל ומכרז", d: "אני בונה 2-3 תמהילים ושולחת אותם למכרז. הבנקים מתחרים עליכם." },
  { t: "חתימה בשקט", d: "אני איתכם עד החתימה, ובודקת כל סעיף לפני שאתם חותמים." },
];
const STEP_COLORS = ["var(--accent)", "var(--accent-35)", "var(--ink-30)", "var(--ink)"];

export function How() {
  return (
    <section id="how" className="section scroll-mt-16" aria-labelledby="how-title">
      <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1fr_1.05fr] md:items-start">
        <div>
          <div className="reveal">
            <p className="meta">03 · איך זה עובד</p>
            <h2 id="how-title" className="t2 mt-4 max-w-[13ch]">ארבעה צעדים, ואתם לא הולכים לבנק.</h2>
            <p className="mt-6 max-w-sm text-[var(--ink-60)]">מהשאלון ועד החתימה עוברים בממוצע 24 יום. רוב העבודה קורית אצלי, לא אצלכם.</p>
            <Link href="/process/" className="link mt-4 inline-block font-medium">לתהליך המלא ורשימת המסמכים</Link>
          </div>
          <ol className="mt-[var(--s-group)] flex flex-col">
            {STEPS.map((s, i) => (
              <li key={s.t} className="reveal grid grid-cols-[auto_1fr] gap-x-6 border-t py-7 hair">
                <span className="num t2 !font-medium text-[var(--ink-30)]">0{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <span className="block h-2 w-16 rounded-full" style={{ background: STEP_COLORS[i] }} aria-hidden />
                  <h3 className="t3 mt-2">{s.t}</h3>
                  <p className="max-w-[34ch] text-[var(--ink-60)]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="reveal md:sticky md:top-24">
          <Photo
            name="table"
            alt="ידיים של זוג עוברות על הצעות משכנתא מודפסות ליד שולחן המטבח, עם עיפרון, תה ומחשב נייד"
            w={1856}
            h={2304}
            sizes="(min-width: 768px) 48vw, 100vw"
            className="aspect-[4/5] w-full rounded-[28px] object-cover"
          />
          <p className="meta mt-3">שלב 3: עוברים יחד על ההצעות, שורה אחרי שורה.</p>
        </div>
      </div>
    </section>
  );
}

/* 03 · why: the number crosses into the photo of moving day */
export function Why() {
  return (
    <section className="section overflow-hidden bg-paper" aria-labelledby="why-title">
      <div className="wrap">
        <div className="relative grid md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="reveal relative z-10">
            <p className="meta">04 · למה דרכי</p>
            <p className="num mt-6 font-bold leading-[0.85] tracking-[-0.05em] text-[length:clamp(5rem,2rem+13vw,15rem)]">
              <span dir="ltr">−0.62%</span>
            </p>
            <h2 id="why-title" className="t3 mt-6 max-w-[22ch]">פחות ריבית בממוצע, מול ההצעה הראשונה שהבנק נתן ללקוחות שלי.</h2>
          </div>
          <div className="reveal mt-[var(--s-group)] md:mt-0">
            <Photo
              name="stairs"
              alt="זוג צעיר סוחב קרטונים במעלה חדר מדרגות של בניין באוהאוס בתל אביב, ביום המעבר"
              w={2752}
              h={1536}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="aspect-[4/3] w-full rounded-[28px] object-cover md:aspect-[5/4]"
            />
          </div>
        </div>

        <div className="mt-[var(--s-group)] grid gap-[var(--s-group)] md:grid-cols-2">
          <figure className="reveal" aria-label="דוגמה: החזר חודשי בהצעה הראשונה של הבנק מול אחרי מכרז">
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
            <figcaption className="meta mt-3">490 ₪ בחודש, כפול 25 שנה. משכנתא של 1.2 מיליון, דוגמה מתיק.</figcaption>
          </figure>
          <ul className="reveal flex flex-col divide-y divide-[var(--ink-12)] border-y hair">
            {["לא עובדת אצל אף בנק, ולא מקבלת מהם עמלה.", "שכר קבוע שסוגרים מראש, בלי אחוזים מהמשכנתא.", "ליווי עד החתימה, ובדיקה חוזרת כל שנה."].map((t) => (
              <li key={t} className="py-4">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 04 · about: Michal, and one quote */
export function About() {
  return (
    <section id="michal" className="section scroll-mt-16" aria-labelledby="about-title">
      <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <figure className="reveal relative">
          <Photo
            name="michal"
            alt="מיכל שגיא, יועצת משכנתאות, במשרד שלה ליד החלון"
            w={1792}
            h={2400}
            sizes="(min-width: 768px) 38vw, 100vw"
            className="aspect-[3/4] w-full rounded-[28px] object-cover"
          />
          <figcaption className="absolute bottom-4 start-4 rounded-full bg-bg px-4 py-2 text-[length:var(--t5)] font-medium">
            מיכל שגיא · יועצת משכנתאות מוסמכת
          </figcaption>
        </figure>
        <div className="reveal flex flex-col gap-[var(--s-group)]">
          <p className="meta">05 · מי אני</p>
          <h2 id="about-title" className="sr-only">מיכל שגיא</h2>
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
          <Link href="/about/" className="btn self-start">להכיר את מיכל <span className="arrow" aria-hidden>←</span></Link>
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
        <p className="meta reveal !text-[var(--on-ink-60)]">06 · לקוחות</p>
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
          <p className="meta">07 · שאלות</p>
          <h2 id="faq-title" className="t2 mt-4">מה שואלים אותי הכי הרבה.</h2>
          <Link href="/faq/" className="link mt-6 inline-block font-medium">לכל השאלות</Link>
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

/* final call: the balcony at blue hour, thirty years later */
export function Final() {
  return (
    <section className="relative overflow-hidden bg-ink text-[var(--on-ink)]" aria-labelledby="final-title">
      <Photo
        name="balcony"
        alt="זוג יושב במרפסת בתל אביב בשעה הכחולה, עם כוסות ביד, ומסתכל על הגגות"
        w={3168}
        h={1344}
        className="absolute inset-0 h-full w-full object-cover object-[30%_70%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(20_32_27/0.82),rgb(20_32_27/0.35)_42%,rgb(20_32_27/0.05)_70%,rgb(20_32_27/0.3))]" aria-hidden />
      <div className="wrap relative flex min-h-[min(90svh,52rem)] flex-col items-start justify-start gap-[var(--s-group)] py-[var(--s-out)]">
        <h2 id="final-title" className="t1 reveal max-w-[17ch] !text-[clamp(2.8rem,1rem+5vw,6.75rem)]">שלוש דקות עכשיו. שלושים שנה של שקט.</h2>
        <div className="reveal"><CTA>מתחילים את השאלון</CTA></div>
      </div>
    </section>
  );
}

/* phones: one CTA always within reach */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-[rgb(228_233_236/0.92)] p-3 backdrop-blur-md hair md:hidden">
      <Link href="/questionnaire/" className="btn w-full">
        לשאלון ההתאמה · 3 דקות <span className="arrow" aria-hidden>←</span>
      </Link>
    </div>
  );
}
