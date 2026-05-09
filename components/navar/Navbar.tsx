"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";

const categories = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "tecnologia", label: "Tecnología", href: "/?categoria=tecnologia" },
  { id: "deportes", label: "Deportes", href: "/?categoria=deportes" },
  { id: "cultura", label: "Cultura", href: "/?categoria=cultura" },
  { id: "economia", label: "Economía", href: "/?categoria=economia" },
  { id: "ciencia", label: "Ciencia", href: "/?categoria=ciencia" },
  {
    id: "entretenimiento",
    label: "Entretenimiento",
    href: "/?categoria=entretenimiento",
  },
  { id: "salud", label: "Salud", href: "/?categoria=salud" },
  { id: "politica", label: "Política", href: "/?categoria=politica" },
];

function NavbarInner() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategoria = searchParams.get("categoria");

  function isActive(categoryId: string): boolean {
    if (categoryId === "inicio") {
      return pathname === "/" && !activeCategoria;
    }
    return activeCategoria === categoryId;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 text-center sm:px-6">
          <Link href="/" className="inline-block">
            <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl">
              La Revista
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto hidden px-4 sm:px-6 md:block">
        <div className="flex flex-wrap justify-center gap-2 py-4 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`rounded-lg px-4 py-2 text-lg font-medium transition-all duration-200 ${
                isActive(category.id)
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-100 md:hidden">
        <div className="container mx-auto px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-gray-50"
          >
            <span className="font-medium text-gray-600">
              {categories.find((c) => isActive(c.id))?.label ??
                "Menú"}
            </span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="animate-slide-down-mobile mt-2 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 transition-colors ${
                    isActive(category.id)
                      ? "bg-blue-50 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavbarFallback() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 text-center sm:px-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl">
            La Revista
          </span>
        </div>
      </div>
      <div className="container mx-auto hidden px-4 sm:px-6 md:block">
        <div className="flex flex-wrap justify-center gap-2 py-4 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="rounded-lg px-4 py-2 text-lg font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarInner />
    </Suspense>
  );
}
