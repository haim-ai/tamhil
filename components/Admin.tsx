"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Logo from "./Logo";
import { suggestMix } from "./Questionnaire";
import { isIn, login, logout } from "@/lib/auth";
import { STATUS, getLeads, removeLead, resetDemo, toCSV, updateLead, type Lead, type LeadStatus } from "@/lib/leads";
import { PURPOSES, monthly, purposeOf } from "@/lib/mortgage";
import { dateHe, ils, pct } from "@/lib/format";

const PURPOSE_COLORS = ["var(--ink)", "var(--accent)", "var(--accent-35)", "var(--ink-30)"];
const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-accent text-[var(--paper)]",
  talking: "bg-[var(--accent-12)] text-accent",
  closed: "bg-[var(--ink-12)] text-[var(--ink-60)]",
};

const calc = (l: Lead) => {
  const loan = Math.max(0, l.price - l.equity);
  const pay = monthly(loan, 0.049, 25);
  return { loan, ltv: l.price ? loan / l.price : 0, pay, ratio: l.income ? pay / l.income : 0 };
};

const waLink = (phone: string) => `https://wa.me/972${phone.replace(/\D/g, "").replace(/^0/, "")}`;

/* ---------- login ---------- */
function Login({ onIn }: { onIn: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [fails, setFails] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Date.now() < lockedUntil) { setErr("יותר מדי ניסיונות. נסו שוב בעוד חצי דקה."); return; }
    setBusy(true);
    const ok = await login(pw);
    setBusy(false);
    if (ok) { onIn(); return; }
    const n = fails + 1;
    setFails(n);
    setPw("");
    if (n >= 5) { setLockedUntil(Date.now() + 30_000); setFails(0); setErr("יותר מדי ניסיונות. נסו שוב בעוד חצי דקה."); }
    else setErr("הסיסמה לא נכונה.");
  };

  return (
    <main className="grid min-h-svh place-items-center p-[var(--s-in)]">
      <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-6 rounded-[28px] bg-paper p-[var(--s-in)] shadow-[0_30px_80px_-40px_var(--ink-30)]" aria-labelledby="login-title">
        <Logo />
        <div>
          <h1 id="login-title" className="t2">פאנל הלידים</h1>
          <p className="mt-2 text-[var(--ink-60)]">כניסה ליועצת בלבד.</p>
        </div>
        <div>
          <label htmlFor="pw" className="mb-3 block font-medium">סיסמה</label>
          <input id="pw" type="password" className="field" autoComplete="current-password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} aria-invalid={!!err || undefined} aria-describedby="pw-err" />
          {err && <p id="pw-err" role="alert" className="t5 mt-2 font-medium text-[var(--error)]">{err}</p>}
        </div>
        <button className="btn" disabled={busy || !pw}>כניסה <span className="arrow" aria-hidden>←</span></button>
      </form>
    </main>
  );
}

/* ---------- detail ---------- */
function Detail({ lead, onClose, onStatus, onDelete }: { lead: Lead; onClose: () => void; onStatus: (s: LeadStatus) => void; onDelete: () => void }) {
  const c = calc(lead);
  const mix = suggestMix(c.ratio);
  const contact = lead.source === "contact";
  const rows: [string, [string, string][]][] = contact ? [
    ["פנייה מטופס צור קשר", [
      ["נושא", purposeOf(lead.purpose).label],
      ["טלפון", lead.phone],
      ["מייל", lead.email || "—"],
      ["זמן לשיחה", lead.callTime || "—"],
    ]],
  ] : [
    ["1. הנכס", [
      ["מטרה", purposeOf(lead.purpose).label],
      [lead.purpose === "refinance" ? "שווי הנכס" : "מחיר הנכס", ils(lead.price)],
      [lead.purpose === "refinance" ? "כבר הוחזר" : "הון עצמי", ils(lead.equity)],
      ["שלב", lead.stage],
    ]],
    ["2. ההכנסה", [
      ["לווים", String(lead.borrowers)],
      ["הכנסה נטו", ils(lead.income)],
      ["הלוואות אחרות", lead.obligations ? ils(lead.obligations) : "אין"],
      ["תעסוקה", lead.employment],
    ]],
    ["3. הפרטים", [
      ["טלפון", lead.phone],
      ["מייל", lead.email || "—"],
      ["זמן לשיחה", lead.callTime],
    ]],
  ];

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="meta">{dateHe(lead.createdAt)}{lead.demo ? " · ליד לדוגמה" : ""}</p>
          <h2 className="t3 mt-1 !font-bold">{lead.name}</h2>
        </div>
        <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border hair hover:bg-[var(--ink-06)]" aria-label="סגירה">✕</button>
      </div>

      <div className="flex flex-wrap gap-2">
        <a href={`tel:${lead.phone}`} className="btn btn-sm">התקשרות</a>
        <a href={waLink(lead.phone)} target="_blank" rel="noopener noreferrer" className="chip inline-flex items-center !text-[length:var(--t5)]">וואטסאפ</a>
        {lead.email && <a href={`mailto:${lead.email}`} className="chip inline-flex items-center !text-[length:var(--t5)]">מייל</a>}
      </div>

      <div role="radiogroup" aria-label="סטטוס" className="grid grid-cols-3 gap-1 rounded-full bg-[var(--ink-06)] p-1">
        {(Object.keys(STATUS) as LeadStatus[]).map((s) => (
          <button key={s} type="button" role="radio" aria-checked={lead.status === s} onClick={() => onStatus(s)}
            className={`min-h-10 rounded-full text-[length:var(--t5)] font-medium transition ${lead.status === s ? "bg-ink text-[var(--on-ink)]" : "hover:bg-[var(--ink-06)]"}`}>
            {STATUS[s]}
          </button>
        ))}
      </div>

      {!contact && (<div className="grid grid-cols-2 gap-4 rounded-[18px] bg-ink p-5 text-[var(--on-ink)]">
        <div><p className="t5 text-[var(--on-ink-60)]">משכנתא נדרשת</p><p className="num t3 !text-[length:clamp(1.1rem,0.9rem+0.6vw,1.5rem)] !font-bold">{ils(c.loan)}</p></div>
        <div><p className="t5 text-[var(--on-ink-60)]">אחוז מימון</p><p className={`num t3 !font-bold ${c.ltv > purposeOf(lead.purpose).ltv ? "text-[var(--error-soft)]" : ""}`}>{pct(c.ltv)}</p></div>
        <div><p className="t5 text-[var(--on-ink-60)]">החזר משוער</p><p className="num t3 !text-[length:clamp(1.1rem,0.9rem+0.6vw,1.5rem)] !font-bold">{ils(c.pay)}</p></div>
        <div><p className="t5 text-[var(--on-ink-60)]">מההכנסה</p><p className={`num t3 !font-bold ${c.ratio > 0.5 ? "text-[var(--error-soft)]" : ""}`}>{pct(c.ratio)}</p></div>
        <div className="col-span-2">
          <p className="t5 text-[var(--on-ink-60)]">תמהיל פתיחה: קבועה {mix.fixed}% · פריים {mix.prime}% · משתנה {mix.variable}%</p>
          <div className="mixbar mt-2 !h-3">
            <span style={{ flexGrow: mix.fixed, background: "var(--on-ink)" }} />
            <span className="seg-prime" style={{ flexGrow: mix.prime }} />
            {mix.variable > 0 && <span className="seg-variable" style={{ flexGrow: mix.variable }} />}
          </div>
        </div>
      </div>)}

      {rows.map(([title, list]) => (
        <section key={title}>
          <h3 className="meta mb-2">{title}</h3>
          <dl className="divide-y divide-[var(--ink-12)] border-y hair">
            {list.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-[var(--ink-60)]">{k}</dt>
                <dd className="num text-start font-medium" dir={k === "טלפון" || k === "מייל" ? "ltr" : undefined}>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {lead.notes && (
        <section>
          <h3 className="meta mb-2">הערות מהלקוח</h3>
          <p className="whitespace-pre-wrap rounded-[14px] bg-[var(--ink-06)] p-4">{lead.notes}</p>
        </section>
      )}

      <button type="button" onClick={onDelete} className="self-start text-[length:var(--t5)] font-medium text-[var(--error)] underline underline-offset-4">
        מחיקת הליד
      </button>
    </div>
  );
}

/* ---------- dashboard ---------- */
function Dashboard({ onOut }: { onOut: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const refresh = useCallback(() => setLeads(getLeads()), []);
  useEffect(() => {
    refresh();
    const on = (e: StorageEvent) => e.key?.startsWith("tamhil.leads") && refresh();
    window.addEventListener("storage", on);
    return () => window.removeEventListener("storage", on);
  }, [refresh]);

  const shown = useMemo(() => {
    const s = q.trim();
    return leads.filter((l) => (filter === "all" || l.status === filter) && (!s || l.name.includes(s) || l.phone.replace(/\D/g, "").includes(s.replace(/\D/g, "") || "\u0000")));
  }, [leads, q, filter]);

  const open = leads.find((l) => l.id === openId) ?? null;
  const loans = leads.filter((l) => l.source !== "contact").map((l) => calc(l).loan);
  const avg = loans.length ? loans.reduce((a, b) => a + b, 0) / loans.length : 0;
  const byPurpose = PURPOSES.map((p) => leads.filter((l) => l.purpose === p.id).length);

  const exportCsv = () => {
    const blob = new Blob([toCSV(shown)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tamhil-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const setStatus = (id: string, s: LeadStatus) => { updateLead(id, { status: s }); refresh(); };
  const del = (l: Lead) => {
    if (!confirm(`למחוק את הליד של ${l.name}? אי אפשר לשחזר.`)) return;
    removeLead(l.id); setOpenId(null); refresh();
  };

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-30 border-b bg-[rgb(228_233_236/0.9)] backdrop-blur-md hair">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="meta hidden sm:inline">/ פאנל לידים</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={exportCsv} className="btn btn-sm" disabled={!shown.length}>ייצוא לאקסל</button>
            <button type="button" onClick={onOut} className="chip !min-h-11 !text-[length:var(--t5)]">יציאה</button>
          </div>
        </div>
      </header>

      <main className="wrap flex flex-col gap-[var(--s-group)] py-[var(--s-group)]">
        <p className="rounded-[16px] bg-[var(--accent-12)] p-4 text-[length:var(--t5)] text-ink" role="note">
          <strong>אתר הדגמה:</strong> הלידים נשמרים בדפדפן הזה בלבד. באתר אמיתי הם נשמרים בדטאבייס מאובטח, והפאנל נעול מאחורי התחברות בשרת.
        </p>

        <section aria-label="סיכום" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.6fr]">
          {[
            ["לידים", String(leads.length)],
            ["חדשים", String(leads.filter((l) => l.status === "new").length)],
            ["בשיחה", String(leads.filter((l) => l.status === "talking").length)],
            ["משכנתא ממוצעת", avg ? `${(avg / 1e6).toFixed(2)}M ₪` : "—"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[20px] bg-paper p-5">
              <p className="meta">{k}</p>
              <p className="num t2 mt-2 !text-[clamp(1.8rem,1.2rem+1.6vw,2.6rem)]">{v}</p>
            </div>
          ))}
          <div className="rounded-[20px] bg-paper p-5 sm:col-span-2 lg:col-span-1">
            <p className="meta">לפי מטרה</p>
            <div className="mixbar mt-4 !h-4" aria-hidden>
              {byPurpose.map((n, i) => n > 0 && <span key={i} style={{ flexGrow: n, background: PURPOSE_COLORS[i] }} />)}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[length:var(--t5)]">
              {PURPOSES.map((p, i) => (
                <li key={p.id} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: PURPOSE_COLORS[i] }} aria-hidden />
                  {p.label} <span className="num text-[var(--ink-60)]">{byPurpose[i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="לידים" className="grid gap-6 lg:grid-cols-[1fr_minmax(22rem,28rem)]">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative sm:w-80">
                <span className="sr-only">חיפוש לפי שם או טלפון</span>
                <input className="field !min-h-12" placeholder="חיפוש לפי שם או טלפון" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
              <div role="radiogroup" aria-label="סינון לפי סטטוס" className="flex flex-wrap gap-2">
                {(["all", "new", "talking", "closed"] as const).map((s) => (
                  <button key={s} type="button" role="radio" aria-checked={filter === s} onClick={() => setFilter(s)} className="chip !min-h-11 !text-[length:var(--t5)]">
                    {s === "all" ? "הכל" : STATUS[s]}
                  </button>
                ))}
              </div>
            </div>

            {shown.length === 0 ? (
              <div className="rounded-[20px] border border-dashed p-10 text-center hair">
                <p className="t3">{leads.length ? "אין לידים שמתאימים לחיפוש." : "עוד אין לידים."}</p>
                <p className="mt-2 text-[var(--ink-60)]">מלאו את השאלון באתר, והליד יופיע כאן.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {shown.map((l) => {
                  const c = calc(l);
                  const lim = purposeOf(l.purpose).ltv;
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(l.id)}
                        aria-current={openId === l.id || undefined}
                        className={`grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 rounded-[18px] border p-4 text-start transition md:grid-cols-[1.4fr_1fr_1fr_0.9fr_auto] ${openId === l.id ? "border-ink bg-paper" : "border-transparent bg-paper hover:border-[var(--ink-30)]"}`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{l.name}</span>
                          <span className="num block text-[length:var(--t5)] text-[var(--ink-60)]" dir="ltr" style={{ textAlign: "right" }}>{l.phone}</span>
                        </span>
                        <span className={`justify-self-end rounded-full px-3 py-1 text-[0.8rem] font-medium md:order-last ${STATUS_STYLE[l.status]}`}>{STATUS[l.status]}</span>
                        <span className="text-[length:var(--t5)]">
                          {purposeOf(l.purpose).label}
                          <span className="block text-[var(--ink-60)]">{dateHe(l.createdAt)}</span>
                        </span>
                        <span className="num text-[length:var(--t5)] font-medium">{l.source === "contact" ? <span className="font-normal text-[var(--ink-60)]">פנייה מ"צור קשר"</span> : ils(c.loan)}</span>
                        <span className={`col-span-2 md:col-span-1 ${l.source === "contact" ? "invisible" : ""}`} title={`מימון ${pct(c.ltv)} מתוך ${pct(lim)}`}>
                          <span className="flex justify-between text-[0.8rem] text-[var(--ink-60)]"><span>מימון</span><span className="num">{pct(c.ltv)}</span></span>
                          <span className="relative mt-1 block h-1.5 rounded-full bg-[var(--ink-12)]">
                            <span className="absolute inset-y-0 start-0 rounded-full" style={{ width: `${Math.min(100, c.ltv * 100)}%`, background: c.ltv > lim ? "var(--error)" : "var(--accent)" }} />
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* detail: side panel on desktop, sheet on phones */}
          {open ? (
            <aside className="fixed inset-0 z-40 overflow-y-auto bg-bg p-[var(--s-in)] lg:sticky lg:top-24 lg:z-0 lg:max-h-[calc(100svh-7rem)] lg:self-start lg:rounded-[24px] lg:bg-paper" aria-label={`פרטי הליד של ${open.name}`}>
              <Detail lead={open} onClose={() => setOpenId(null)} onStatus={(s) => setStatus(open.id, s)} onDelete={() => del(open)} />
            </aside>
          ) : (
            <aside className="hidden place-items-center rounded-[24px] border border-dashed p-10 text-center text-[var(--ink-60)] hair lg:grid">
              בחרו ליד כדי לראות את כל התשובות שלו.
            </aside>
          )}
        </section>

        <button type="button" onClick={() => { if (confirm("לאפס את הפאנל? כל הלידים יימחקו, ולידי הדוגמה יחזרו.")) { resetDemo(); setOpenId(null); refresh(); } }} className="self-start text-[length:var(--t5)] text-[var(--ink-60)] underline underline-offset-4">
          איפוס נתוני ההדגמה
        </button>
      </main>
    </div>
  );
}

export default function Admin() {
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  useEffect(() => setState(isIn() ? "in" : "out"), []);
  if (state === "loading") return <div className="min-h-svh" />;
  if (state === "out") return <Login onIn={() => setState("in")} />;
  return <Dashboard onOut={() => { logout(); setState("out"); }} />;
}
