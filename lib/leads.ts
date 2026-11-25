// Demo storage: leads live in this browser's localStorage.
// In a real site this file is the only one that changes: the same functions call a database (e.g. Supabase) instead.
import type { Purpose } from "./mortgage";

export type LeadStatus = "new" | "talking" | "closed";

export type Lead = {
  id: string;
  createdAt: string;
  status: LeadStatus;
  demo?: boolean;
  purpose: Purpose;
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
};

export const STATUS: Record<LeadStatus, string> = { new: "חדש", talking: "בשיחה", closed: "נסגר" };

const KEY = "tamhil.leads.v1";
const SEEDED = "tamhil.seeded.v1";

const SEED: Lead[] = [
  { id: "d1", createdAt: "2026-11-24T09:12:00Z", status: "new", demo: true, purpose: "first", price: 2_150_000, equity: 600_000, stage: "חתמנו זיכרון דברים", borrowers: 2, income: 24_500, obligations: 1_200, employment: "שכירים", name: "נועה ועידו לוי", phone: "050-1234567", email: "noa@example.com", callTime: "ערב", notes: "רוצים החזר קבוע, יש תינוקת בדרך." },
  { id: "d2", createdAt: "2026-11-23T15:40:00Z", status: "talking", demo: true, purpose: "refinance", price: 1_800_000, equity: 900_000, stage: "יש לנו משכנתא", borrowers: 2, income: 31_000, obligations: 0, employment: "משולב", name: "רונן אברהם", phone: "052-7654321", email: "ronen@example.com", callTime: "בוקר", notes: "לקחנו ב-2022, הפריים קפץ." },
  { id: "d3", createdAt: "2026-11-22T11:05:00Z", status: "new", demo: true, purpose: "investor", price: 1_350_000, equity: 700_000, stage: "עוד מחפשים", borrowers: 1, income: 19_000, obligations: 2_500, employment: "עצמאי", name: "שירן כהן", phone: "054-2223344", email: "", callTime: "צהריים", notes: "" },
  { id: "d4", createdAt: "2026-11-20T18:30:00Z", status: "closed", demo: true, purpose: "upgrade", price: 3_400_000, equity: 1_250_000, stage: "חתמנו חוזה", borrowers: 2, income: 38_000, obligations: 3_000, employment: "שכירים", name: "משפחת גבאי", phone: "053-9988776", email: "gabay@example.com", callTime: "ערב", notes: "מוכרים את הדירה בחולון." },
  { id: "d5", createdAt: "2026-11-18T08:50:00Z", status: "talking", demo: true, purpose: "first", price: 1_650_000, equity: 420_000, stage: "עוד מחפשים", borrowers: 1, income: 14_800, obligations: 0, employment: "שכיר", name: "תום ברגר", phone: "058-1112233", email: "tom@example.com", callTime: "בוקר", notes: "דירה ראשונה, לבד." },
];

const read = (): Lead[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Lead[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

const write = (list: Lead[]) => localStorage.setItem(KEY, JSON.stringify(list));

export function getLeads(): Lead[] {
  if (!localStorage.getItem(SEEDED)) {
    write([...read(), ...SEED]);
    localStorage.setItem(SEEDED, "1");
  }
  return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(data: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const lead: Lead = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  write([lead, ...read()]);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>) {
  write(read().map((l) => (l.id === id ? { ...l, ...patch } : l)));
}

export function removeLead(id: string) {
  write(read().filter((l) => l.id !== id));
}

export function resetDemo() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(SEEDED);
}

/** CSV for Excel: BOM for Hebrew, and cells that start like a formula are neutralised. */
export function toCSV(list: Lead[]) {
  const cols: [keyof Lead, string][] = [
    ["createdAt", "תאריך"], ["status", "סטטוס"], ["name", "שם"], ["phone", "טלפון"], ["email", "מייל"],
    ["purpose", "מטרה"], ["price", "מחיר נכס"], ["equity", "הון עצמי"], ["stage", "שלב"], ["borrowers", "לווים"],
    ["income", "הכנסה נטו"], ["obligations", "התחייבויות"], ["employment", "תעסוקה"], ["callTime", "זמן לשיחה"], ["notes", "הערות"],
  ];
  const cell = (v: unknown) => {
    let s = String(v ?? "");
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = list.map((l) => cols.map(([k]) => cell(l[k])).join(","));
  return "\uFEFF" + [cols.map(([, h]) => cell(h)).join(","), ...rows].join("\r\n");
}
