// Illustrative numbers for the demo. Real rates change weekly; the site says so next to every result.

export type TrackId = "fixed" | "prime" | "variable";

export const TRACKS: { id: TrackId; name: string; short: string; rate: number; shock: number; note: string }[] = [
  { id: "fixed", name: "קבועה לא צמודה", short: "קבועה", rate: 0.051, shock: 0, note: "ההחזר לא זז לעולם. יקרה יותר, שקטה לגמרי." },
  { id: "prime", name: "פריים", short: "פריים", rate: 0.05, shock: 0.02, note: "זזה עם הריבית של בנק ישראל. גמישה, אפשר לפרוע בלי קנס." },
  { id: "variable", name: "משתנה כל 5 שנים", short: "משתנה", rate: 0.044, shock: 0.015, note: "זולה בהתחלה, ומתעדכנת כל חמש שנים." },
];

/** Monthly payment of an amortizing (Spitzer) loan. */
export function monthly(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 12;
  if (principal <= 0 || n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export type Mix = Record<TrackId, number>; // fractions, sum = 1

export function mixPayment(loan: number, years: number, mix: Mix, shocked = false) {
  return TRACKS.reduce((sum, t) => sum + monthly(loan * mix[t.id], t.rate + (shocked ? t.shock : 0), years), 0);
}

/** Bank of Israel: at least a third of the loan at a fixed rate. */
export const MIN_FIXED = 1 / 3;

export type Purpose = "first" | "upgrade" | "investor" | "refinance";

export const PURPOSES: { id: Purpose; label: string; hint: string; ltv: number }[] = [
  { id: "first", label: "דירה ראשונה", hint: "מימון עד 75% מערך הנכס", ltv: 0.75 },
  { id: "upgrade", label: "משפרי דיור", hint: "מוכרים דירה וקונים אחרת, עד 70%", ltv: 0.7 },
  { id: "investor", label: "דירה להשקעה", hint: "מימון עד 50% מערך הנכס", ltv: 0.5 },
  { id: "refinance", label: "מחזור משכנתא", hint: "בודקים אם אפשר לשלם פחות", ltv: 0.7 },
];

export const purposeOf = (id: string) => PURPOSES.find((p) => p.id === id) ?? PURPOSES[0];
