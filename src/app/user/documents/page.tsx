import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const documents = [
  {
    name: "Bordereau d'inscription",
    description: "Formulaire d'inscription annuel à compléter et signer.",
    type: "PDF",
    href: "/documents/bordereau-inscription.pdf",
  },
  {
    name: "Règlement du tournoi",
    description: "Règles officielles et déroulé du tournoi du club.",
    type: "PDF",
    href: "/documents/reglement-tournoi.pdf",
  },
  {
    name: "Autorisation parentale",
    description: "Autorisation pour les joueurs mineurs participant aux compétitions.",
    type: "PDF",
    href: "/documents/autorisation-parentale.pdf",
  },
  {
    name: "Documents administratifs",
    description: "Pièces administratives utiles pour votre dossier joueur.",
    type: "ZIP",
    href: "/documents/documents-administratifs.zip",
  },
];

export default function UserDocumentsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Documents</h2>
        <p className="text-sm text-muted-foreground">Téléchargez les documents utiles à votre saison et vos tournois.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {documents.map((document) => (
          <Card key={document.name}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 size-5 text-muted-foreground" />
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-card-foreground">{document.name}</h3>
                  <p className="text-sm text-muted-foreground">{document.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {document.type}
                </span>
                <Link
                  href={document.href}
                  download
                  className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Download className="size-4" />
                  Télécharger
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
