import { PageHeader } from "@/components/page-header";

export default function EntrainementsPage() {
  return (
    <section>
      <PageHeader
        title="Entrainements"
        description="Consultez les créneaux, les groupes de niveaux et les informations d'encadrement."
      />

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Contenu des entraînements à venir : planning hebdomadaire, tarifs et modalités d&apos;inscription.
      </div>
    </section>
  );
}
