import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.04] bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <span className="text-sm text-violet-300/70">
            ✦
          </span>

          <span className="font-serif text-sm tracking-[0.22em] text-neutral-200">
            RIFTKEEPER
          </span>
        </Link>

        <nav className="flex gap-8 text-xs uppercase tracking-[0.18em] text-neutral-600">
          <Link
            href="/"
            className="transition hover:text-neutral-200"
          >
            Realm Map
          </Link>

          <Link
            href="/chronicle"
            className="transition hover:text-neutral-200"
          >
            Chronicle
          </Link>

          <Link
            href="/worklog"
            className="transition hover:text-neutral-200"
          >
            AI Worklog
          </Link>
        </nav>
      </div>
    </header>
  );
}