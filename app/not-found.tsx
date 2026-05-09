import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Error 404
      </p>
      <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
        No encontramos ese artículo
      </h1>
      <p className="mt-4 max-w-md text-lg text-gray-600">
        Es posible que el enlace esté desactualizado o que el contenido se haya
        movido.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
