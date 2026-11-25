import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap grid min-h-svh content-center gap-6">
      <p className="meta">404</p>
      <h1 className="t1 max-w-[10ch]">העמוד הזה לא בתמהיל.</h1>
      <Link href="/" className="btn self-start">לעמוד הבית <span className="arrow" aria-hidden>←</span></Link>
    </main>
  );
}
