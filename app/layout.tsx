import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import { FC } from "react";
import "./globals.css";
import Providers from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rusopt",
  description: "rusopt - Оптовый маркетплейс",
};

type Props = {
  client: React.ReactNode;
  ext: React.ReactNode;
};

const RootLayout: FC<Props> = async ({ ext, client }) => {
  const headersList = await headers();
  const host = headersList.get("host");

  return (
    <html lang="ru">
      <body className={`${montserrat.className}`}>
        <Providers>
          {ext}
          {host !== "fsadfs" && client}
          {/* {host !== process.env.NEXT_PUBLIC_CLIENT_DOMAIN && client} */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
