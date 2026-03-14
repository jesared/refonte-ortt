import { Section } from "@/components/section";

const upcomingEvents = [
  { date: "18 Avril", title: "Stage jeunes vacances", place: "Gymnase Vernouillet" },
  { date: "25 Avril", title: "Rencontre de championnat - Équipe 1", place: "Salle ORTT" },
  { date: "03 Mai", title: "Portes ouvertes du club", place: "Salle ORTT" },
];

export function UpcomingEventsSection() {
  return (
    <Section
      eyebrow="Agenda"
      title="Prochains événements"
      description="Inscrivez ces dates dans votre calendrier pour ne rien manquer de la saison."
    >
      <ul className="space-y-3">
        {upcomingEvents.map((event) => (
          <li key={`${event.date}-${event.title}`} className="flex flex-col gap-1 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">{event.date}</p>
              <p>{event.title}</p>
            </div>
            <p className="text-sm text-muted-foreground">{event.place}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
