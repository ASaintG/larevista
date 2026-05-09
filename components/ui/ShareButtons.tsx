"use client";

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  /** URL absoluta del artículo para compartir */
  shareUrl: string;
  title: string;
}

export default function ShareButtons({ shareUrl, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      id: "twitter",
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Share2 className="h-4 w-4" aria-hidden />
        Compartir
      </p>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
