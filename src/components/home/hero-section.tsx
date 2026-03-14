import Link from "next/link";

import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <Hero
      eyebrow="Olympique Rémois Tennis de Table"
      title="Le club de tennis de table de Reims pour jouer, progresser et partager."
      description="Découvrez la vie du club, suivez nos équipes et rejoignez une communauté passionnée ouverte à tous les niveaux."
      actions={
        <>
          <Link href="/entrainements">
            <Button className="bg-white text-blue-800 hover:bg-blue-100">Découvrir les entraînements</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-white/60 bg-white/10 text-white hover:bg-white/20">
              Nous contacter
            </Button>
          </Link>
        </>
      }
    />
  );
}
