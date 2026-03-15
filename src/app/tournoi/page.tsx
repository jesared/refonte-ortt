import { PageHeader } from "@/components/page-header";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function TournoiPage() {
  const events = await getUpcomingEvents(10);

  return (
    <section>
      <PageHeader
        title="Tournoi"
        description="Informations officielles du tournoi du club : format, inscriptions et déroulé."
      />

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
          Aucun événement publié pour le moment.
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <article key={event.id} className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm font-semibold text-primary">{formatEventDate(event.startAt)}</p>
              <h2 className="mt-2 text-lg font-semibold">{event.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
