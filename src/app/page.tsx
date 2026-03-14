import { Button } from "@/components/ui/button";

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2" />
      <path d="M17 6h2a2 2 0 1 1 0 4h-2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        <TrophyIcon />
        Olympique Rémois Tennis de Table
      </div>

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Bienvenue sur le site du club
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-slate-600">
        Structure Next.js prête avec TypeScript, TailwindCSS et une base de
        composants UI pour démarrer le futur site de l&apos;ORTT.
      </p>

      <Button size="lg" className="gap-2">
        Découvrir le club
        <ArrowRightIcon />
      </Button>
    </main>
  );
}
