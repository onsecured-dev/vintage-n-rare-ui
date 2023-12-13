import EGuitarForm from "@/components/create/EGuitarForm";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-2 sm:px-12">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-12">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap">
          Add Electric Guitar
        </h1>
        <EGuitarForm />
      </section>
    </main>
  );
}
