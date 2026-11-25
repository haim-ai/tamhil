const nf = new Intl.NumberFormat("he-IL");

export const ils = (n: number) => `${nf.format(Math.round(n))} ₪`;
export const num = (n: number) => nf.format(Math.round(n));
export const pct = (f: number) => `${Math.round(f * 100)}%`;

/** Digits only, for money inputs typed with commas or a shekel sign. */
export const parseMoney = (s: string) => {
  const d = s.replace(/[^\d]/g, "");
  return d ? Math.min(Number(d), 99_999_999) : 0;
};

export const dateHe = (iso: string) =>
  new Date(iso).toLocaleDateString("he-IL", { day: "numeric", month: "short", year: "numeric" });
