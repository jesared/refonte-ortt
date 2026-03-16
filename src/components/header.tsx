"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { AuthStatusControls } from "@/components/auth-status-controls";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  { label: "Compétitions", href: "/competitions" },
  {
    label: "Club",
    href: "/club",
    children: [
      { label: "Bénévolat", href: "/club/benevolat" },
      { label: "Sponsoring", href: "/club/sponsoring" },
      { label: "Joueur", href: "/club/joueur" },
    ],
  },
  { label: "Événements", href: "/evenements" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClubMobileOpen, setIsClubMobileOpen] = useState(false);
  const { data: session } = useSession();
  const userLabel = session?.user?.name ?? session?.user?.email ?? "Utilisateur";
  const userInitials = userLabel
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsClubMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Olympique Rémois Tennis de Table
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
            {menuItems.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-44 rounded-md border border-border bg-background p-2 opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <AuthStatusControls />
            {session ? (
              <>
                <Link
                  href="/user"
                  aria-label="Accéder à mon espace utilisateur"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Avatar className="size-7">
                    {session.user?.image ? <AvatarImage src={session.user.image} alt={userLabel} /> : null}
                    <AvatarFallback className="text-[10px]">{userInitials || "U"}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-9 p-0"
                  aria-label="Se déconnecter"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="size-4" />
                </Button>
              </>
            ) : null}
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
            className="absolute inset-0 bg-background/70 backdrop-blur-[1px]"
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
                className="h-8 w-8 border-transparent p-0"
                onClick={closeMenu}
                aria-label="Fermer le menu"
              >
                <span aria-hidden="true" className="text-sm leading-none">
                  ✕
                </span>
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => {
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setIsClubMobileOpen((open) => !open)}
                        aria-label={isClubMobileOpen ? "Masquer le sous-menu Club" : "Afficher le sous-menu Club"}
                        aria-expanded={isClubMobileOpen}
                      >
                        <ChevronDown
                          className={`size-4 transition-transform ${isClubMobileOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </Button>
                    </div>

                    {isClubMobileOpen ? (
                      <div className="ml-3 flex flex-col gap-2 border-l border-border pl-3">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={closeMenu}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
