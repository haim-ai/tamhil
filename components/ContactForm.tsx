"use client";
import Link from "next/link";
import { useState } from "react";
import { addLead } from "@/lib/leads";
import { PURPOSES, type Purpose } from "@/lib/mortgage";
import { phoneOk } from "./Questionnaire";

/** A short form for people who just want a call. Saves to the same leads panel. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<Purpose>("first");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const errs = { name: name.trim().length < 2, phone: !phoneOk(phone), consent: !consent };
  const ok = !Object.values(errs).some(Boolean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok) { setTried(true); return; }
    if (trap) return;
    addLead({
      source: "contact", purpose: topic, price: 0, equity: 0, stage: "", borrowers: 1, income: 0, obligations: 0, employment: "",
      name: name.trim().slice(0, 80), phone: phone.trim().slice(0, 20), email: "", callTime: "", notes: message.trim().slice(0, 1000),
    });
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[28px] bg-ink p-[clamp(1.5rem,3vw,2.5rem)] text-[var(--on-ink)]">
        <p className="t2">תודה, {name.split(" ")[0]}.</p>
        <p className="text-[var(--on-ink-60)]">ההודעה אצלי. אחזור אליכם תוך יום עסקים.</p>
        <Link href="/admin/" className="link font-medium">הדגמה: לראות את הפנייה בפאנל</Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5 rounded-[28px] bg-paper p-[clamp(1.25rem,3vw,2.5rem)]" aria-labelledby="cf-title">
      <h2 id="cf-title" className="t3 !font-bold">רק רוצים שאחזור אליכם?</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block font-medium">שם</label>
          <input id="cf-name" className="field" autoComplete="name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={(tried && errs.name) || undefined} />
          {tried && errs.name && <p className="t5 mt-1 font-medium text-[var(--error)]">איך קוראים לכם?</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-2 block font-medium">טלפון</label>
          <input id="cf-phone" className="field num" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" style={{ textAlign: "right" }} maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={(tried && errs.phone) || undefined} />
          {tried && errs.phone && <p className="t5 mt-1 font-medium text-[var(--error)]">למשל 050-1234567.</p>}
        </div>
      </div>
      <fieldset>
        <legend className="mb-2 font-medium">בנוגע ל</legend>
        <div role="radiogroup" aria-label="נושא" className="flex flex-wrap gap-2">
          {PURPOSES.map((p) => (
            <button key={p.id} type="button" role="radio" aria-checked={topic === p.id} onClick={() => setTopic(p.id)} className="chip">{p.label}</button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="cf-msg" className="mb-2 block font-medium">הודעה <span className="font-normal text-[var(--ink-60)]">(לא חובה)</span></label>
        <textarea id="cf-msg" className="field !min-h-24" maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      <label className="flex cursor-pointer items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span className="text-[length:var(--t5)] text-[var(--ink-60)]">
          אני מאשר/ת שמיכל תשמור את הפרטים ותחזור אליי. <Link href="/privacy/" className="link">מדיניות הפרטיות</Link>
        </span>
      </label>
      {tried && errs.consent && <p className="t5 -mt-3 font-medium text-[var(--error)]">צריך לאשר כדי שנוכל לחזור אליכם.</p>}
      <button type="submit" className="btn self-start">שלחו <span className="arrow" aria-hidden>←</span></button>
    </form>
  );
}
