import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jo & Web | Casamento",
  description:
    "Site oficial do casamento Jo & Web — informações do evento, RSVP e presentes.",
};

const nav = [
  { href: "/", label: "Início" },
  { href: "/historia", label: "Nossa História" },
  { href: "/evento", label: "O Evento" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/presentes", label: "Presentes" },
  { href: "/contato", label: "Contato" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="header">
          <div className="container header-inner">
            <Link className="brand" href="/">
              <span className="brand-mark">JW</span>
              <span className="brand-text">Jo & Web</span>
            </Link>

            <nav className="nav">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="container main">{children}</main>

        <footer className="footer">
          <div className="container footer-inner">
            <p className="muted">© {new Date().getFullYear()} Jo & Web</p>
            <p className="muted">Casamento na praia — informações oficiais</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
