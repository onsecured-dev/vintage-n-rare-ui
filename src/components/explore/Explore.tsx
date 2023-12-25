"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import PreviewCard, { type InstrumentType } from "./PreviewCard";
import { previewData } from "@/data/placeholder";
import { trpc } from "@/app/_trpc/client";

export default function Explore() {
  const searchParams = useSearchParams();
  /**
   * `instruments` is a comma-separated list of instrument types
   * `sort` is a string representing the instrument type to sort by
   * `query` is a string representing the search query - `name`, `brand`, `model`, `year`, `id`
   *     - if multiple words, query as array of words
   *      WHERE
   *        name LIKE '%word1%' AND name LIKE '%word2%' AND name LIKE '%word3%'
   *        OR brand LIKE '%word1%' AND brand LIKE '%word2%' AND brand LIKE '%word3%'
   *       OR model LIKE '%word1%' AND model LIKE '%word2%' AND model LIKE '%word3%'
   *      OR year LIKE '%word1%' AND year LIKE '%word2%' AND year LIKE '%word3%'
   */
  const router = useRouter();
  /**
   * 1. get the search params to get the search conditions
   * 2. get the search results as Array<{id: number, instrument: InstrumentType, year: number, name: string, brand: string, model: string, serial: string}>
   * 3. render the results if > 0
   *    b. if == 0, render a message saying no results found
   *    c. if == 1, redirect to the instrument page
   */

  const instrumentsParams = searchParams.get("instruments") || "";
  const queryParam = searchParams.get("query") || "";
  const brandsParam = searchParams.get("brands") || "";
  const yearsParam = searchParams.get("years") || "";
  const { data: allCards, error } = trpc.search.useQuery();
  console.log({ allCards, error });
  const instrumentsFilter =
    instrumentsParams.length > 0 ? instrumentsParams.split(",") : [];

  const sortedBy = searchParams.get("sort") || "";
  const typeSort = (a: any, b: any) => {
    if (sortedBy === "") return 0;
    if (a.type.name === sortedBy && b.type.name !== sortedBy) return -1;
    if (a.type.name !== sortedBy && b.type.name === sortedBy) return 1;
    return 0;
  };
  const sortedData = (allCards || []).sort(typeSort);

  console.log({ sortedData });
  return (
    <CardWrapper
      onSearch={(vals) => {
        const searchQuery = [];
        const instruments = vals.instrument.split(",");
        if (instruments.length > 0 && instruments[0].length > 0) {
          searchQuery.push(`instruments=${vals.instrument}`);
        }
        const years = vals.years.split(",");
        if (years.length > 0 && years[0].length > 0) {
          searchQuery.push(`years=${encodeURI(vals.years)}`);
        }
        const brands = vals.instrument.split(",");
        if (brands.length > 0 && brands[0].length > 0) {
          searchQuery.push(`brands=${encodeURI(vals.brands)}`);
        }
        const trimmedQuery = vals.query.trim();
        if (trimmedQuery.length > 0)
          searchQuery.push(`query=${encodeURI(trimmedQuery)}`);

        router.push("/explore?" + searchQuery.join("&"));
      }}
      sortedBy={sortedBy}
      onSort={(vals) => {
        const allParams: Array<string> = [];
        const exists = searchParams.get("sort");
        searchParams.forEach((value, key) => {
          if (key === "sort" && vals.length > 0)
            return allParams.push(`sort=${vals}`);
          allParams.push(`${key}=${value}`);
        });
        if (!exists && vals.length > 0)
          allParams.push(`sort=${encodeURI(vals)}`);
        router.push("/explore?" + allParams.join("&"));
      }}
      totalItems={previewData.length}
      loadedItems={previewData.length}
    >
      {sortedData.map(
        (item: { nftid: number; type: { name: string }; name: string }) => {
          if (
            instrumentsFilter.length > 0 &&
            !instrumentsFilter.includes(item.type.name)
          )
            return null;
          return (
            <PreviewCard
              id={item.nftid}
              type={item.type.name as InstrumentType}
              key={`explore-items-${item.nftid}-${item.type}`}
              name={item.name}
            />
          );
        }
      )}
    </CardWrapper>
  );
}
