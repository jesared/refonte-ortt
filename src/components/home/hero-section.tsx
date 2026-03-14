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
            <Button>Découvrir les entraînements</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">Nous contacter</Button>
          </Link>
        </>
      }
    />
  );
}
