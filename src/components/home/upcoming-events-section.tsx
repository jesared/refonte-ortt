import { Section } from "@/components/section";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";

export async function UpcomingEventsSection() {
  const upcomingEvents = await getUpcomingEvents();

  return (
    <Section
      eyebrow="Agenda"
      title="Prochains événements"
      description="Inscrivez ces dates dans votre calendrier pour ne rien manquer de la saison."
    >
      {upcomingEvents.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
          Aucun événement publié à venir pour le moment.
        </p>
      ) : (
        <ul className="space-y-3">
          {upcomingEvents.map((event) => (
            <li
              key={event.id}
              className="flex flex-col gap-1 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-primary">{formatEventDate(event.startAt)}</p>
                <p>{event.title}</p>
              </div>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
