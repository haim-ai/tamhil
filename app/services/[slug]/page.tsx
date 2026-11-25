import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell, { CtaBand } from "@/components/Shell";
import Photo from "@/components/Photo";
import { PHONE, PHONE_TEL, SERVICES, serviceBySlug } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return { title: s.title, description: s.short, alternates: { canonical: `/services/${s.slug}/` } };
}

const SHORT: Record<string, string> = { first: "דירה ראשונה", upgrade: "שיפור דיור", investor: "דירה להשקעה", refinance: "מחזור" };

export default async function Page({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <Shell>
      {/* hero: almost a full screen, one big photo, one action for this service */}
      <section className="wrap grid gap-[var(--s-group)] pt-[clamp(1.5rem,4vw,3.5rem)] md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="flex flex-col items-start gap-6">
          <nav aria-label="פירורי לחם" className="meta">
            <ol className="flex flex-wrap gap-x-2">
              <li><Link href="/" className="hover:text-accent">בית</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/services/" className="hover:text-accent">שירותים</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{s.label}</li>
            </ol>
          </nav>
          <h1 className="t1 !text-[clamp(2.8rem,1rem+5.5vw,6.5rem)]">{s.title}</h1>
          <p className="t3 max-w-[34ch] !font-normal text-[var(--ink-60)]">{s.lead}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/questionnaire/?purpose=${s.purpose}`} className="btn">לשאלון · {s.label} <span className="arrow" aria-hidden>←</span></Link>
            <a href={`tel:${PHONE_TEL}`} className="link font-medium">או חייגו <span className="num">{PHONE}</span></a>
          </div>
        </div>
        <Photo name={s.image.name} alt={s.image.alt} w={s.image.w} h={s.image.h} priority sizes="(min-width: 768px) 52vw, 100vw" className="aspect-[4/3] w-full rounded-[28px] object-cover md:aspect-[5/4]" />
      </section>

      {/* what is special here */}
      <section className="section" aria-labelledby="special">
        <div className="wrap">
          <h2 id="special" className="t2 reveal max-w-[16ch]">מה מיוחד ב{SHORT[s.purpose]}.</h2>
          <ol className="mt-[var(--s-group)] grid gap-x-[var(--s-in)] gap-y-10 md:grid-cols-3">
            {s.points.map((p, i) => (
              <li key={p.t} className="reveal border-t pt-6 hair">
                <span className="num t2 !font-medium text-[var(--ink-30)]">0{i + 1}</span>
                <h3 className="t3 mt-4">{p.t}</h3>
                <p className="mt-3 text-[var(--ink-60)]">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* the typical mix: the thread of the site */}
      <section className="section bg-ink text-[var(--on-ink)]" aria-labelledby="mix">
        <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1fr_1.3fr] md:items-end">
          <div className="reveal">
            <p className="meta !text-[var(--on-ink-60)]">התמהיל הנפוץ</p>
            <h2 id="mix" className="t2 mt-4 max-w-[14ch]">איך זה נראה בדרך כלל.</h2>
            <p className="mt-6 max-w-[40ch] text-[var(--on-ink-60)]">{s.mix.why}</p>
            <Link href="/calculator/" className="link mt-6 inline-block font-medium">לשחק עם התמהיל במחשבון</Link>
          </div>
          <figure className="reveal" aria-label={`תמהיל: ${s.mix.fixed}% קבועה, ${s.mix.prime}% פריים, ${s.mix.variable}% משתנה`}>
            <div className="h-[clamp(4rem,9vw,6.5rem)]">
              <div className="mixbar">
                <span style={{ flexGrow: s.mix.fixed, background: "var(--on-ink)" }} />
                <span className="seg-prime" style={{ flexGrow: s.mix.prime }} />
                <span className="seg-variable" style={{ flexGrow: s.mix.variable }} />
              </div>
            </div>
            <figcaption className="mt-4 grid grid-cols-3 gap-4">
              {([["קבועה", s.mix.fixed], ["פריים", s.mix.prime], ["משתנה", s.mix.variable]] as const).map(([n, v]) => (
                <span key={n} className="border-t border-[var(--on-ink-15)] pt-3">
                  <span className="block text-[length:var(--t5)] text-[var(--on-ink-60)]">{n}</span>
                  <span className="num t3 !font-bold">{v}%</span>
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* one story from the files */}
      <section className="section" aria-labelledby="story">
        <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="reveal">
            <p className="meta">מהתיקים · {s.story.who}</p>
            <h2 id="story" className="t3 mt-4 max-w-[30ch] !text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] !font-medium !leading-[1.2]">״{s.story.text}״</h2>
          </div>
          <dl className="reveal grid grid-cols-2 gap-4">
            <div className="rounded-[22px] bg-paper p-6">
              <dt className="meta">לפני</dt>
              <dd className="num mt-2 font-bold tracking-tight text-[var(--ink-60)] text-[length:clamp(1.6rem,1rem+2vw,2.8rem)]">{s.story.before}</dd>
            </div>
            <div className="rounded-[22px] bg-accent p-6 text-[var(--paper)]">
              <dt className="meta !text-[var(--paper)] opacity-75">אחרי</dt>
              <dd className="num mt-2 font-bold tracking-tight text-[length:clamp(1.6rem,1rem+2vw,2.8rem)]">{s.story.after}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* questions for this service, open */}
      <section className="section pt-0" aria-labelledby="sfaq">
        <div className="wrap grid gap-[var(--s-group)] md:grid-cols-[1fr_2.2fr]">
          <h2 id="sfaq" className="t2 reveal">שאלות על {SHORT[s.purpose]}.</h2>
          <dl className="reveal grid gap-x-[var(--s-in)] gap-y-10 sm:grid-cols-3">
            {s.faq.map(([q, a]) => (
              <div key={q} className="border-t pt-5 hair">
                <dt className="t3 !text-[1.3rem]">{q}</dt>
                <dd className="mt-3 text-[var(--ink-60)]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title={`בואו נבנה את המשכנתא שלכם.`} text={`השאלון כבר יודע שמדובר ב${SHORT[s.purpose]}. שלוש דקות, ומיכל חוזרת אליכם עם מספרים אמיתיים.`} href={`/questionnaire/?purpose=${s.purpose}`} />

      {/* the other doors */}
      <section className="wrap pb-[var(--s-out)]" aria-labelledby="others">
        <h2 id="others" className="meta mb-6">שירותים נוספים</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}/`} className="group flex items-center gap-4 rounded-[22px] bg-paper p-3 pe-5 transition hover:bg-[var(--ink-06)]">
                <Photo name={o.image.name} alt="" w={o.image.w} h={o.image.h} sizes="120px" className="h-20 w-24 shrink-0 rounded-[16px] object-cover" />
                <span>
                  <span className="t3 block !text-[1.2rem]">{o.label}</span>
                  <span className="text-[length:var(--t5)] text-[var(--ink-60)]">לעמוד השירות ←</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Shell>
  );
}
