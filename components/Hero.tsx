"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Photo from "./Photo";

const FINAL = { fixed: 45, prime: 35, variable: 20 };

export default function Hero() {
  // The bar arrives as three equal parts and settles into a mix, once.
  const [mix, setMix] = useState({ fixed: 33, prime: 33, variable: 33 });
  useEffect(() => {
    const t = setTimeout(() => setMix(FINAL), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative" aria-labelledby="hero-title">
      {/* the photo: a new, almost empty apartment. On desktop the headline sits on its quiet wall. */}
      <div className="relative md:h-[clamp(34rem,44vw,calc(100svh-4.5rem))]">
        <div className="relative aspect-[4/3] overflow-hidden md:absolute md:inset-0 md:aspect-auto">
          <Photo
            name="hero"
            alt="זוג צעיר יושב על הרצפה בדירה החדשה והריקה שלהם, שותים קפה וצוחקים"
            w={3168}
            h={1344}
            priority
            className="h-full w-full object-cover object-[18%_50%] md:object-left"
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(to_left,rgb(228_233_236/0.7),rgb(228_233_236/0.25)_45%,transparent_65%)] md:block" aria-hidden />
        </div>

        <div className="wrap relative flex h-full flex-col justify-center gap-[var(--s-group)] py-[var(--s-group)] md:py-0">
          <div className="flex flex-col gap-5 md:max-w-[min(40rem,44%)]">
            <p className="meta">מיכל שגיא · יועצת משכנתאות · 16 שנה, 1,240 משפחות</p>
            <h1 id="hero-title" className="flex flex-col">
              <span className="t3 !font-bold text-[var(--ink-60)]">משכנתא היא לא הלוואה אחת.</span>
              <span className="t1 mt-1 whitespace-nowrap !text-[clamp(3.6rem,0.6rem+7.4vw,10rem)]">היא תמהיל.</span>
            </h1>
            <p className="t4 max-w-[34ch]">אני בונה לכם שילוב מסלולים שמתאים להכנסה ולשקט שלכם, ונלחמת עליו מול הבנקים.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/questionnaire" className="btn">
                לשאלון ההתאמה · 3 דקות <span className="arrow" aria-hidden>←</span>
              </Link>
              <a href="#mixer" className="link font-medium">או שחקו עם התמהיל בעצמכם</a>
            </div>
          </div>
        </div>
      </div>

      {/* the thread: the mix bar overlaps the bottom edge of the photo */}
      <div className="wrap relative z-10 md:-mt-[clamp(3.5rem,6vw,5rem)]">
        <figure className="rounded-[28px] bg-bg p-[clamp(0.75rem,1.4vw,1.25rem)] md:shadow-[0_30px_60px_-30px_rgb(20_32_27/0.35)]" aria-label="דוגמה לתמהיל: 45% קבועה, 35% פריים, 20% משתנה">
          <div className="h-[clamp(2.6rem,5vw,4.25rem)]">
            <div className="mixbar">
              <span className="seg-fixed" style={{ flexGrow: mix.fixed }} />
              <span className="seg-prime" style={{ flexGrow: mix.prime }} />
              <span className="seg-variable" style={{ flexGrow: mix.variable }} />
            </div>
          </div>
          <figcaption className="mt-3 flex gap-1 px-1 text-[length:var(--t5)] font-medium">
            {(
              [
                ["קבועה", mix.fixed],
                ["פריים", mix.prime],
                ["משתנה", mix.variable],
              ] as const
            ).map(([n, v]) => (
              <span key={n} className="flex justify-between gap-2 transition-[flex-grow] duration-[1200ms]" style={{ flexGrow: v, flexBasis: 0, transitionTimingFunction: "var(--ease)" }}>
                <span>{n}</span>
                <span className="num text-[var(--ink-60)]">{v}%</span>
              </span>
            ))}
          </figcaption>
        </figure>

        <dl className="grid grid-cols-3 gap-4 py-[var(--s-group)]">
          {[
            ["₪94K", "חיסכון ממוצע ללקוח"],
            ["14", "בנקים וגופי מימון"],
            ["4.9★", "מ-380 ביקורות"],
          ].map(([v, l]) => (
            <div key={l} className="border-t pt-4 hair">
              <dt className="sr-only">{l}</dt>
              <dd className="num text-[length:var(--t3)] font-bold leading-none" dir="ltr" style={{ textAlign: "right" }}>{v}</dd>
              <dd className="meta mt-2">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
