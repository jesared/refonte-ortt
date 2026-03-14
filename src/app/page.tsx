import { PageHeader } from "@/components/page-header";

export default function HomePage() {
  return (
    <section>
      <PageHeader
        title="Accueil"
        description="Bienvenue sur le site de l'Olympique Rémois Tennis de Table. Retrouvez ici les informations essentielles du club."
      />

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Contenu d&apos;accueil à venir : présentation du club, actualités mises en avant et accès
        rapide aux prochaines échéances.
      </div>
    </section>
  );
}
