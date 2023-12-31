import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import Image from "next/image";
import secured from "@/../public/Graphics/secured.webp";
import vnr from "@/../public/Graphics/mainLogo.png";
import { type Metadata } from "next";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-2 sm:px-8">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-8">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap">
          About Us
        </h1>
      </section>
      <section className="container max-w-5xl px-8">
        <h2 className="text-2xl font-bold py-4">
          Why Create a Certificate of Ownership
        </h2>
        <p className="whitespace-pre-wrap">
          Certificates of Ownership created and stored on the blockchain serves
          as a next layer of authenticity for your high-end musical instruments.
          {"\n"}
          Creating a Certificate of Ownership means that you can store and
          encrypt vital and important information in a safe and easy way, using
          the blockchain.
          {"\n"}
          The certificates of the items will be linked to their prospective
          owners - creating an additional layer of verification. Each
          certificate is unique and is impossible to copy.
          {"\n"}
          If you want to know more about the technology behind we welcome you to
          visit{" "}
          <a
            href="https://www.securedonblockchain.com"
            target="_blank"
            className="btn-link text-primary-text dark:text-blue-400"
          >
            securedonblockchain.com
          </a>
        </p>
      </section>
      <hr className="w-[90%] mt-10 mb-4" />

      <section className="container max-w-5xl px-8 grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-3">
          <h2 className="text-2xl font-bold pb-4 whitespace-pre-wrap pr-4">
            <Image
              src={vnr}
              alt="vintage and rare"
              className="invert dark:invert-0"
            />
          </h2>
        </div>
        <p className="max-w-full col-span-12 md:col-span-6 py-4">
          Our mission is to establish and develop the ultimate network/community
          designed for enthusiasts and retailers of vintage, rare and antique
          musical instruments, as well as an online network for dedicated
          builders of fine instruments.
        </p>
        <a
          href="https://vintageandrare.com"
          target="_blank"
          className=" text-white btn bg-primary-text col-span-12 md:col-span-2 col-start-1 md:col-start-11"
        >
          Read More
        </a>
      </section>
      <hr className="w-[90%] my-4" />
      <section className="container max-w-5xl px-8 grid grid-cols-12 items-center">
        <h2 className="text-2xl font-bold py-4 whitespace-pre-wrap col-span-12 md:col-span-3 pr-2">
          <Image
            src={secured}
            alt="secured on blockchain"
            className=" invert dark:invert-0"
          />
        </h2>
        <p className="max-w-full col-span-12 md:col-span-6">
          Secured On Blockchain is a platform that allows you to store vital
          information of your assets (physical or digital) on the blockchain and
          is easily accessible to all for verification. You can store key
          information like the age of a product, history, pictures, serial
          number, identification of the product etc. Now why is this so
          important? This provides originality and preserves the value of a
          product over a long period of time. This is perfect for all parties
          involved (Product owner, previous owner, potential buyer, future
          owners etc.).
        </p>
        <a
          href="https://www.securedonblockchain.com"
          target="_blank"
          className=" text-white btn bg-primary-text col-span-12 md:col-span-2 col-start-1 md:col-start-11"
        >
          Read More
        </a>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "About | Vintage & Rare",
  description: `Our mission is to establish and develop the ultimate network/community
    designed for enthusiasts and retailers of vintage, rare and antique
    musical instruments, as well as an online network for dedicated
    builders of fine instruments.`,
};
