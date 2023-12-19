import Explore from "@/components/explore/Explore";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";

export default function ExplorePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-2 sm:px-8">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-8">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap">
          Explore NFTs
        </h1>
      </section>
      <section className="max-w-7xl">
        <Explore />
      </section>
    </main>
  );
}
