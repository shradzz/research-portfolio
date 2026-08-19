import Navbar from "./components/Navbar";
import ResearchThemes from "./components/ResearchThemes";
import FeaturedResearch from "./components/FeaturedResearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col justify-center px-8 md:px-16">
        <p className="mb-5 text-sm uppercase tracking-[0.25em] text-neutral-500">
          Researcher · Scholar · Educator
        </p>

        <h1 className="max-w-5xl text-6xl font-semibold tracking-tight md:text-8xl">
          Shradha Shinde
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-neutral-600 md:text-2xl">
          Exploring how emerging AI technologies reshape entrepreneurship,
          organizations, and economic opportunity.
        </p>

        <div className="mt-10">
          <a
            href="/research"
            className="inline-block border-b border-black pb-1 text-base"
          >
            Explore my research →
          </a>
        </div>
      </section>

      {/* Research Themes */}
      <ResearchThemes />

      {/* Featured Research */}
      <FeaturedResearch />

    </main>
  );
}