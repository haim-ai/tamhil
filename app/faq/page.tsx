import type { Metadata } from "next";
import Shell, { CtaBand, PageHead } from "@/components/Shell";
import { FAQ_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "שאלות נפוצות על משכנתא וייעוץ",
  description: "כמה עולה ייעוץ, כמה זמן זה לוקח, מה זה תמהיל, למה שליש בריבית קבועה, ומה עושים כעצמאים: כל התשובות פתוחות.",
  alternates: { canonical: "/faq/" },
};

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) => g.items).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <Shell>
      <PageHead crumbs={[["שאלות נפוצות"]]} title="שאלות נפוצות, תשובות פתוחות." lead="בלי אקורדיונים ובלי ללחוץ. מצאו את הנושא שלכם.">
        <nav aria-label="נושאים" className="mt-8 flex flex-wrap gap-2">
          {FAQ_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="chip inline-flex items-center">{g.title}</a>
          ))}
        </nav>
      </PageHead>

      <div className="wrap flex flex-col gap-[var(--s-out)] py-[var(--s-out)]">
        {FAQ_GROUPS.map((g, i) => (
          <section key={g.id} id={g.id} className="reveal grid scroll-mt-28 gap-[var(--s-group)] md:grid-cols-[1fr_2.2fr]" aria-labelledby={`${g.id}-t`}>
            <div>
              <p className="meta">0{i + 1}</p>
              <h2 id={`${g.id}-t`} className="t2 mt-3">{g.title}.</h2>
            </div>
            <dl className="grid gap-x-[var(--s-in)] gap-y-10 sm:grid-cols-3">
              {g.items.map(([q, a]) => (
                <div key={q} className="border-t pt-5 hair">
                  <dt className="t3 !text-[1.3rem]">{q}</dt>
                  <dd className="mt-3 text-[var(--ink-60)]">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <CtaBand title="השאלה שלכם לא כאן?" text="שלחו אותה בשאלון, בשדה ההערות, ואענה בשיחה." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Shell>
  );
}
