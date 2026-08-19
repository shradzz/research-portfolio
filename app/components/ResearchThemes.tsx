const themes = [
  {
    number: "01",
    title: "Ideas → Ventures",
    question:
      "How can emerging technologies help transform an idea into a viable venture from the ground up?",
  },
  {
    number: "02",
    title: "AI → Scale",
    question:
      "How does accessible AI change what individuals and small teams can build, operate, and scale?",
  },
  {
    number: "03",
    title: "Ventures → Economic Opportunity",
    question:
      "How can technology help entrepreneurs and small businesses turn resourcefulness into sustainable growth and broader economic opportunity?",
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
          From ideas to economic impact.
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          I am interested in what becomes possible when powerful technologies
          become accessible to people building with limited resources.
        </p>
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