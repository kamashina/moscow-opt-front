import { getQueryClient } from "@/src/api/api";
import { fetchPageData } from "./fetchPageData";
import { Metadata } from "next";

type Props = {
  title: string;
  description: string;
};

export async function generatePageMetadata({
  title,
  description,
}: Props): Promise<Metadata> {
  const queryClient = getQueryClient();
  const { categories, cards, shops } = await fetchPageData(queryClient);

  const categoriesKeywords = categories.map(({ name }) => name).join(", ");
  const cardsKeywords = cards
    .map(({ preview }) => preview.name)
    .join(", ")
    .substring(0, 150)
    .trim();

  return {
    title,
    description,
    keywords: `${categoriesKeywords}, ${cardsKeywords}`,
    openGraph: {
      title,
      description,
      siteName: "Название сайта",
      images: shops.map(({ logo }) => ({
        url: process.env.NEXT_PUBLIC_FILES_URL + logo,
        width: 1200,
        height: 630,
        alt: "Лучшие товары оптом по выгодным ценам",
      })),
      type: "website",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: categories.map(
        ({ logo }) => process.env.NEXT_PUBLIC_FILES_URL + logo
      ),
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_CLIENT_DOMAIN,
    },
    robots: "index, follow",
  };
}
