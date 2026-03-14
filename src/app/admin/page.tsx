import { FileText, Newspaper, Shield, Users } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";

const stats = [
  { title: "Licenciés", value: "248", icon: Users },
  { title: "Equipes", value: "12", icon: Shield },
  { title: "Tables", value: "18", icon: FileText },
  { title: "Actualités publiées", value: "34", icon: Newspaper },
];

const latestNews = [
  "Résultats de la phase 2 publiés",
  "Inscriptions ouvertes pour le tournoi interne",
  "Nouvelle galerie photos du week-end",
];

const latestChanges = [
  "Page Partenaires mise à jour",
  "Effectif équipe R1 modifié",
  "Paramètres d'inscription ajustés",
];

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
          <h2 className="text-base font-semibold">Dernières actualités</h2>
          <ul className="mt-4 space-y-2">
            {latestNews.map((item) => (
              <li key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
          <h2 className="text-base font-semibold">Dernières modifications</h2>
          <ul className="mt-4 space-y-2">
            {latestChanges.map((item) => (
              <li key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
