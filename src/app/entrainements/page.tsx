import { PageHeader } from "@/components/page-header";

export default function EntrainementsPage() {
  return (
    <section>
      <PageHeader
        title="Entrainements"
        description="Consultez les créneaux, les groupes de niveaux et les informations d'encadrement."
      />

      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
        Contenu des entraînements à venir : planning hebdomadaire, tarifs et modalités d&apos;inscription.
      </div>
    </section>
  );
}
