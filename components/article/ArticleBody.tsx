import Image from "next/image";
import type { Block } from "@/lib/types";

interface ArticleBodyProps {
  blocks: Block[];
}

export default function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="max-w-none">
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        switch (block.type) {
          case "paragraph":
            return (
              <p key={key} className="mb-4 leading-relaxed text-gray-800">
                {block.text}
              </p>
            );
          case "heading": {
            const HeadingTag =
              block.level === 2 ? "h2" : ("h3" as const);
            const className =
              block.level === 2
                ? "mt-10 mb-4 text-2xl font-bold text-gray-900"
                : "mt-8 mb-3 text-xl font-semibold text-gray-900";
            return (
              <HeadingTag key={key} className={className}>
                {block.text}
              </HeadingTag>
            );
          }
          case "image":
            return (
              <figure key={key} className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-2 text-center text-sm text-gray-600">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="my-8 border-l-4 border-blue-600 bg-blue-50/50 py-4 pl-6 pr-4 text-lg italic text-gray-800"
              >
                <p>&ldquo;{block.text}&rdquo;</p>
                {block.author ? (
                  <cite className="mt-3 block text-sm font-medium not-italic text-gray-600">
                    — {block.author}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "list": {
            const ListTag = block.style === "ordered" ? "ol" : "ul";
            const listClass =
              block.style === "ordered"
                ? "my-4 list-decimal space-y-2 pl-6 text-gray-800"
                : "my-4 list-disc space-y-2 pl-6 text-gray-800";
            return (
              <ListTag key={key} className={listClass}>
                {block.items.map((item, i) => (
                  <li key={`${key}-item-${i}`}>{item}</li>
                ))}
              </ListTag>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
