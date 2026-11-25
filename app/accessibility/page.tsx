import type { Metadata } from "next";
import Shell, { PageHead } from "@/components/Shell";
import { EMAIL, PHONE } from "@/lib/content";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "מה עשינו כדי שהאתר יהיה נגיש, מה עדיין חסר, ולמי פונים.",
  alternates: { canonical: "/accessibility/" },
};

const SECTIONS: [string, string[]][] = [
  ["המחויבות", ["האתר נבנה כך שיתאים לתקן הישראלי 5568 ולהנחיות WCAG 2.1 ברמה AA, לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות)."]],
  ["מה עשינו", [
    "ניווט מלא במקלדת, עם סימון פוקוס ברור וקישור \"דלגו לתוכן\" בראש כל עמוד.",
    "מבנה כותרות היררכי, תגיות ARIA לרכיבים מותאמים (בחירה, מחוון, סטטוס), וטקסט חלופי לתמונות.",
    "ניגודיות צבעים שנבדקה, וטקסט שאפשר להגדיל עד 200% בלי לאבד תוכן.",
    "המחשבון נשלט גם במקשי החיצים, ולא רק בגרירה.",
    "כשבמערכת ההפעלה מוגדרת הפחתת תנועה, האנימציות כבויות.",
  ]],
  ["מה עוד לא מושלם", ["אתר ההדגמה לא עבר בדיקה של מורשה נגישות. אם נתקלתם בבעיה, נשמח לדעת."]],
  ["רכזת הנגישות", [`מיכל שגיא · ${PHONE} · ${EMAIL}. נחזור אליכם תוך 3 ימי עסקים.`]],
];

export default function Page() {
  return (
    <Shell>
      <PageHead crumbs={[["הצהרת נגישות"]]} title="הצהרת נגישות." lead="מה עשינו כדי שכל אחד יוכל להשתמש באתר, ולמי פונים כשמשהו לא עובד." />
      <div className="wrap section !pt-[var(--s-group)]">
        <div className="flex max-w-3xl flex-col gap-10">
          {SECTIONS.map(([t, ps], i) => (
            <section key={t} className="grid gap-3 border-t pt-6 hair md:grid-cols-[auto_1fr] md:gap-8">
              <span className="num meta">0{i + 1}</span>
              <div>
                <h2 className="t3 !font-bold">{t}</h2>
                {ps.length > 1 ? (
                  <ul className="mt-3 flex list-disc flex-col gap-2 ps-5 text-[var(--ink-60)]">{ps.map((p) => <li key={p}>{p}</li>)}</ul>
                ) : (
                  <p className="mt-3 text-[var(--ink-60)]">{ps[0]}</p>
                )}
              </div>
            </section>
          ))}
          <p className="meta">עודכן לאחרונה: נובמבר 2026</p>
        </div>
      </div>
    </Shell>
  );
}
