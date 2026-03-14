import { PageHeader } from "@/components/page-header";

export default function TournoiPage() {
  return (
    <section>
      <PageHeader
        title="Tournoi"
        description="Informations officielles du tournoi du club : format, inscriptions et déroulé."
      />

      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
        Contenu du tournoi à venir : règlement, programme de la journée et suivi des tableaux.
      </div>
    </section>
  );
}
