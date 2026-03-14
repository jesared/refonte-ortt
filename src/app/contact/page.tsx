import { PageHeader } from "@/components/page-header";

export default function ContactPage() {
  return (
    <section>
      <PageHeader
        title="Contact"
        description="Une question ? Contactez l'Olympique Rémois Tennis de Table pour toute demande d'information."
      />

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        Contenu de contact à venir : coordonnées du club, formulaire de contact et informations pratiques.
      </div>
    </section>
  );
}
