# תמהיל · אתר הדגמה ליועצת משכנתאות

אתר תדמית עם מחשבון תמהיל, שאלון התאמה ב-3 שלבים ופאנל לידים.
Next.js 16 · Tailwind 4 · ייצוא סטטי ל-GitHub Pages.

**הדגמה בלבד:** השמות, המספרים והריביות בדויים. הלידים נשמרים ב-localStorage של הדפדפן, והנעילה של הפאנל היא בצד הלקוח.
באתר אמיתי `lib/leads.ts` עובר לדטאבייס (למשל Supabase), והפאנל ננעל בהתחברות בשרת.

```bash
npm install
npm run dev          # http://localhost:4300
npm run build:pages  # out/ for GitHub Pages
```

עיצוב ובנייה: חיים בניסטי
