import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Olympique Rémois Tennis de Table",
  description: "Site officiel du club Olympique Rémois Tennis de Table.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
