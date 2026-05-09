import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatPublishedDate } from "@/lib/format-date";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const excerpt = article.excerpt ?? "";
  const imageSrc =
    article.coverImage?.src ??
    `https://picsum.photos/seed/${encodeURIComponent(article.slug)}/1600/900`;
  const imageAlt =
    article.coverImage?.alt ?? `Imagen destacada: ${article.title}`;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
      <Link href={`/articulo/${article.slug}`} className="group block">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 md:aspect-[21/9]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, min(1280px, 96vw)"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/10 md:to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:right-auto md:max-w-xl md:p-10">
            <span className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {article.category}
            </span>
            <h2 className="text-2xl font-bold leading-tight md:text-4xl">
              {article.title}
            </h2>
            {excerpt ? (
              <p className="mt-3 line-clamp-3 text-sm text-white/90 md:text-lg">
                {excerpt}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="font-medium">{article.author.name}</span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <time dateTime={String(article.publishedAt)}>
                {formatPublishedDate(article.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
