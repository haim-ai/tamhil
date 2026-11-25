import type { Metadata } from "next";
import Shell, { CtaBand, PageHead } from "@/components/Shell";
import Mixer from "@/components/Mixer";
import Capacity from "@/components/Capacity";

export const metadata: Metadata = {
  title: "מחשבון משכנתא: תמהיל והחזר חודשי",
  description: "מחשבון תמהיל משכנתא: גוררים את החלוקה בין קבועה, פריים ומשתנה ורואים את ההחזר. ומחשבון כמה משכנתא אפשר לקחת לפי הכנסה והון עצמי.",
  alternates: { canonical: "/calculator/" },
};

export default function Page() {
  return (
    <Shell>
      <PageHead
        crumbs={[["מחשבון"]]}
        title="שני מחשבונים, אפס טפסים."
        lead="הראשון מראה איך החלוקה בין המסלולים משנה את ההחזר. השני מראה כמה דירה אתם יכולים להרשות לעצמכם."
      />
      <div className="h-[var(--s-group)]" />
      <Mixer eyebrow="01 · התמהיל" full />
      <Capacity />
      <CtaBand title="המחשבון מעריך. השיחה סוגרת." text="ריביות אמיתיות תלויות בכם, בבנק ובשבוע. השאלון לוקח שלוש דקות, ומיכל חוזרת עם הצעות אמיתיות." />
    </Shell>
  );
}
