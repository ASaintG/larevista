import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import ArticleBody from "@/components/article/ArticleBody";
import RelatedArticles from "@/components/article/RelatedArticles";
import ShareButtons from "@/components/ui/ShareButtons";
import Footer from "@/components/footer/Footer";
import {
  getArticleBySlug,
  getArticlesByCategory,
  getAllArticles,
} from "@/lib/articles";
import { formatPublishedDate } from "@/lib/format-date";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function absoluteUrlForPath(path: string): Promise<string> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${proto}://${host}${path}`;
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path}`;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "No encontrado" };
  }

  const description = article.excerpt ?? article.title;
  const ogImage = article.coverImage?.src;

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime:
        typeof article.publishedAt === "string"
          ? article.publishedAt
          : new Date(article.publishedAt).toISOString(),
      images: ogImage
        ? [{ url: ogImage, alt: article.coverImage?.alt ?? article.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getArticlesByCategory(article.category, article.slug).slice(
    0,
    3,
  );

  const excerpt = article.excerpt ?? "";
  const sharePath = `/articulo/${article.slug}`;
  const shareUrl = await absoluteUrlForPath(sharePath);

  const coverSrc =
    article.coverImage?.src ??
    `https://picsum.photos/seed/${encodeURIComponent(article.slug)}/1600/900`;
  const coverAlt =
    article.coverImage?.alt ?? `Portada: ${article.title}`;

  return (
    <>
    <main className="flex-1">
      <article className="border-b border-gray-100 bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <nav aria-label="Ruta de navegación" className="mb-6 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-gray-600">
              <li>
                <Link href="/" className="text-blue-400 hover:underline">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="capitalize text-gray-900">{article.category}</li>
            </ol>
          </nav>

          <header className="mb-8">
            <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {article.category}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl md:leading-tight">
              {article.title}
            </h1>
            {excerpt ? (
              <p className="mt-4 text-lg leading-relaxed text-gray-600 md:text-xl">
                {excerpt}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-800"
                    aria-hidden
                  >
                    {article.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {article.author.name}
                  </p>
                  <time
                    className="text-sm text-gray-600"
                    dateTime={String(article.publishedAt)}
                  >
                    {formatPublishedDate(article.publishedAt)}
                  </time>
                </div>
              </div>
            </div>
          </header>

          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
            <Image
              src={coverSrc}
              alt={coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
          </div>

          <ArticleBody blocks={article.body} />

          <div className="mt-12">
            <ShareButtons shareUrl={shareUrl} title={article.title} />
          </div>
        </div>
      </article>

      <div className="container mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedArticles articles={related} />
      </div>
    </main>
    <Footer/>
    </>
  );
}
