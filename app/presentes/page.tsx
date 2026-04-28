import Image from "next/image";
import Link from "next/link";
import PresentesGallery from "./PresentesGallery";
import styles from "./PresentesGallery.module.css";

const navItems = [
  { href: "/#inicio", label: "Início" },
  { href: "/#nossa-historia", label: "Nossa História" },
  { href: "/#o-evento", label: "O Evento" },
  { href: "/#rsvp", label: "RSVP" },
  { href: "/presentes", label: "Presentes" },
];

const sourcePhotos = [
  "/hero/hero.jpg",
  "/historia/01.jpg",
  "/historia/02.jpg",
  "/historia/03.jpg",
  "/historia/04.jpg",
  "/historia/05.jpg",
  "/evento/local.jpg",
];

const photos = Array.from({ length: 60 }, (_, index) => ({
  src: sourcePhotos[index % sourcePhotos.length],
  story: `Essa é uma memória simbólica da nossa caminhada, marcada pelo carinho de quem participou da nossa história. A foto ${
    index + 1
  } guarda um pedacinho desse caminho e agora fica colorida para celebrar esse presente.`,
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
                Jo & Web
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

      <main className={styles.gallerySection}>
        <PresentesGallery photos={photos} />
      </main>
    </>
  );
}
