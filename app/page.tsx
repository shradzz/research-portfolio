import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResearchThemes from "./components/ResearchThemes";
import FeaturedResearch from "./components/FeaturedResearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--site-bg)] text-[var(--ink)]">
      <Navbar />
      <Hero />
      <ResearchThemes />
      <FeaturedResearch />
    </main>
  );
}