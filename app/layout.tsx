import type { Metadata } from "next";
import { Allura } from "next/font/google";
import "./globals.css";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

export const metadata: Metadata = {
  title: "Jo & Web | Casamento",
  description:
    "Site oficial do casamento Jo & Web: informações do evento, RSVP e presentes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={allura.variable}>{children}</body>
    </html>
  );
}
