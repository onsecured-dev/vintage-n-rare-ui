import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";

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
        <h2 className="text-2xl font-bold pb-4 whitespace-pre-wrap">
          Vintage & Rare
        </h2>
        <p>
          Our mission is to establish and develop the ultimate network/community
          designed for enthusiasts and retailers of vintage, rare and antique
          musical instruments, as well as an online network for dedicated
          builders of fine instruments.
        </p>
        <a
          href="https://vintageandrare.com"
          target="_blank"
          className="btn-link text-primary-text"
        >
          Read More
        </a>
      </section>
      <section className="container max-w-5xl px-8">
        <h2 className="text-2xl font-bold py-4 whitespace-pre-wrap">
          Secured On Blockchain
        </h2>
        <p>
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
          className="btn-link text-primary-text"
        >
          Read More
        </a>
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
            className="btn-link text-primary-text"
          >
            securedonblockchain.com
          </a>
        </p>
      </section>
    </main>
  );
}
