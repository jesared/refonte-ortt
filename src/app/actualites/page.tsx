import { PageHeader } from "@/components/page-header";

export default function ActualitesPage() {
  return (
    <section>
      <PageHeader
        title="Actualités"
        description="Retrouvez les dernières nouvelles du club, les annonces et les événements à venir."
      />

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Contenu des actualités à venir : articles, photos et publications des temps forts du club.
      </div>
    </section>
  );
}
