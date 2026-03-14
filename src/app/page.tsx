import { ClubPresentationSection } from "@/components/home/club-presentation-section";
import { HeroSection } from "@/components/home/hero-section";
import { JoinCtaSection } from "@/components/home/join-cta-section";
import { LatestNewsSection } from "@/components/home/latest-news-section";
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <ClubPresentationSection />
      <LatestNewsSection />
      <UpcomingEventsSection />
      <JoinCtaSection />
    </div>
  );
}
