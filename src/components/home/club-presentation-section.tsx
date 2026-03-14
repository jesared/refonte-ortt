import { HomeSection } from "@/components/home/home-section";

const highlights = [
  { label: "Licenciés", value: "150+" },
  { label: "Équipes engagées", value: "10" },
  { label: "Encadrants", value: "8" },
  { label: "Séances / semaine", value: "14" },
];

export function ClubPresentationSection() {
  return (
    <HomeSection
      eyebrow="Le club"
      title="Un club convivial et ambitieux"
      description="Depuis plusieurs décennies, l'ORTT accompagne les jeunes et les adultes dans la pratique du tennis de table, en loisir comme en compétition."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <p className="text-slate-700">
          Notre projet sportif repose sur la progression technique, le plaisir du jeu et l&apos;esprit d&apos;équipe. Les créneaux sont adaptés à tous les profils : initiation, perfectionnement et compétition.
        </p>
        <dl className="grid grid-cols-2 gap-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{item.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </HomeSection>
  );
}
