"use client";

import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const menuItems = [
  { label: "Accueil", href: "/" },
  { label: "Le Club", href: "/club" },
  { label: "Compétitions", href: "/competitions" },
  { label: "Entrainements", href: "/entrainements" },
  { label: "Actualités", href: "/actualites" },
  { label: "Tournoi", href: "/tournoi" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Olympique Rémois Tennis de Table
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]"
            onClick={closeMenu}
            aria-label="Fermer le menu mobile"
          />
          <nav
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-dvh w-[min(85vw,20rem)] flex-col border-l border-border bg-background px-6 py-6 shadow-2xl"
            aria-label="Menu mobile"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">Menu</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={closeMenu}
                aria-label="Fermer le menu"
              >
                <span aria-hidden="true" className="text-sm leading-none">
                  ✕
                </span>
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
