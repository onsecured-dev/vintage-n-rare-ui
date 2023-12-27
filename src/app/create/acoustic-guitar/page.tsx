import AGuitarForm from "@/components/create/AGuitarForm";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import type { Metadata } from "next";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-2 sm:px-12">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-12">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap">
          Add Acoustic Guitar
        </h1>
        <AGuitarForm />
      </section>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Create Acoustic Guitar | Vintage & Rare",
  description: "Create a certificate for an Acoustic Guitar",
};
