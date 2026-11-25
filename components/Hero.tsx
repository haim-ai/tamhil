"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const FINAL = { fixed: 45, prime: 35, variable: 20 };

export default function Hero() {
  // The bar arrives as three equal parts and settles into a mix, once.
  const [mix, setMix] = useState({ fixed: 33, prime: 33, variable: 33 });
  useEffect(() => {
    const t = setTimeout(() => setMix(FINAL), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="wrap flex min-h-[calc(100svh-4.5rem)] flex-col justify-between gap-[var(--s-group)] pb-[var(--s-in)] pt-[clamp(2rem,6vh,5rem)]">
        <p className="meta reveal in">מיכל שגיא · יועצת משכנתאות · 16 שנה, 1,240 משפחות</p>

        <h1 id="hero-title" className="flex flex-col">
          <span className="t2 max-w-[14ch] text-[var(--ink-60)] lg:max-w-none">משכנתא היא לא הלוואה אחת.</span>
          <span className="t1 mt-1 !text-[clamp(4.4rem,0.5rem+15.5vw,17rem)]">היא תמהיל.</span>
        </h1>

        <div className="grid items-end gap-[var(--s-group)] md:grid-cols-[1.1fr_1fr]">
          <div className="flex max-w-xl flex-col items-start gap-6">
            <p className="t3 !font-normal">
              אני בונה לכם שילוב מסלולים שמתאים להכנסה, לתוכניות ולשקט שלכם, ונלחמת עליו מול הבנקים.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/questionnaire" className="btn">
                לשאלון ההתאמה · 3 דקות <span className="arrow" aria-hidden>←</span>
              </Link>
              <a href="#mixer" className="link font-medium">או שחקו עם התמהיל בעצמכם</a>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t pt-5 hair md:justify-self-end md:min-w-[26rem]">
            {[
              ["₪94K", "חיסכון ממוצע ללקוח"],
              ["14", "בנקים וגופי מימון"],
              ["4.9★", "מ-380 ביקורות"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="num text-[length:var(--t3)] font-bold leading-none" dir="ltr">{v}</dd>
                <dd className="meta mt-2">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure aria-label="דוגמה לתמהיל: 45% קבועה, 35% פריים, 20% משתנה">
          <div className="h-[clamp(3rem,7vw,5.5rem)]">
            <div className="mixbar">
              <span className="seg-fixed" style={{ flexGrow: mix.fixed }} />
              <span className="seg-prime" style={{ flexGrow: mix.prime }} />
              <span className="seg-variable" style={{ flexGrow: mix.variable }} />
            </div>
          </div>
          <figcaption className="mt-3 flex gap-1 text-[length:var(--t5)] font-medium">
            {[
              ["קבועה", mix.fixed],
              ["פריים", mix.prime],
              ["משתנה", mix.variable],
            ].map(([n, v]) => (
              <span key={n as string} className="flex justify-between gap-2 transition-[flex-grow] duration-[1200ms]" style={{ flexGrow: v as number, flexBasis: 0, transitionTimingFunction: "var(--ease)" }}>
                <span>{n}</span>
                <span className="num text-[var(--ink-60)]">{v}%</span>
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
