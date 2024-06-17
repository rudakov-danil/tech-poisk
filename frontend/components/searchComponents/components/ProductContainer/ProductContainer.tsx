"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { ProductItem } from "./components/SellersContainer/ProductItem";
import { useInView } from "react-intersection-observer";

interface IPictures {}
interface IProduct {
  componentType: string;
  id: number;
  name: string;
  // pictures: [];
  // propertyCategories: [];
  // offers: [];
  pictures: any;
  propertyCategories: any;
  offers: any;
}
interface Props {
  count: number;
  maxPrice: number | null;
  minPrice: number | null;
  next: string | null;
  pageSize: number;
  previous: string | null;
  results: IProduct[];
}

export const ProductContainer = memo(function ProductContainer({
  data,
  searchTableName,
  setPage,
  isMyLoading,
  isLoading,
  isModalWindow,
}: any) {
  if (data?.results?.length === 0) {
    return <p>Пусто</p>;
  }

  return (
    <>
      {data?.results?.map((e: IProduct) => (
        <ProductItem
          elem={e}
          key={e.id}
          searchTableName={searchTableName}
          isModalWindow={isModalWindow}
        />
      ))}
    </>
  );
});
