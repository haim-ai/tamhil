import type { Metadata } from "next";
import Questionnaire from "@/components/Questionnaire";

export const metadata: Metadata = {
  title: "שאלון התאמה למשכנתא",
  description: "שלושה שלבים, שלוש דקות: הנכס, ההכנסה והפרטים. בסוף תקבלו תמונה ראשונה של המשכנתא שלכם.",
  alternates: { canonical: "/questionnaire/" },
};

export default function Page() {
  return (
    <main>
      <Questionnaire />
    </main>
  );
}
