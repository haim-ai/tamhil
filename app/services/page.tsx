import type { Metadata } from "next";
import Link from "next/link";
import Shell, { CtaBand, PageHead } from "@/components/Shell";
import Photo from "@/components/Photo";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "שירותי ייעוץ משכנתאות",
  description: "דירה ראשונה, משפרי דיור, דירה להשקעה ומחזור משכנתא: ארבעה מצבים, ארבע משכנתאות שונות.",
  alternates: { canonical: "/services/" },
};

export default function Page() {
  return (
    <Shell>
      <PageHead crumbs={[["שירותים"]]} title="ארבעה מצבים, ארבע משכנתאות." lead="כל מצב מתחיל ממגבלה אחרת של בנק ישראל ומשאלה אחרת שלכם. בחרו את שלכם." />

      <div className="wrap flex flex-col gap-[var(--s-out)] py-[var(--s-out)]">
        {SERVICES.map((s, i) => (
          <article key={s.slug} className={`reveal grid items-center gap-[var(--s-group)] md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <Link href={`/services/${s.slug}/`} className="group block overflow-hidden rounded-[28px]" tabIndex={-1} aria-hidden>
              <Photo name={s.image.name} alt="" w={s.image.w} h={s.image.h} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </Link>
            <div className="flex flex-col items-start gap-5">
              <p className="meta">0{i + 1} · {s.label}</p>
              <h2 className="t2">{s.title}</h2>
              <p className="max-w-[40ch] text-[var(--ink-60)]">{s.short}</p>
              <ul className="flex w-full flex-col divide-y divide-[var(--ink-12)] border-y hair">
                {s.points.map((p) => (
                  <li key={p.t} className="py-3 font-medium">{p.t}</li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}/`} className="btn">לעמוד {s.label} <span className="arrow" aria-hidden>←</span></Link>
            </div>
          </article>
        ))}
      </div>

      <CtaBand title="לא בטוחים איזה מצב שלכם?" text="השאלון שואל שלוש שאלות קצרות, ומראה לכם מיד אחוז מימון, החזר משוער ותמהיל פתיחה." />
    </Shell>
  );
}
