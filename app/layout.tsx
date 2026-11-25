import type { Metadata, Viewport } from "next";
import "./globals.css";

const url = "https://haim-ai.github.io/tamhil/";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "תמהיל · מיכל שגיא, ייעוץ משכנתאות", template: "%s · תמהיל" },
  description: "ייעוץ משכנתאות שבונה לכם תמהיל מסלולים שמתאים להכנסה ולשקט שלכם, ומנהל בשבילכם את המשא ומתן מול הבנקים. שאלון התאמה של 3 דקות.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url,
    siteName: "תמהיל",
    title: "משכנתא היא לא הלוואה אחת. היא תמהיל.",
    description: "שאלון התאמה של 3 דקות, ויועצת שנלחמת בשבילכם מול הבנקים.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#e4e9ec" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
