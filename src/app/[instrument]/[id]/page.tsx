// instrument -> electric-guitar / electric-bass / acoustic-guitar / amps-effects
// id -> nft - id

import { InstrumentType } from "@/components/explore/PreviewCard";
import MainItemView from "@/components/items/MainItem";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import { slugToName } from "@/utils/w3String";
import type { Metadata, ResolvingMetadata } from "next";

// @todo if 0, redirect a explore page with error message
export default function InstrumentPage({
  params,
}: {
  params: { instrument: InstrumentType; id: string };
}) {
  const { instrument, id } = params;
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-8">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-8">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap capitalize">
          {slugToName(instrument as string)} #{id}
        </h1>
      </section>
      <MainItemView instrument={instrument} id={parseInt(id)} />
    </main>
  );
}

type Props = {
  params: { id: string; instrument: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const instrument = params.instrument.replace(/-/g, " ").trim();
  const instrumentName = instrument
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `${instrumentName} #${id} | Vintage & Rare`;
  const description = `View the ${instrumentName} #${id} certificate on Vintage & Rare.`;

  return {
    title,
    description,
  };
}
