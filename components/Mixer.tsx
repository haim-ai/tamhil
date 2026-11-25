"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { MIN_FIXED, TRACKS, mixPayment, type Mix } from "@/lib/mortgage";
import { ils, pct } from "@/lib/format";

const PRESETS: { name: string; cuts: [number, number] }[] = [
  { name: "שקט", cuts: [0.7, 1] },
  { name: "מאוזן", cuts: [0.4, 0.75] },
  { name: "גמיש", cuts: [0.34, 1] },
  { name: "זול בהתחלה", cuts: [0.34, 0.5] },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const round = (v: number) => Math.round(v * 100) / 100;

export default function Mixer() {
  const [loan, setLoan] = useState(1_200_000);
  const [years, setYears] = useState(25);
  // two cuts along the bar, measured from the right edge (RTL): fixed | prime | variable
  const [cuts, setCuts] = useState<[number, number]>([0.4, 0.75]);
  const bar = useRef<HTMLDivElement>(null);
  const drag = useRef<0 | 1 | null>(null);

  const mix: Mix = { fixed: cuts[0], prime: round(cuts[1] - cuts[0]), variable: round(1 - cuts[1]) };
  const pay = mixPayment(loan, years, mix);
  const storm = mixPayment(loan, years, mix, true);
  const total = pay * years * 12;
  const legal = mix.fixed >= MIN_FIXED - 0.005;

  const setCut = useCallback((i: 0 | 1, v: number) => {
    setCuts(([a, b]) => (i === 0 ? [round(clamp(v, 0, b)), b] : [a, round(clamp(v, a, 1))]));
  }, []);

  const fracAt = (clientX: number) => {
    const r = bar.current!.getBoundingClientRect();
    return (r.right - clientX) / r.width;
  };

  const onDown = (e: React.PointerEvent) => {
    const f = fracAt(e.clientX);
    // grab the nearest cut, so a tap anywhere on the bar works too
    const i: 0 | 1 = Math.abs(f - cuts[0]) <= Math.abs(f - cuts[1]) ? 0 : 1;
    drag.current = i;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setCut(i, f);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current !== null) setCut(drag.current, fracAt(e.clientX));
  };
  const onUp = () => {
    drag.current = null;
  };

  const onKey = (i: 0 | 1) => (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.01;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setCut(i, cuts[i] + step);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setCut(i, cuts[i] - step);
    }
  };

  const segs = [
    { id: "fixed", w: mix.fixed, cls: "bg-[var(--on-ink)]" },
    { id: "prime", w: mix.prime, cls: "bg-accent" },
    { id: "variable", w: mix.variable, cls: "bg-[var(--accent-35)]" },
  ];

  const verdict = !legal
    ? "בנק ישראל לא יאשר את זה: לפחות שליש מהמשכנתא חייב להיות בריבית קבועה."
    : mix.fixed >= 0.6
      ? "תמהיל שקט: רוב ההחזר לא יזוז, גם בסערה."
      : mix.prime + mix.variable > 0.62
        ? "תמהיל זריז: זול יותר היום, רגיש יותר מחר."
        : "תמהיל מאוזן: קצת שקט, קצת גמישות.";

  return (
    <section id="mixer" className="section scroll-mt-16 bg-ink text-[var(--on-ink)]" aria-labelledby="mixer-title">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="meta !text-[var(--on-ink-60)]">01 · התמהיל</p>
            <h2 id="mixer-title" className="t2 mt-4 max-w-[16ch]">גררו את הקווים. תראו מה זה עושה להחזר.</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="תמהילים מוכנים">
            {PRESETS.map((p) => {
              const on = cuts[0] === p.cuts[0] && cuts[1] === p.cuts[1];
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setCuts(p.cuts)}
                  aria-pressed={on}
                  className={`min-h-11 rounded-full border px-4 text-[length:var(--t5)] font-medium transition ${on ? "border-[var(--on-ink)] bg-[var(--on-ink)] text-ink" : "border-[var(--on-ink-15)] hover:border-[var(--on-ink-60)]"}`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* the bar */}
        <div className="reveal mt-[var(--s-group)] pt-6">
          <div
            ref={bar}
            className="relative h-[clamp(5rem,12vw,8.5rem)] cursor-ew-resize touch-none select-none"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div className="flex h-full w-full overflow-hidden rounded-[22px]">
              {segs.map((s, i) => (
                <span key={s.id} className={`${s.cls} h-full`} style={{ flexGrow: s.w, flexBasis: 0, marginInlineEnd: i < 2 && s.w > 0 ? 4 : 0 }} />
              ))}
            </div>
            {/* the one-third line of the Bank of Israel */}
            <span
              className="pointer-events-none absolute -bottom-2 -top-2 border-s border-dashed border-[var(--on-ink-60)]"
              style={{ insetInlineStart: `${MIN_FIXED * 100}%` }}
              aria-hidden
            >
              <span className="absolute -top-6 whitespace-nowrap text-[0.75rem] text-[var(--on-ink-60)]" style={{ insetInlineStart: -12 }}>שליש</span>
            </span>
            {([0, 1] as const).map((i) => (
              <button
                key={i}
                type="button"
                role="slider"
                aria-label={i === 0 ? "גבול בין קבועה לפריים" : "גבול בין פריים למשתנה"}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(cuts[i] * 100)}
                aria-valuetext={i === 0 ? `קבועה ${pct(mix.fixed)}` : `משתנה ${pct(mix.variable)}`}
                onKeyDown={onKey(i)}
                className="group absolute -bottom-2 -top-2 z-10 w-11 translate-x-1/2"
                style={{ insetInlineStart: `${cuts[i] * 100}%` }}
              >
                <span className="mx-auto block h-full w-[6px] rounded-full bg-[var(--on-ink)] shadow-[0_0_0_4px_var(--ink)] transition-transform group-hover:scale-x-150 group-focus-visible:scale-x-150" />
                <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--on-ink)] text-[0.85rem] text-ink shadow-lg" aria-hidden>
                  ⇆
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {TRACKS.map((t) => (
              <div key={t.id} className="border-t border-[var(--on-ink-15)] pt-4">
                <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="font-medium"><span className="sm:hidden">{t.short}</span><span className="hidden sm:inline">{t.name}</span></span>
                  <span className="num text-[length:var(--t3)] font-bold">{pct(mix[t.id])}</span>
                </p>
                <p className="mt-2 hidden text-[length:var(--t5)] text-[var(--on-ink-60)] sm:block">{t.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* inputs + results */}
        <div className="reveal mt-[var(--s-group)] grid gap-[var(--s-group)] md:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-8">
            <label className="flex flex-col gap-3">
              <span className="flex justify-between">
                <span>סכום המשכנתא</span>
                <span className="num font-bold">{ils(loan)}</span>
              </span>
              <input type="range" min={300_000} max={3_000_000} step={10_000} value={loan} onChange={(e) => setLoan(+e.target.value)} className="h-11 accent-[var(--accent)]" />
            </label>
            <label className="flex flex-col gap-3">
              <span className="flex justify-between">
                <span>תקופה</span>
                <span className="num font-bold">{years} שנה</span>
              </span>
              <input type="range" min={10} max={30} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className="h-11 accent-[var(--accent)]" />
            </label>
            <p className="text-[length:var(--t5)] text-[var(--on-ink-60)]">
              ריביות להמחשה בלבד: קבועה 5.1%, פריים 5%, משתנה 4.4%. בשאלון אנחנו בודקים את המספרים האמיתיים שלכם.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="meta !text-[var(--on-ink-60)]">החזר חודשי ראשון</p>
              <p className="num t1 mt-2 !text-[clamp(3rem,1rem+6.5vw,7.5rem)]">{ils(pay)}</p>
            </div>
            <div className="border-t border-[var(--on-ink-15)] pt-4">
              <p className="meta !text-[var(--on-ink-60)]">מבחן הסערה: הריבית עולה ב-<span dir="ltr">2%</span></p>
              <p className="num t3 mt-2 !font-bold">
                +{ils(storm - pay)} <span className="font-normal text-[var(--on-ink-60)]">בחודש</span>
              </p>
            </div>
            <div className="border-t border-[var(--on-ink-15)] pt-4">
              <p className="meta !text-[var(--on-ink-60)]">סך הכל תחזירו</p>
              <p className="num t3 mt-2 !font-bold">{ils(total)}</p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:col-span-2">
              <p role="status" className={legal ? "text-[var(--on-ink-60)]" : "font-medium text-[var(--error-soft)]"}>
                {verdict}
              </p>
              <Link href="/questionnaire" className="btn">
                בנו לי את התמהיל האמיתי <span className="arrow" aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
