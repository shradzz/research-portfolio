import Link from "next/link";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "Journal", href: "/journal" },
  { name: "CV", href: "/cv" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-7 md:px-16">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Shradha Shinde
      </Link>

      <div className="flex gap-7 text-sm">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="transition hover:opacity-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}