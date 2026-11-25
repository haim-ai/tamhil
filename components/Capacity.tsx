"use client";
import Link from "next/link";
import { useState } from "react";
import { PURPOSES, type Purpose } from "@/lib/mortgage";
import { ils, num, parseMoney } from "@/lib/format";

const RATE = 0.049; // illustrative blended rate

/** How much loan a monthly payment carries (present value of an annuity). */
const loanFor = (payment: number, years: number) => {
  const r = RATE / 12;
  const n = years * 12;
  return payment <= 0 ? 0 : (payment * (1 - Math.pow(1 + r, -n))) / r;
};

function MoneyField({ id, label, value, onChange, hint }: { id: string; label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium">{label}</label>
      <div className="relative">
        <input id={id} className="field num pe-12" inputMode="numeric" value={value ? num(value) : ""} onChange={(e) => onChange(parseMoney(e.target.value))} dir="ltr" style={{ textAlign: "right" }} />
        <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[var(--ink-60)]">₪</span>
      </div>
      {hint && <p className="mt-1.5 text-[length:var(--t5)] text-[var(--ink-60)]">{hint}</p>}
    </div>
  );
}

export default function Capacity() {
  const [purpose, setPurpose] = useState<Purpose>("first");
  const [income, setIncome] = useState(24_000);
  const [obligations, setObligations] = useState(1_500);
  const [equity, setEquity] = useState(500_000);
  const [years, setYears] = useState(25);

  const ltv = PURPOSES.find((p) => p.id === purpose)!.ltv;
  const comfy = Math.max(0, (income - obligations) / 3); // what we recommend
  const ceiling = Math.max(0, income * 0.5 - obligations); // the Bank of Israel limit
  const loanByIncome = loanFor(comfy, years);
  const loanByEquity = equity > 0 ? (equity / (1 - ltv)) * ltv : 0;
  const loan = Math.min(loanByIncome, loanByEquity);
  const price = loan + equity;
  const limitedBy = loanByIncome < loanByEquity ? "income" : "equity";
  const eqShare = price ? equity / price : 0;

  return (
    <section className="section" aria-labelledby="cap-title">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="meta">02 · כמה אפשר לקחת</p>
          <h2 id="cap-title" className="t2 mt-4">כמה דירה ההכנסה וההון העצמי שלכם מחזיקים.</h2>
          <p className="mt-5 text-[var(--ink-60)]">שני דברים מגבילים משכנתא: ההחזר החודשי מול ההכנסה, ואחוז המימון מול ההון העצמי. המחשבון בודק את שניהם, ומראה מי מהם עוצר אתכם.</p>
        </div>

        <div className="mt-[var(--s-group)] grid gap-[var(--s-group)] lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal flex flex-col gap-6">
            <fieldset>
              <legend className="mb-2 font-medium">המצב שלכם</legend>
              <div role="radiogroup" aria-label="מטרה" className="flex flex-wrap gap-2">
                {PURPOSES.filter((p) => p.id !== "refinance").map((p) => (
                  <button key={p.id} type="button" role="radio" aria-checked={purpose === p.id} onClick={() => setPurpose(p.id)} className="chip">
                    {p.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <MoneyField id="c-income" label="הכנסה נטו בחודש" value={income} onChange={setIncome} hint="של כל הלווים יחד" />
              <MoneyField id="c-obl" label="החזרי הלוואות אחרות" value={obligations} onChange={setObligations} />
              <MoneyField id="c-eq" label="הון עצמי" value={equity} onChange={setEquity} hint="בלי הכסף להוצאות הנלוות" />
              <label className="flex flex-col gap-2">
                <span className="flex justify-between font-medium"><span>תקופה</span><span className="num">{years} שנה</span></span>
                <input type="range" min={10} max={30} value={years} onChange={(e) => setYears(+e.target.value)} className="h-[3.5rem] accent-[var(--accent)]" />
              </label>
            </div>
          </div>

          <div className="reveal flex flex-col gap-6 rounded-[28px] bg-paper p-[clamp(1.25rem,3vw,2.5rem)]">
            <div>
              <p className="meta">דירה במחיר של עד</p>
              <p className="num mt-2 font-bold leading-none tracking-[-0.04em] text-[length:clamp(2.6rem,1rem+5vw,5.5rem)]" aria-live="polite">{ils(price)}</p>
            </div>
            <figure aria-label={`הון עצמי ${ils(equity)}, משכנתא ${ils(loan)}`}>
              <div className="mixbar !h-6">
                <span style={{ flexGrow: Math.max(eqShare, 0.02), background: "var(--ink)" }} />
                <span className="seg-prime" style={{ flexGrow: Math.max(1 - eqShare, 0.02) }} />
              </div>
              <figcaption className="mt-2 flex justify-between text-[length:var(--t5)]">
                <span>הון עצמי <span className="num font-medium">{ils(equity)}</span></span>
                <span>משכנתא <span className="num font-medium">{ils(loan)}</span></span>
              </figcaption>
            </figure>
            <dl className="grid gap-4 border-t pt-5 hair sm:grid-cols-2">
              <div>
                <dt className="text-[length:var(--t5)] text-[var(--ink-60)]">החזר מומלץ (שליש מההכנסה הפנויה)</dt>
                <dd className="num t3 mt-1 !font-bold">{ils(comfy)}</dd>
              </div>
              <div>
                <dt className="text-[length:var(--t5)] text-[var(--ink-60)]">התקרה של בנק ישראל (חצי מההכנסה)</dt>
                <dd className="num t3 mt-1 !font-bold">{ils(ceiling)}</dd>
              </div>
            </dl>
            <p role="status" className="rounded-[16px] bg-[var(--accent-12)] p-4 text-[length:var(--t5)]">
              {limitedBy === "income"
                ? `מה שעוצר אתכם הוא ההכנסה: עם עוד ${num(Math.max(0, loanByEquity - loanByIncome) / 1000)} אלף ₪ של משכנתא, ההון העצמי עוד היה מספיק.`
                : `מה שעוצר אתכם הוא ההון העצמי: לפי בנק ישראל אפשר לממן עד ${Math.round(ltv * 100)}% מהנכס.`}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href={`/questionnaire/?purpose=${purpose}`} className="btn">בדיקה עם המספרים האמיתיים <span className="arrow" aria-hidden>←</span></Link>
            </div>
            <p className="text-[length:var(--t5)] text-[var(--ink-60)]">הערכה בלבד, בריבית להמחשה של 4.9%. כל בנק מחשב קצת אחרת.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
