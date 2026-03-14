import { PageHeader } from "@/components/page-header";

export default function ClubPage() {
  return (
    <section>
      <PageHeader
        title="Le Club"
        description="Découvrez l'histoire, les valeurs et l'organisation de l'Olympique Rémois Tennis de Table."
      />

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Contenu de la page club à venir : présentation de l&apos;équipe dirigeante, infrastructures
        et projet associatif.
      </div>
    </section>
  );
}
