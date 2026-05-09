import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-lg font-semibold text-gray-900">La Revista</p>
            <p className="mt-1 max-w-md text-sm text-gray-600">
              Noticias y análisis de Honduras y Centroamérica. Información clara,
              rigurosa y accesible desde cualquier dispositivo.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              <Link
                href="/"
                className="font-medium text-blue-600 hover:underline"
              >
                Inicio
              </Link>
            </p>
            <p className="mt-2">© {year} La Revista. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
