import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Questionnaire from "@/components/Questionnaire";

export const metadata: Metadata = {
  title: "שאלון התאמה למשכנתא",
  description: "שלושה שלבים, שלוש דקות: הנכס, ההכנסה והפרטים. בסוף תקבלו תמונה ראשונה של המשכנתא שלכם.",
  alternates: { canonical: "/questionnaire/" },
};

export default function Page() {
  return (
    <>
      <header className="wrap flex h-[4.5rem] items-center justify-between">
        <Logo />
        <Link href="/" className="link text-[length:var(--t5)] font-medium">חזרה לאתר</Link>
      </header>
      <main>
        <Questionnaire />
      </main>
    </>
  );
}
