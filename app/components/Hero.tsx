import Image from "next/image";
import Link from "next/link";

type HeroContent = {
  eyebrow: string[];
  name: string;
  statement: string;
  cta: {
    label: string;
    href: string;
  };
  portrait: {
    src: string;
    alt: string;
    caption?: string;
    note?: string;
    decoration?: string;
  };
};

const heroContent: HeroContent = {
  eyebrow: ["Researcher", "Scholar", "Educator"],

  name: "Shradha Shinde",

  statement:
    "Exploring how emerging AI technologies reshape entrepreneurship, organizations, and economic opportunity.",

  cta: {
    label: "Explore my research",
    href: "/research",
  },

  portrait: {
    src: "/images/shradha-portrait.jpg",
    alt: "Professional portrait of Shradha Shinde",
    caption: "Research · Entrepreneurship · AI",
    note: "Researching the questions behind emerging technology.",
    decoration: "✦",
  },
};

export default function Hero() {
  const { eyebrow, name, statement, cta, portrait } = heroContent;

  return (
    <section className="px-6 py-16 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Text */}
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-neutral-500">
            {eyebrow.join(" · ")}
          </p>

          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            {name}
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-neutral-600 md:text-2xl">
            {statement}
          </p>

          <Link
            href={cta.href}
            className="mt-10 inline-block border-b border-current pb-1"
          >
            {cta.label} →
          </Link>
        </div>

        {/* Portrait */}
        <figure
  className="
    group mx-auto w-full max-w-md
    lg:translate-x-[clamp(2rem,5vw,5.5rem)]
  "
>
          <div className="relative">
            <div
              className="
               relative -translate-x-2 rotate-[-1.2deg]
bg-[var(--paper-bg)]
p-3 shadow-[0_12px_32px_rgba(23,23,23,0.10)]
transition-transform duration-500 ease-out
group-hover:translate-x-1 group-hover:rotate-0
              "
            >
              {/* Tape */}
              <span
                aria-hidden="true"
                className="
                  absolute left-1/2 top-0 z-20
                  h-9 w-1/4
                  -translate-x-1/2 -translate-y-1/2
                  rotate-[1.5deg]
                  bg-[var(--paper-bg)]
                  opacity-90 shadow-sm
                  transition-transform duration-500
                  group-hover:rotate-0
                "
              />

              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="object-cover object-top"
                />
              </div>

              {portrait.caption && (
                <figcaption className="px-2 pb-2 pt-4 text-sm text-[var(--ink-soft)]">
                  {portrait.caption}
                </figcaption>
              )}
            </div>

            {/* Star */}
            {portrait.decoration && (
              <span
                aria-hidden="true"
                className="
                  absolute -bottom-5 -right-5 z-30
                  text-3xl text-[var(--gold-ink)]
                  transition-transform duration-500 ease-out
                  group-hover:translate-x-1
                  group-hover:translate-y-1
                  group-hover:rotate-12
                  group-hover:scale-110
                "
              >
                {portrait.decoration}
              </span>
            )}
          </div>

          {/* Handwritten note */}
          {portrait.note && (
            <p
              className="
                mx-auto mt-7 max-w-xs
                text-center text-sm italic leading-relaxed
                text-[var(--blue-ink)] md:text-base
              "
            >
              {portrait.note}
            </p>
          )}
        </figure>
      </div>
    </section>
  );
}