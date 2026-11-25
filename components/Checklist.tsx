"use client";
import { useEffect, useState } from "react";

const DOCS: { group: string; items: string[] }[] = [
  { group: "זהות", items: ["תעודות זהות עם ספח, לכל הלווים", "אישור ניהול חשבון בנק"] },
  { group: "הכנסה", items: ["3 תלושי שכר אחרונים (שכירים)", "שומת מס ודוח רווח והפסד (עצמאים)", "3 חודשים של דפי עו\"ש"] },
  { group: "הנכס", items: ["זיכרון דברים או חוזה רכישה", "נסח טאבו או אישור זכויות", "שמאות (מזמינים אחרי האישור העקרוני)"] },
];

const KEY = "tamhil.docs.v1";

/** A list you can tick on your phone while gathering papers. Kept in this browser only. */
export default function Checklist() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* empty */ }
  }, []);
  const toggle = (item: string) => {
    const next = done.includes(item) ? done.filter((d) => d !== item) : [...done, item];
    setDone(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const total = DOCS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="flex justify-between text-[length:var(--t5)] font-medium">
          <span>מה כבר אספתם</span>
          <span className="num" aria-live="polite">{done.length} מתוך {total}</span>
        </p>
        <span className="mt-2 block h-2.5 rounded-full bg-[var(--ink-12)]">
          <span className="block h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(done.length / total) * 100}%` }} />
        </span>
      </div>
      {DOCS.map((g) => (
        <fieldset key={g.group}>
          <legend className="meta mb-2">{g.group}</legend>
          <ul className="divide-y divide-[var(--ink-12)] border-y hair">
            {g.items.map((it) => (
              <li key={it}>
                <label className="flex min-h-12 cursor-pointer items-center gap-3 py-2">
                  <input type="checkbox" checked={done.includes(it)} onChange={() => toggle(it)} className="h-5 w-5 shrink-0 accent-[var(--accent)]" />
                  <span className={done.includes(it) ? "text-[var(--ink-60)] line-through" : ""}>{it}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
