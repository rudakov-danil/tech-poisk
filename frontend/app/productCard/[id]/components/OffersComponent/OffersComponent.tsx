"use client";
import React, { memo, useState } from "react";
import { OfferItem } from "../OfferItem/OfferItem";

export const OffersComponent = memo(function OffersComponent({
  data,
  offersLimit,
  setOffersLimit,
}: any) {
  // const [offersLimit, setOffersLimit] = useState(data?.offers?.length | 3);
  if (!data.offers) {
    return;
  }
  return (
    <>
      {data?.offers
        .slice(0, offersLimit ? data?.offers.length : 2)
        .map((offer: any, index: number) => {
          return <OfferItem key={index} offer={offer} data={data} />;
        })}
      <button
        className={`w-[215px] mt-[20px]  bg-[#0260E8] ml-auto text-[white] rounded-[38px] text-[18px] py-[8px] px-[12px] mb-[23px] max-lg:hidden ${
          data?.offers?.length <= 2 && "hidden"
        }`}
        onClick={() => {
          setOffersLimit((prev: boolean) => !prev);
        }}
      >
        Смотреть все цены
      </button>
    </>
  );
});
