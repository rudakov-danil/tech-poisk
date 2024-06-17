"use client";
import styles from "./style.module.css";
import heartBlack from "../../../../../assets/icons/black-heart.svg";
import heart from "../../../../../assets/icons/heart.svg";
import graph from "../../../../../assets/icons/comparison-black-icon.svg";
import Image from "next/image";
import { Sellers } from "./Sellers";
import {
  saveDataToLocalStorage,
  removeDataFromLocalStorageById,
} from "@/components/searchComponents/components/ProductContainer/components/SellersContainer/ProductItem";
import { useState } from "react";

interface Sellers {
  offers: [
    {
      id: number;
      name: string;
      logoUrl: string | null;
      logoWidth: number | null;
      logoHeight: number | null;
    }
  ];
}

export const PriceBlock = ({ offers, data }: any) => {
  const [isFavourite, setIsFavourite] = useState(checkIsFavourite(data.id));

  function checkIsFavourite(targetId: number): boolean {
    // Получаем массив объектов из localStorage (предположим, что массив хранится под ключом "objects")
    const objects = JSON.parse(String(localStorage.getItem("component"))) || [];

    let idExists = false;

    // Проверяем каждый объект в массиве
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === targetId) {
        idExists = true;
        break;
      }
    }
    return idExists;
  }

  function findMinAndMaxPrice(array: any): string | any {
    if (!array || array.length === 0) {
      return "";
    }

    const sortedPrices = array
      .map((obj: any) => obj.price)
      .sort((a: number, b: number) => a - b);

    if (sortedPrices[0] === sortedPrices[sortedPrices.length - 1]) {
      return (
        <p className="max-lg:text-[20px] whitespace-nowrap">
          <span className="max-lg:text-[24px]">
            {sortedPrices[0].toLocaleString()}₽
          </span>
        </p>
      );
    } else {
      return (
        <p className="max-lg:text-[20px] font-extrabold whitespace-nowrap">
          от{" "}
          <span className="max-lg:text-[24px]">
            {sortedPrices[0].toLocaleString()}₽
          </span>{" "}
          до{" "}
          <span className="max-lg:text-[24px]">
            {sortedPrices[sortedPrices.length - 1].toLocaleString()}₽
          </span>
        </p>
      );
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.price}>
        {/* от <span>8000</span> до <span>8680 ₽</span> */}
        {findMinAndMaxPrice(offers)}

        <div className={styles.buttonContainer}>
          <button
            className={`${
              isFavourite ? "bg-[#FF5252]" : "bg-[#dde1e7]"
            } hover:bg-[#ff8282] h-[51px] w-[51px] flex justify-center items-center rounded-[50%] max-lg:rounded-[5px] max-lg:h-[37.11px] max-lg:w-[37.11px]`}
            onClick={() => {
              if (isFavourite) {
                setIsFavourite(false);
                removeDataFromLocalStorageById("component", data.id);
              } else {
                setIsFavourite(true);

                saveDataToLocalStorage("component", data);
              }
            }}
          >
            {isFavourite ? (
              <Image
                src={heart}
                alt="heart"
                className="max-lg:h-[22px] max-lg:w-[22px]"
              />
            ) : (
              <Image
                src={heartBlack}
                alt="heart"
                className="max-lg:h-[22px] max-lg:w-[22px]"
              />
            )}
          </button>
          <button className="h-[51px] w-[51px] flex justify-center items-center rounded-[50%] max-lg:rounded-[5px] bg-[#dde1e7] max-lg:h-[37.11px] max-lg:w-[37.11px]">
            <Image
              src={graph}
              alt="graph"
              className="max-lg:h-[22px] max-lg:w-[22px]"
            />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[306px] flex flex-col gap-[7px] overflow-x-[unset]">
        {offers?.map((e: any) => {
          return (
            <Sellers
              data={data}
              price={e.price}
              buyLink={e.buyLink}
              store={e.store}
              key={e.id}
            />
          );
        })}
      </div>
    </div>
  );
};
