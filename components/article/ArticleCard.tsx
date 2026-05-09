import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatPublishedDate } from "@/lib/format-date";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageSrc =
    article.coverImage?.src ??
    `https://picsum.photos/seed/${encodeURIComponent(article.slug)}/800/450`;
  const imageAlt =
    article.coverImage?.alt ?? `Portada: ${article.title}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow hover:shadow-lg">
      <Link href={`/articulo/${article.slug}`} className="group flex flex-1 flex-col">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="mb-2 inline-flex w-fit rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
            {article.category}
          </span>
          <h3 className="line-clamp-2 flex-1 text-lg font-semibold leading-snug text-gray-900 group-hover:text-blue-700">
            {article.title}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <span>{article.author.name}</span>
            <span className="text-gray-400" aria-hidden>
              ·
            </span>
            <time dateTime={String(article.publishedAt)}>
              {formatPublishedDate(article.publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
