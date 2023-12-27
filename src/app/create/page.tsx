import Categories from "@/components/Categories";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import type { Metadata } from "next";

export default function CreatePage() {
  return (
    <main className="flex min-h-[calc(100vh-488px)] flex-col items-center">
      <section className="container max-w-7xl px-2 sm:px-12">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-2 sm:px-12">
        <Categories isList />
      </section>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Create | Vintage & Rare",
  description: "Select which instrument to create your certificate for",
};
