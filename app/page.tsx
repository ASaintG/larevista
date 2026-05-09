import type { Metadata } from "next";
import FeaturedArticle from "@/components/article/FeaturedArticle";
import ArticleCard from "@/components/article/ArticleCard";
import Footer from "@/components/footer/Footer";
import { getAllArticlesSortedByDate } from "@/lib/articles";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}): Promise<Metadata> {
  const { categoria } = await searchParams;
  if (categoria) {
    const label =
      categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
    return {
      title: label,
      description: `Últimas noticias y reportajes en ${label}.`,
    };
  }
  return {
    title: "Portada",
    description:
      "Mini revista digital con las últimas noticias de tecnología, deportes, cultura y más.",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const allSorted = getAllArticlesSortedByDate();

  const filtered = categoria
    ? allSorted.filter(
        (a) =>
          a.category.toLowerCase() === categoria.toLowerCase(),
      )
    : allSorted;

  if (filtered.length === 0) {
    return (
      <>
        <main className="flex flex-1 flex-col">
          <div className="container mx-auto flex-1 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Sin artículos en esta categoría
            </h1>
            <p className="mt-4 text-gray-600">
              Prueba con otra sección desde el menú de navegación.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const [featured, ...rest] = filtered;

  const sectionTitle = categoria
    ? `Más en ${categoria.charAt(0).toUpperCase()}${categoria.slice(1)}`
    : "Últimas noticias";

  return (
    <>
      <main className="flex flex-1 flex-col">
        <div className="container mx-auto flex-1 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <section aria-labelledby="destacado-heading" className="mb-12 md:mb-16">
            <h2 id="destacado-heading" className="sr-only">
              Artículo destacado
            </h2>
            <FeaturedArticle article={featured} />
          </section>

          <section aria-labelledby="mas-articulos-heading">
            <h2
              id="mas-articulos-heading"
              className="mb-6 text-2xl font-bold text-gray-900"
            >
              {sectionTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
