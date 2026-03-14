import Link from "next/link";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

export function JoinCtaSection() {
  return (
    <Section
      eyebrow="Rejoindre l'ORTT"
      title="Envie de rejoindre le club ?"
      description="Que vous soyez débutant, joueur confirmé ou parent d&apos;un jeune pongiste, nous serons ravis de vous accueillir."
      tone="muted"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          Venez essayer une séance, rencontrer l&apos;équipe encadrante et découvrir l&apos;ambiance ORTT.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact">
            <Button>Demander une séance d&apos;essai</Button>
          </Link>
          <Link href="/club">
            <Button variant="outline">En savoir plus sur le club</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
