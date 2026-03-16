import { Receipt } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const pricing = [
  { label: "Licence adulte", amount: "120€", details: "Licence annuelle compétition / loisir" },
  { label: "Licence jeune", amount: "90€", details: "Pour les joueurs de moins de 18 ans" },
  { label: "Engagement tournoi", amount: "8€", details: "Par participation à un tournoi individuel" },
  { label: "Adhésion club", amount: "45€", details: "Cotisation annuelle d'adhésion au club" },
];

export default function UserTarifsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Tarifs</h2>
        <p className="text-sm text-muted-foreground">Consultez les principaux tarifs du club et des tournois.</p>
      </header>

      <Card>
        <CardContent className="space-y-5 p-5">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <Receipt className="size-5 text-muted-foreground" />
              Grille tarifaire
            </h3>
            <p className="text-sm text-muted-foreground">Montants indicatifs, susceptibles d&apos;évoluer selon la saison.</p>
          </div>

          <div className="divide-y divide-border">
            {pricing.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-card-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.details}</p>
                </div>
                <p className="text-lg font-semibold text-card-foreground">{item.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
