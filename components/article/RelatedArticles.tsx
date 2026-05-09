import ArticleCard from "@/components/article/ArticleCard";
import type { Article } from "@/lib/types";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-16 border-t border-gray-200 pt-12"
      aria-labelledby="relacionados-heading"
    >
      <h2
        id="relacionados-heading"
        className="mb-8 text-2xl font-bold text-gray-900"
      >
        Artículos relacionados
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
