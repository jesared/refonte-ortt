import Link from "next/link";

import { ClubPresentationSection } from "@/components/home/club-presentation-section";
import { JoinCtaSection } from "@/components/home/join-cta-section";
import { LatestNewsSection } from "@/components/home/latest-news-section";
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section";
import { Hero } from "@/components/hero";
import { LoginButton } from "@/components/login-button";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="space-y-8">
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
            <LoginButton />
          </>
        }
      />
      <ClubPresentationSection />
      <LatestNewsSection />
      <UpcomingEventsSection />
      <JoinCtaSection />
    </div>
  );
}
