const projects = [
  {
    id: "01",
    status: "Work in Progress",
    title: "AI-Native Solo Ventures",
    question:
      "What happens to the startup workforce when one founder can orchestrate AI as a virtual team?",
    stage: "Literature Review → Concept Development",
  },
  {
    id: "02",
    status: "Research Direction",
    title: "AI & Small Business",
    question:
      "Can accessible AI help resource-constrained businesses grow without requiring sophisticated technical capabilities?",
    stage: "Idea Development",
  },
];

export default function FeaturedResearch() {
  return (
    <section className="border-t border-black/10 px-8 py-28 md:px-16">
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-500">
            From the Notebook
          </p>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Research in motion.
          </h2>
        </div>

        <p className="max-w-sm text-lg leading-relaxed text-neutral-600">
          Not just finished papers - the questions, fragments, and evolving
          ideas behind the work.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative min-h-[430px] overflow-hidden border border-black/15 bg-[#eee9df] p-8 transition duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm text-neutral-500">{project.id}</span>

              <span className="rounded-full border border-black/20 px-3 py-1 text-xs uppercase tracking-wider">
                {project.status}
              </span>
            </div>

            <div className="mt-20">
              <h3 className="max-w-md text-3xl font-semibold tracking-tight">
                {project.title}
              </h3>

              <p className="mt-6 max-w-lg text-xl leading-relaxed text-neutral-600">
                {project.question}
              </p>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="mb-4 h-px w-full bg-black/15" />

              <p className="text-sm text-neutral-500">
                {project.stage}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}