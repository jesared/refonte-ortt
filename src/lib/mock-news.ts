export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}

export const mockNews: NewsArticle[] = [
  {
    slug: "tournoi-regional-2026",
    title: "Tournoi régional 2026 : inscriptions ouvertes",
    excerpt:
      "Le club organise son tournoi régional le mois prochain. Découvrez le programme, les catégories et les modalités d'inscription.",
    date: "2026-03-10",
    author: "Équipe ORTT",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Les inscriptions pour le tournoi régional 2026 sont officiellement ouvertes. Les joueurs de tous niveaux sont invités à participer à cette journée placée sous le signe de la convivialité et de la performance.",
      "La compétition se déroulera en plusieurs tableaux selon les classements. Un espace restauration sera disponible sur place et des animations seront proposées pour le public.",
      "Pour vous inscrire, contactez le secrétariat du club ou remplissez le formulaire en ligne avant la date limite indiquée dans la rubrique compétitions.",
    ],
  },
  {
    slug: "reprise-entrainements-printemps",
    title: "Reprise des entraînements de printemps",
    excerpt:
      "Les créneaux évoluent pour la période de printemps. Consultez les nouveaux horaires pour les séances jeunes et adultes.",
    date: "2026-02-28",
    author: "Coach principal",
    image:
      "https://images.unsplash.com/photo-1628999008641-c8e2f654f5a8?auto=format&fit=crop&w=1200&q=80",
    content: [
      "À partir de la semaine prochaine, les entraînements passent au rythme de printemps avec des créneaux ajustés pour mieux préparer les compétitions de fin de saison.",
      "Les groupes jeunes bénéficieront d'un renforcement technique spécifique, tandis que les adultes auront des ateliers orientés match et stratégie.",
      "La présence régulière aux séances est recommandée afin de tirer le meilleur parti de ce cycle de préparation.",
    ],
  },
  {
    slug: "bilan-phase-1-equipes",
    title: "Bilan de la phase 1 pour les équipes du club",
    excerpt:
      "Après une première phase intense, retour sur les performances de nos équipes engagées en championnat.",
    date: "2026-02-15",
    author: "Commission sportive",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    content: [
      "La première phase de championnat s'est terminée sur des résultats encourageants pour l'ensemble de nos équipes. Plusieurs formations ont atteint leurs objectifs de maintien ou de montée.",
      "Au-delà des résultats, l'état d'esprit collectif et l'investissement des joueurs ont été remarquables tout au long de cette période.",
      "Un grand merci aux bénévoles et supporters qui accompagnent le club à chaque rencontre.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return mockNews.find((article) => article.slug === slug);
}
