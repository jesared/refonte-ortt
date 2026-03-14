import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-sky-600 p-8 text-white shadow-lg sm:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">Olympique Rémois Tennis de Table</p>
      <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        Le club de tennis de table de Reims pour jouer, progresser et partager.
      </h1>
      <p className="mt-4 max-w-2xl text-blue-100 sm:text-lg">
        Découvrez la vie du club, suivez nos équipes et rejoignez une communauté passionnée ouverte à tous les niveaux.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/entrainements">
          <Button className="bg-white text-blue-800 hover:bg-blue-100">Découvrir les entraînements</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="border-white/60 bg-white/10 text-white hover:bg-white/20">
            Nous contacter
          </Button>
        </Link>
      </div>
    </section>
  );
}
