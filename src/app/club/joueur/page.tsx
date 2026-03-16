import { PageHeader } from "@/components/page-header";

export default function JoueurPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <PageHeader
        title="Les joueurs"
        description="Présentation des joueurs du club."
      />

      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
        Contenu en préparation.
      </div>
    </section>
  );
}
