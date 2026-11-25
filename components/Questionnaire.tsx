"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PURPOSES, monthly, purposeOf, type Purpose } from "@/lib/mortgage";
import { ils, num, parseMoney, pct } from "@/lib/format";
import { addLead, type Lead } from "@/lib/leads";

const STEPS = ["הנכס", "ההכנסה", "הפרטים"];
const STAGES = ["עוד מחפשים", "חתמנו זיכרון דברים", "חתמנו חוזה", "יש לנו משכנתא"];
const JOBS = ["שכיר/ה", "שכירים", "עצמאי/ת", "משולב"];
const TIMES = ["בוקר", "צהריים", "ערב"];
const BLENDED = 0.049; // illustrative blended rate for the estimate

type Form = {
  purpose: Purpose | "";
  price: number;
  equity: number;
  stage: string;
  borrowers: number;
  income: number;
  obligations: number;
  employment: string;
  name: string;
  phone: string;
  email: string;
  callTime: string;
  notes: string;
  consent: boolean;
  company: string; // honeypot
};

const EMPTY: Form = {
  purpose: "", price: 0, equity: 0, stage: "", borrowers: 2, income: 0, obligations: 0, employment: "",
  name: "", phone: "", email: "", callTime: "", notes: "", consent: false, company: "",
};

const phoneOk = (p: string) => /^0(5\d{8}|[2-489]\d{7}|7\d{8})$/.test(p.replace(/[\s-]/g, ""));
const emailOk = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

/** The suggested starting mix: the tighter the budget, the more of it is fixed. */
export function suggestMix(ratio: number) {
  if (ratio > 0.33) return { fixed: 60, prime: 40, variable: 0 };
  if (ratio > 0.25) return { fixed: 50, prime: 30, variable: 20 };
  return { fixed: 40, prime: 35, variable: 25 };
}

function Money({ id, value, onChange, invalid, describedBy }: { id: string; value: number; onChange: (n: number) => void; invalid?: boolean; describedBy?: string }) {
  return (
    <div className="relative">
      <input
        id={id}
        className="field num pe-12"
        inputMode="numeric"
        autoComplete="off"
        value={value ? num(value) : ""}
        onChange={(e) => onChange(parseMoney(e.target.value))}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        dir="ltr"
        style={{ textAlign: "right" }}
      />
      <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[var(--ink-60)]">₪</span>
    </div>
  );
}

function Choice({ options, value, onPick, label }: { options: string[]; value: string; onPick: (v: string) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onPick(o)} className="chip">
          {o}
        </button>
      ))}
    </div>
  );
}

function Err({ id, show, children }: { id: string; show: boolean; children: React.ReactNode }) {
  return show ? <p id={id} className="t5 mt-2 font-medium text-[var(--error)]">{children}</p> : null;
}

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState<Lead | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    title.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, done]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((s) => ({ ...s, [k]: v }));

  const p = f.purpose ? purposeOf(f.purpose) : null;
  const loan = Math.max(0, f.price - f.equity);
  const ltv = f.price ? loan / f.price : 0;
  const overLtv = p && f.price ? Math.max(0, loan - f.price * p.ltv) : 0;
  const pay = monthly(loan, BLENDED, 25);
  const free = Math.max(0, f.income - f.obligations);
  const ratio = f.income ? pay / f.income : 0;
  const mix = suggestMix(ratio);

  const errors = [
    {
      purpose: !f.purpose,
      price: f.price < 300_000,
      equity: f.equity <= 0 || f.equity >= f.price,
      stage: !f.stage,
    },
    {
      income: f.income < 3_000,
      employment: !f.employment,
    },
    {
      name: f.name.trim().length < 2,
      phone: !phoneOk(f.phone),
      email: !emailOk(f.email.trim()),
      callTime: !f.callTime,
      consent: !f.consent,
    },
  ] as Record<string, boolean>[];

  const bad = (k: string) => tried && errors[step][k];
  const stepOk = !Object.values(errors[step]).some(Boolean);

  const next = () => {
    if (!stepOk) { setTried(true); return; }
    setTried(false);
    if (step < 2) { setStep(step + 1); return; }
    if (f.company) return; // a bot filled the hidden field
    const lead = addLead({
      purpose: f.purpose as Purpose, price: f.price, equity: f.equity, stage: f.stage, borrowers: f.borrowers,
      income: f.income, obligations: f.obligations, employment: f.employment,
      name: f.name.trim().slice(0, 80), phone: f.phone.trim().slice(0, 20), email: f.email.trim().slice(0, 120),
      callTime: f.callTime, notes: f.notes.trim().slice(0, 1000),
    });
    setDone(lead);
  };

  if (done) {
    return (
      <div className="wrap section !pt-[var(--s-group)]">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-[var(--s-group)]">
          <div className="h-4 w-full"><MixBar mix={mix} /></div>
          <div>
            <p className="meta">נשמר · {new Date(done.createdAt).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" })}</p>
            <h1 ref={title} tabIndex={-1} className="t2 mt-4 outline-none">תודה, {done.name.split(" ")[0]}. התמהיל שלכם מתחיל כאן.</h1>
            <p className="t3 !font-normal mt-6 text-[var(--ink-60)]">
              מיכל תתקשר אליכם ב{done.callTime}, תוך יום עסקים אחד, עם המספרים האמיתיים.
            </p>
          </div>
          <dl className="grid w-full gap-6 border-y py-6 hair sm:grid-cols-3">
            <div><dt className="meta">משכנתא נדרשת</dt><dd className="num t3 mt-1 !font-bold">{ils(loan)}</dd></div>
            <div><dt className="meta">החזר משוער ל-25 שנה</dt><dd className="num t3 mt-1 !font-bold">{ils(pay)}</dd></div>
            <div><dt className="meta">תמהיל פתיחה</dt><dd className="num t3 mt-1 !font-bold">{mix.fixed}% קבועה</dd></div>
          </dl>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/" className="btn">חזרה לאתר <span className="arrow" aria-hidden>←</span></Link>
            <Link href="/admin" className="link font-medium">הדגמה: לראות את הליד בפאנל הניהול</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap grid gap-[var(--s-group)] pb-[var(--s-out)] pt-[var(--s-in)] lg:grid-cols-[1.5fr_1fr]">
      <div>
        {/* progress: the mix bar again, one track per step */}
        <ol className="grid grid-cols-3 gap-1" aria-label="שלבי השאלון">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined}>
              <span className="block h-2.5 rounded-full transition-colors duration-500" style={{ background: i < step ? "var(--ink)" : i === step ? "var(--accent)" : "var(--ink-12)" }} />
              <span className={`t5 mt-2 block font-medium ${i === step ? "" : "text-[var(--ink-60)]"}`}>
                {i + 1}. {s}
              </span>
            </li>
          ))}
        </ol>

        <form
          noValidate
          onSubmit={(e) => { e.preventDefault(); next(); }}
          className="mt-[var(--s-group)] flex flex-col gap-10"
          aria-labelledby="q-title"
        >
          <h1 id="q-title" ref={title} tabIndex={-1} className="t2 outline-none">
            {step === 0 && "ספרו לי על הנכס."}
            {step === 1 && "עכשיו ההכנסה. רק מספרים, בלי תלושים."}
            {step === 2 && "איך מיכל חוזרת אליכם?"}
          </h1>

          {step === 0 && (
            <>
              <fieldset>
                <legend className="mb-4 font-medium">מה המטרה?</legend>
                <div role="radiogroup" aria-label="מטרה" className="grid gap-3 sm:grid-cols-2">
                  {PURPOSES.map((o) => (
                    <button
                      key={o.id} type="button" role="radio" aria-checked={f.purpose === o.id}
                      onClick={() => set("purpose", o.id)}
                      className={`flex min-h-24 flex-col items-start justify-between gap-2 rounded-[18px] border p-5 text-start transition ${f.purpose === o.id ? "border-ink bg-ink text-[var(--on-ink)]" : "border-[var(--ink-12)] bg-paper hover:border-[var(--ink-30)]"}`}
                    >
                      <span className="t3 !text-[1.25rem]">{o.label}</span>
                      <span className={`t5 ${f.purpose === o.id ? "text-[var(--on-ink-60)]" : "text-[var(--ink-60)]"}`}>{o.hint}</span>
                    </button>
                  ))}
                </div>
                <Err id="e-purpose" show={bad("purpose")}>בחרו מטרה אחת.</Err>
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className="mb-3 block font-medium">{f.purpose === "refinance" ? "שווי הנכס היום" : "מחיר הנכס"}</label>
                  <Money id="price" value={f.price} onChange={(n) => set("price", n)} invalid={bad("price")} describedBy="e-price" />
                  <Err id="e-price" show={bad("price")}>לפחות 300,000 ₪.</Err>
                </div>
                <div>
                  <label htmlFor="equity" className="mb-3 block font-medium">{f.purpose === "refinance" ? "כמה כבר החזרתם (בערך)" : "הון עצמי"}</label>
                  <Money id="equity" value={f.equity} onChange={(n) => set("equity", n)} invalid={bad("equity")} describedBy="e-equity" />
                  <Err id="e-equity" show={bad("equity")}>סכום גדול מאפס וקטן ממחיר הנכס.</Err>
                </div>
              </div>

              <fieldset>
                <legend className="mb-4 font-medium">איפה אתם בתהליך?</legend>
                <Choice label="שלב" options={STAGES} value={f.stage} onPick={(v) => set("stage", v)} />
                <Err id="e-stage" show={bad("stage")}>בחרו שלב.</Err>
              </fieldset>
            </>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className="mb-4 font-medium">כמה לווים?</legend>
                <Choice label="לווים" options={["1", "2"]} value={String(f.borrowers)} onPick={(v) => set("borrowers", +v)} />
              </fieldset>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="income" className="mb-3 block font-medium">הכנסה נטו בחודש{f.borrowers === 2 ? ", של שניכם" : ""}</label>
                  <Money id="income" value={f.income} onChange={(n) => set("income", n)} invalid={bad("income")} describedBy="e-income" />
                  <Err id="e-income" show={bad("income")}>הכניסו הכנסה חודשית.</Err>
                </div>
                <div>
                  <label htmlFor="obl" className="mb-3 block font-medium">החזרי הלוואות אחרות בחודש</label>
                  <Money id="obl" value={f.obligations} onChange={(n) => set("obligations", n)} />
                  <p className="t5 mt-2 text-[var(--ink-60)]">רכב, הלוואות, אשראי. אין? השאירו ריק.</p>
                </div>
              </div>
              <fieldset>
                <legend className="mb-4 font-medium">תעסוקה</legend>
                <Choice label="תעסוקה" options={JOBS} value={f.employment} onPick={(v) => set("employment", v)} />
                <Err id="e-emp" show={bad("employment")}>בחרו סוג תעסוקה.</Err>
              </fieldset>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-3 block font-medium">שם מלא</label>
                  <input id="name" className="field" autoComplete="name" value={f.name} maxLength={80} onChange={(e) => set("name", e.target.value)} aria-invalid={bad("name") || undefined} aria-describedby="e-name" />
                  <Err id="e-name" show={bad("name")}>איך קוראים לכם?</Err>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-3 block font-medium">טלפון</label>
                  <input id="phone" className="field num" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" style={{ textAlign: "right" }} value={f.phone} maxLength={20} onChange={(e) => set("phone", e.target.value)} aria-invalid={bad("phone") || undefined} aria-describedby="e-phone" />
                  <Err id="e-phone" show={bad("phone")}>מספר ישראלי, למשל 050-1234567.</Err>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-3 block font-medium">מייל <span className="font-normal text-[var(--ink-60)]">(לא חובה)</span></label>
                  <input id="email" className="field" type="email" autoComplete="email" dir="ltr" style={{ textAlign: "right" }} value={f.email} maxLength={120} onChange={(e) => set("email", e.target.value)} aria-invalid={bad("email") || undefined} aria-describedby="e-email" />
                  <Err id="e-email" show={bad("email")}>המייל לא נראה תקין.</Err>
                </div>
              </div>
              <fieldset>
                <legend className="mb-4 font-medium">מתי נוח לדבר?</legend>
                <Choice label="זמן לשיחה" options={TIMES} value={f.callTime} onPick={(v) => set("callTime", v)} />
                <Err id="e-time" show={bad("callTime")}>בחרו זמן.</Err>
              </fieldset>
              <div>
                <label htmlFor="notes" className="mb-3 block font-medium">משהו שכדאי שמיכל תדע? <span className="font-normal text-[var(--ink-60)]">(לא חובה)</span></label>
                <textarea id="notes" className="field" value={f.notes} maxLength={1000} onChange={(e) => set("notes", e.target.value)} />
              </div>
              <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" tabIndex={-1} autoComplete="off" value={f.company} onChange={(e) => set("company", e.target.value)} />
              </div>
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" aria-describedby="e-consent" />
                  <span className="t5 text-[var(--ink-60)]">
                    אני מאשר/ת שמיכל שגיא תשמור את הפרטים ותחזור אליי בנוגע לייעוץ. הפרטים לא מועברים לבנק או לגורם אחר בלי הסכמה, ואפשר לבקש למחוק אותם בכל רגע.
                  </span>
                </label>
                <Err id="e-consent" show={bad("consent")}>צריך לאשר כדי שנוכל לחזור אליכם.</Err>
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-8 hair">
            <button type="submit" className="btn">
              {step < 2 ? "לשלב הבא" : "שלחו למיכל"} <span className="arrow" aria-hidden>←</span>
            </button>
            {step > 0 && (
              <button type="button" className="link font-medium" onClick={() => { setTried(false); setStep(step - 1); }}>
                חזרה
              </button>
            )}
            {tried && !stepOk && <p role="alert" className="t5 font-medium text-[var(--error)]">חסרים כמה פרטים, סימנו אותם למעלה.</p>}
          </div>
        </form>
      </div>

      {/* the live picture */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="התמונה שלכם עד עכשיו">
        <div className="flex flex-col gap-6 rounded-[24px] bg-ink p-[var(--s-in)] text-[var(--on-ink)]">
          <p className="meta !text-[var(--on-ink-60)]">התמונה שלכם עד עכשיו</p>
          <div>
            <p className="t5 text-[var(--on-ink-60)]">משכנתא נדרשת</p>
            <p className="num t2 mt-1">{loan ? ils(loan) : "—"}</p>
          </div>

          <div>
            <p className="t5 flex justify-between text-[var(--on-ink-60)]">
              <span>אחוז מימון</span>
              <span className="num">{f.price ? pct(ltv) : "—"}{p ? ` מתוך ${pct(p.ltv)} מותר` : ""}</span>
            </p>
            <div className="relative mt-2 h-3 rounded-full bg-[var(--on-ink-15)]">
              <span className="absolute inset-y-0 start-0 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, ltv * 100)}%`, background: overLtv ? "var(--error-soft)" : "var(--accent)" }} />
              {p && <span className="absolute -inset-y-1 w-0.5 rounded bg-[var(--on-ink)]" style={{ insetInlineStart: `${p.ltv * 100}%` }} aria-hidden />}
            </div>
            {overLtv > 0 && <p className="t5 mt-2 text-[var(--error-soft)]">לפי כללי בנק ישראל חסרים בערך {ils(overLtv)} הון עצמי. יש דרכים לגשר, נדבר על זה.</p>}
          </div>

          {step >= 1 && (
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--on-ink-15)] pt-5">
              <div>
                <p className="t5 text-[var(--on-ink-60)]">החזר משוער, 25 שנה</p>
                <p className="num t3 mt-1 !font-bold">{loan ? ils(pay) : "—"}</p>
              </div>
              <div>
                <p className="t5 text-[var(--on-ink-60)]">החזר מומלץ עד</p>
                <p className="num t3 mt-1 !font-bold">{f.income ? ils(free / 3) : "—"}</p>
              </div>
              {f.income > 0 && loan > 0 && (
                <p className={`t5 col-span-2 ${ratio > 0.5 ? "text-[var(--error-soft)]" : "text-[var(--on-ink-60)]"}`}>
                  {ratio > 0.5 ? "ההחזר עובר את חצי ההכנסה, ובנק ישראל לא מאשר את זה. נבנה תקופה ארוכה יותר או סכום אחר." : ratio > 0.33 ? "ההחזר מעל שליש מההכנסה. אפשרי, אבל נעדיף תמהיל שקט יותר." : "ההחזר בטווח הנוח. יש מקום לגמישות."}
                </p>
              )}
            </div>
          )}

          {step >= 1 && f.income > 0 && loan > 0 && (
            <div className="border-t border-[var(--on-ink-15)] pt-5">
              <p className="t5 text-[var(--on-ink-60)]">תמהיל פתיחה מוצע</p>
              <div className="mt-3 h-4"><MixBar mix={mix} dark /></div>
              <p className="t5 mt-2 flex justify-between">
                <span>קבועה {mix.fixed}%</span><span>פריים {mix.prime}%</span><span>משתנה {mix.variable}%</span>
              </p>
            </div>
          )}

          <p className="t5 text-[var(--on-ink-60)]">הערכה בלבד, בריבית להמחשה של 4.9%. המספרים האמיתיים בשיחה.</p>
        </div>
      </aside>
    </div>
  );
}

function MixBar({ mix, dark = false }: { mix: { fixed: number; prime: number; variable: number }; dark?: boolean }) {
  return (
    <div className="mixbar">
      <span style={{ flexGrow: mix.fixed, background: dark ? "var(--on-ink)" : "var(--ink)" }} />
      <span className="seg-prime" style={{ flexGrow: mix.prime }} />
      {mix.variable > 0 && <span className="seg-variable" style={{ flexGrow: mix.variable }} />}
    </div>
  );
}
