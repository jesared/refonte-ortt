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
          <li key={`${event.date}-${event.title}`} className="flex flex-col gap-1 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700">{event.date}</p>
              <p className="text-slate-900">{event.title}</p>
            </div>
            <p className="text-sm text-slate-600">{event.place}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
