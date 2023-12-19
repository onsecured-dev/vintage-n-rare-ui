"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import PreviewCard, { type InstrumentType } from "./PreviewCard";
import { previewData } from "@/data/placeholder";

export default function Explore() {
  const searchParams = useSearchParams();
  const router = useRouter();
  /**
   * 1. get the search params to get the search conditions
   * 2. get the search results as Array<{id: number, instrument: InstrumentType, year: number, name: string, brand: string, model: string, serial: string}>
   * 3. render the results if > 0
   *    b. if == 0, render a message saying no results found
   *    c. if == 1, redirect to the instrument page
   */

  const instrumentsParams = searchParams.get("instruments") || "";
  const instrumentsFilter =
    instrumentsParams.length > 0 ? instrumentsParams.split(",") : [];
  const sortedBy = searchParams.get("sort") || "";
  const typeSort = (a: any, b: any) => {
    if (sortedBy === "") return 0;
    if (a.type === sortedBy && b.type !== sortedBy) return -1;
    if (a.type !== sortedBy && b.type === sortedBy) return 1;
    return 0;
  };
  const sortedData = previewData.sort(typeSort);
  return (
    <CardWrapper
      onSearch={(vals) => {
        const searchQuery = [];
        const instruments = vals.instrument.split(",");
        if (instruments.length > 0 && instruments[0].length > 0) {
          searchQuery.push(`instruments=${vals.instrument}`);
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
      {sortedData.map((item) => {
        if (
          instrumentsFilter.length > 0 &&
          !instrumentsFilter.includes(item.type)
        )
          return null;
        return (
          <PreviewCard
            id={item.id}
            type={item.type as InstrumentType}
            key={`explore-items-${item.id}-${item.type}`}
            brand={item.brand}
            model={item.model}
            year={item.year}
            img={item.img}
          />
        );
      })}
    </CardWrapper>
  );
}
