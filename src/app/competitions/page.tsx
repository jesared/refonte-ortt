import { PageHeader } from "@/components/page-header";

export default function CompetitionsPage() {
  return (
    <section>
      <PageHeader
        title="Compétitions"
        description="Suivez les équipes engagées, les calendriers et les résultats des compétitions."
      />

      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
        Contenu des compétitions à venir : calendrier des rencontres, classements et comptes-rendus.
      </div>
    </section>
  );
}
