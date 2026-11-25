import Link from "next/link";

/** The mark is the mix itself: three tracks of a loan. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-[0.9em] w-[1.5em] items-end gap-[0.12em] ${className}`} aria-hidden>
      <span className="h-full w-1/3 rounded-full bg-ink" />
      <span className="h-[70%] w-1/3 rounded-full bg-accent" />
      <span className="h-[45%] w-1/3 rounded-full" style={{ background: "var(--accent-35)" }} />
    </span>
  );
}

export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 text-[1.45rem] font-bold tracking-tight ${invert ? "text-[var(--on-ink)]" : ""}`} aria-label="תמהיל, לעמוד הבית">
      <Mark className={invert ? "[&>span:first-child]:bg-[var(--on-ink)]" : ""} />
      תמהיל
    </Link>
  );
}
