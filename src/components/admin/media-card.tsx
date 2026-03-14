"use client";

import { useState } from "react";

import { deleteMediaAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";

type MediaCardProps = {
  id: string;
  name: string;
  url: string;
};

export function MediaCard({ id, name, url }: MediaCardProps) {
  const [copied, setCopied] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={name} className="h-44 w-full object-cover" />

      <div className="space-y-3 p-3">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{url}</p>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? "Copié" : "Copier l'URL"}
          </button>

          <form action={deleteMediaAction}>
            <input type="hidden" name="id" value={id} />
            <FormSubmitButton variant="outline" size="sm" pendingLabel="Suppression...">
              Supprimer
            </FormSubmitButton>
          </form>
        </div>
      </div>
    </article>
  );
}
