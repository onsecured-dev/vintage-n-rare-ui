import BassForm from "@/components/create/BassForm";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12">
      <section className="container">
        <PageBreadcrumbs />
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap">
          Add Electric Bass
        </h1>
      </section>
      <section className="container">
        <BassForm />
      </section>
    </main>
  );
}
