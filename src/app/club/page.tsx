import { PageHeader } from "@/components/page-header";

export default function ClubPage() {
  return (
    <section>
      <PageHeader
        title="Le Club"
        description="Découvrez l'histoire, les valeurs et l'organisation de l'Olympique Rémois Tennis de Table."
      />

      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
        Contenu de la page club à venir : présentation de l&apos;équipe dirigeante, infrastructures
        et projet associatif.
      </div>
    </section>
  );
}
