import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import settingImg from "../../../../../../assets/icons/settingImg.svg";
import arrow from "../../../../../../assets/icons/arrow-down-white.svg";
import graph from "../../../../../../assets/icons/graph-gray.png";
import heart from "../../../../../../assets/icons/heart-gray.png";
import heartRed from "../../../../../../assets/icons/heart-red.svg";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addComponent,
  removeComponent,
} from "@/redux/services/userComponentsListSlice";
import check from "../../../../../../assets/icons/check.svg";
import { SellItem } from "../../../SellItem/SellItem";

export function saveDataToLocalStorage(category: string, data: {}) {
  let existingData = JSON.parse(String(localStorage.getItem(category))) || [];

  existingData.push(data);

  localStorage.setItem(category, JSON.stringify(existingData));
}
export function removeDataFromLocalStorageById(
  category: string,
  idToDelete: number
) {
  let existingData = JSON.parse(String(localStorage.getItem(category))) || [];
  existingData = existingData.filter(
    (item: { id: number }) => item.id !== idToDelete
  );
  localStorage.setItem(category, JSON.stringify(existingData));
}
export const ProductItem = memo(function ProductItem({
  elem,
  searchTabelName,
  isModalWindow,
}: any) {
  const [isShowSellers, setIsShowSellers] = useState<boolean>(false);

  const [isFavourite, setIsFavourite] = useState<boolean>(
    checkIsFavourite(elem.id)
  );
  const allowedFitlersInProcessors = [
    "socket",
    "core_count",
    "base_clock",
    "turbo_clock",
    "core",
    "2_cache",
    "l3_cache",
    "process_node",
    "tdp",
  ];

  function findMinAndMaxPrice(array: any): string {
    if (!array || array.length === 0) {
      return "";
    }

    const sortedPrices = array
      .map((obj: any) => obj.price)
      .sort((a: number, b: number) => a - b);

    if (sortedPrices[0] === sortedPrices[sortedPrices.length - 1]) {
      return `${sortedPrices[0].toLocaleString()}₽`;
    } else {
      return `${sortedPrices[0].toLocaleString()}₽ - ${sortedPrices[
        sortedPrices.length - 1
      ].toLocaleString()}₽`;
    }
  }

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

  return (
    <>
      <div
        // className="flex items-center max-w-[960px] w-full gap-[30px]  border-b border-solid border-[#9e9e9e20] pb-[18px]"
        className="flex items-center justify-between gap-[5px] border-b border-solid border-[#9e9e9e20] pb-[18px] w-full max-lg:flex-col max-lg:items-baseline max-xl:flex-col max-xl:items-baseline"
        key={uuidv4()}
      >
        <Link
          href={`/productCard/${elem?.id}`}
          target="_blank"
          className="flex items-center max-lg:w-full"
        >
          <Image
            width={97}
            height={0}
            src={elem?.pictures[0]?.url || settingImg}
            alt="component-logo"
            className="mr-[40px] max-2xl:mr-[15px] w-[97px] max-2xl:w-[58px] max-2xl:h-[72px]"
          />

          <div className="max-w-[398px] max-lg:max-w-full flex flex-col gap-[13px]">
            <h3
              style={{ fontFamily: "source-sans-pro-regular" }}
              className="text-[24px] max-lg:text-[16px] font-regular"
            >
              {elem.name}
            </h3>
            <div className="text-[18px] max-lg:text-[13px] max-lg:font-normal text-[#9E9E9E] flex flex-wrap">
              <div className="flex gap-[3px] max-lg:text-[13px] flex-wrap">
                {elem?.propertyCategories[0].properties?.map((prop: any) => {
                  return (
                    <p key={prop.id} className="break-all">
                      {prop.slug === "turbo_clock"
                        ? `Turbo: ${prop.value}`
                        : prop.value}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </Link>

        <div className="max-lg:hidden flex flex-col gap-[20px]">
          <div className={`flex gap-[27px] mr-[5px] items-end`}>
            <div className="flex flex-col gap-[16px] items-center">
              <h3 className={styles.price}>
                {findMinAndMaxPrice(elem.offers)}
              </h3>
              <button
                onClick={(e: any) => {
                  e.stopPropagation();
                  setIsShowSellers((prev) => !prev);
                }}

                className="w-[200px] hover:opacity-[0.85] h-[38px] bg-[#0260E8] rounded-[20px] flex items-center text-[white] gap-[9px] font-semibold justify-center z-40"
                
              >
                Посмотреть цены
                <Image
                  width={14}
                  height={14}
                  src={arrow}
                  alt="arrow"
                  className={`${isShowSellers ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            </div>
            <div className="flex items-center gap-[9px] mb-[5.58px]">
              <Image src={graph} width={30} height={30} alt="graph" />

              <button
                className="heart-svg-container"
                onClick={() => {
                  setIsFavourite((prev) => !prev);
                  if (isFavourite) {
                    removeDataFromLocalStorageById("component", elem.id);
                  } else {
                    saveDataToLocalStorage("component", elem);
                  }
                }}
              >
                {checkIsFavourite(elem.id) ? (
                  <Image
                    width={30}
                    height={30}
                    src={heartRed}
                    alt="heartRed"
                    className={`${styles["heart-hover"]}`}
                  />
                ) : (
                  <Image
                    width={30}
                    height={30}
                    src={heart}
                    alt="heart"
                    className={`${styles["heart-hover"]}`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex lg:hidden gap-[20px] w-full items-center max-lg:justify-between">
          <h3 className="font-semibold text-[18px]">
            {findMinAndMaxPrice(elem.offers)}
          </h3>

          <div className="flex  gap-[5px] items-center max-ssm:flex-col">
            <div className="flex items-center gap-[5px]">
              <Image
                src={graph}
                width={30}
                height={30}
                alt="graph"
                className={`${styles["graph-img"]} max-lg:hidden`}
              />
              <Image
                src={graph}
                width={23}
                height={23}
                alt="graph"
                className={`${styles["graph-img"]} lg:hidden`}
              />

              <button
                className="heart-svg-container max-lg:hidden"
                onClick={() => {
                  setIsFavourite((prev) => !prev);
                  if (isFavourite) {
                    removeDataFromLocalStorageById("component", elem.id);
                  } else {
                    saveDataToLocalStorage("component", elem);
                  }
                }}
              >
                {checkIsFavourite(elem.id) ? (
                  <Image
                    width={30}
                    height={30}
                    src={heartRed}
                    alt="heartRed"
                    className={`${styles["heart-hover"]} min-h-[30px] min-w-[30px]`}
                  />
                ) : (
                  <Image
                    width={30}
                    height={30}
                    src={heart}
                    alt="heart"
                    className={`${styles["heart-hover"]} min-h-[30px] min-w-[30px]`}
                  />
                )}
              </button>
              <button
                className="heart-svg-container lg:hidden"
                onClick={() => {
                  setIsFavourite((prev) => !prev);
                  if (isFavourite) {
                    removeDataFromLocalStorageById("component", elem.id);
                  } else {
                    saveDataToLocalStorage("component", elem);
                  }
                }}
              >
                {checkIsFavourite(elem.id) ? (
                  <Image
                    width={23}
                    height={23}
                    src={heartRed}
                    alt="heartRed"
                    className={`${styles["heart-hover"]} min-h-[23px] min-w-[23px]`}
                  />
                ) : (
                  <Image
                    width={23}
                    height={23}
                    src={heart}
                    alt="heart"
                    className={`${styles["heart-hover"]} min-h-[23px] min-w-[23px]`}
                  />
                )}
              </button>
            </div>
            <button
              onClick={(e: any) => {
                e.stopPropagation();
                setIsShowSellers((prev) => !prev);
              }}
              className=" bg-[#0260E8] whitespace-nowrap rounded-[5px] flex items-center text-[white] gap-[9px] max-lg:text-[11px] font-semibold justify-center z-40 max-lg:py-[4.36px] max-lg:px-[9.55px]"
            >
              Посмотреть цены
              <Image
                width={14}
                height={14}
                src={arrow}
                alt="arrow"
                className={`${isShowSellers ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>
        </div>
      </div>
      {isShowSellers && (
        <div className="flex flex-wrap border-b border-solid border-[#9e9e9e20] pb-[18px] mx-auto m-0 w-full">
          <div
            className="flex max-w-[650px] gap-[20px] flex-wrap min-w-full"
            key={uuidv4()}
          >
            {elem?.offers?.slice(0, 6)?.map((e: any, index: number) => {
              return <SellItem elem={elem} e={e} key={index} />;
            })}
          </div>
        </div>
      )}
    </>
  );
});
