import Navbar from "../components/Navbar";

export default function CV() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">
      <Navbar />

      <section className="px-8 py-24 md:px-16">
        <p className="mb-5 text-sm uppercase tracking-[0.25em] text-neutral-500">
          Curriculum Vitae
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Experience & academic work.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-neutral-600">
          My academic background, research experience, teaching, publications,
          presentations, and professional work.
        </p>
      </section>
    </main>
  );
}