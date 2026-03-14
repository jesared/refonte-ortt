import { Section } from "@/components/section";

const highlights = [
  { label: "Licenciés", value: "150+" },
  { label: "Équipes engagées", value: "10" },
  { label: "Encadrants", value: "8" },
  { label: "Séances / semaine", value: "14" },
];

export function ClubPresentationSection() {
  return (
    <Section
      eyebrow="Le club"
      title="Un club convivial et ambitieux"
      description="Depuis plusieurs décennies, l'ORTT accompagne les jeunes et les adultes dans la pratique du tennis de table, en loisir comme en compétition."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <p className="text-muted-foreground">
          Notre projet sportif repose sur la progression technique, le plaisir du jeu et l&apos;esprit d&apos;équipe. Les créneaux sont adaptés à tous les profils : initiation, perfectionnement et compétition.
        </p>
        <dl className="grid grid-cols-2 gap-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-background p-4">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</dt>
              <dd className="mt-1 text-2xl font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
