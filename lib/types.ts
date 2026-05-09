export interface CoverImage {
  src: string;
  alt: string;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface ListBlock {
  type: "list";
  style: "bullet" | "ordered";
  items: string[];
}

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | ListBlock;

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: CoverImage;
  category: string;
  author: Author;
  publishedAt: string | number;
  tags?: string[];
  body: Block[];
}
