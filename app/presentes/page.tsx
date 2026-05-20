import Image from "next/image";
import Link from "next/link";
import WeddingAccessGate from "../../components/WeddingAccessGate";
import { memories } from "../../lib/memories";
import PresentesGallery from "./PresentesGallery";
import styles from "./PresentesGallery.module.css";

const navItems = [
  { href: "/#inicio", label: "Início" },
  { href: "/#nossa-historia", label: "Nossa História" },
  { href: "/#o-evento", label: "O Evento" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/presentes", label: "Presentes" },
];

const photos = memories.map((memory) => ({
  id: memory.id,
  previewSrc: memory.previewSrc,
}));

export default function PresentesPage() {
  return (
    <>
      <header className="sticky left-0 top-0 z-50 w-full bg-[#082337]/82 shadow-lg shadow-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-5 py-5 md:px-10">
          <Link href="/#inicio" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/10 p-1 backdrop-blur-md">
              <Image
                src="/media/gflor-logo.svg"
                alt="G Flor"
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <div className="hidden leading-none text-white sm:block">
              <p className="[font-family:var(--font-allura)] text-3xl leading-none tracking-wide">
                Jo{" "}
                <span className="[font-family:var(--font-montserrat)] text-2xl font-light">
                  &
                </span>{" "}
                Web
              </p>
            </div>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-8 md:flex"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="[font-family:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.16em] !text-white opacity-100 transition [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:!text-[#dcecf1]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <WeddingAccessGate>
        <main className={styles.gallerySection}>
          <PresentesGallery photos={photos} />
        </main>
      </WeddingAccessGate>
    </>
  );
}
