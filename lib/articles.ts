import type { Article } from "./types";
import data from "./data.json";

const articles = data as Article[];

function publishedAtToMs(article: Article): number {
  const value = article.publishedAt;
  if (typeof value === "number") {
    return value;
  }
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getAllArticlesSortedByDate(): Article[] {
  return [...articles].sort(
    (a, b) => publishedAtToMs(b) - publishedAtToMs(a),
  );
}

export function getAllArticles(): Article[] {
  return [...articles];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: string,
  excludeSlug?: string,
): Article[] {
  return getAllArticlesSortedByDate().filter(
    (a) =>
      a.category.toLowerCase() === category.toLowerCase() &&
      a.slug !== excludeSlug,
  );
}
