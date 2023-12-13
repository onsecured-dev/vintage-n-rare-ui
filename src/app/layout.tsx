import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import classNames from "classnames";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vintage & Rare",
  description: "For enthusiasts and retailers of vintage, rare and antique musical instruments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={classNames(
            dmSans.className,
            "dark:bg-home bg-home bg-cover"
          )}
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
