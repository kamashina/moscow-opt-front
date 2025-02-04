import Head from "next/head";

type ProductSchemaProps = {
  name: string;
  image: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
};

const ProductSchema = ({
  name,
  image,
  description,
  brand = "Без бренда",
  price = 0,
  currency = "RUB",
}: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image,
    description,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: price || "Договорная",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Название магазина",
      },
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default ProductSchema;
