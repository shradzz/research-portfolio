const themes = [
  {
    number: "01",
    title: "AI & Entrepreneurship",
    question: "How does AI change what one founder can build alone?",
  },
  {
    number: "02",
    title: "Digital Work & Organizations",
    question: "What happens when technology begins to substitute traditional roles?",
  },
  {
    number: "03",
    title: "Economic Opportunity",
    question: "How can emerging technologies reshape access to entrepreneurship and growth?",
  },
];

export default function ResearchThemes() {
  return (
    <section className="px-8 py-24 md:px-16">
      <div className="mb-16 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-500">
          What I Explore
        </p>

        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Questions that keep pulling me back.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {themes.map((theme) => (
          <article
            key={theme.number}
            className="group min-h-[280px] border border-black/10 bg-[#efebe3] p-7 transition duration-300 hover:-translate-y-1"
          >
            <p className="mb-12 text-sm text-neutral-500">
              {theme.number}
            </p>

            <h3 className="text-2xl font-semibold">
              {theme.title}
            </h3>

            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              {theme.question}
            </p>

            <div className="mt-8 h-px w-16 bg-black transition-all duration-300 group-hover:w-28" />
          </article>
        ))}
      </div>
    </section>
  );
}