"use client";
import React, { useEffect, useRef, useState } from "react";

import { FavoriteAssemblingComponent } from "./components/FavoriteAssemblingComponent/FavoriteAssemblingComponent";
import styles from "./styles.module.css";
import FavoritePageFilterComponent from "./components/FavoritePageFilterComponent/FavoritePageFilterComponent";
import { userComponentsListState } from "@/redux/services/userComponentsListSlice";

interface IOffers {
  id: number;
  price: number;
}

interface IData {
  id: number;
  componentType: string;
  isCompatible: boolean;
  name: string;
  offers: IOffers[];
  pictures: [];
  propertyCategories: [];
}
type Props = { data: IData };
// function getDataFromLocalStorage(category: string) {
//   let existingData = localStorage.getItem(category);

//   if (existingData === null) {
//     return [];
//   }

//   return JSON.parse(existingData);
// }
export default function Page() {
  /*
  
  dataComponent - массив с отдельными компонентами
  dataAssembly - массив со сборками, у них нет id, только поля
  isCheckAssembly - булевое значение в верхней части сайта, оно показывает только сборки
  isCheckComponents - булевое значение в верхней части сайта, оно показывает только отдельные компоненты
  isSelectedAllItems - выберает все элементы в избранном
  additionalSorting - дополнительная сортировка, например сортировать по названию или цене, сейчас не работает только old
  selectedData - в этот массив добавляются элементы у которых прожат чекбокс, чекбокс selectAllItems прожимает все чекбоксы через ref и добавляет все эелементы в selectedData и наоборот
  на данный момент все хранится в localStorage, когда бэк реализует профили и тд, то тогда все будет по человеческмм через сервер

  */
  const [dataComponent, setDataComponent] = useState<IData[] | []>( //Избранные отдельные компоненты
    typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("component")) || "") || []
      : []
  );
  const [dataAssembly, setDataAssembly] = useState<
    //Избранные сборки пк
    userComponentsListState[] | []
  >(
    typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("compilation")) || "") || []
      : []
  );
  const [isCheckAssembly, setIsCheckAssembly] = useState<any>(true);
  const [isCheckComponents, setIsCheckComponents] = useState(true);
  const [isSelectedAllItems, setIsSelectedAllItems] = useState(false);
  const [additionalSorting, setAdditionalSorting] = useState("cheap");

  const [selectedData, setSelectedData] = useState<any>([]);

  const ref = useRef<any>(null);

  function selectAllCheckboxes(value: boolean) {
    if (ref.current) {
      ref.current.querySelectorAll('input[type="checkbox"]') &&
        Array.from(ref.current.querySelectorAll('input[type="checkbox"]')).map(
          (input: any) => {
            input.checked = value;
          }
        );
    }
  }

  function selectAllItems() {
    if (isSelectedAllItems) {
      setSelectedData([...dataComponent, ...dataAssembly]);
      selectAllCheckboxes(true);
    } else {
      setSelectedData([]);
      selectAllCheckboxes(false);
    }
  }

  useEffect(() => {
    selectAllItems();
  }, [isSelectedAllItems]);
  useEffect(() => {
    if (typeof window !== "undefined") return;
    localStorage.setItem("compilation", JSON.stringify(dataAssembly));
  }, [dataAssembly]);

  // Функция для сортировки по возрастанию цены
  function sortByPriceAsc(products: IData[]) {
    return products
      .slice()
      .sort(
        (a, b) =>
          Math.min(...a.offers.map((offer) => offer.price)) -
          Math.min(...b.offers.map((offer) => offer.price))
      );
  }

  // Функция для сортировки по убыванию цены
  function sortByPriceDesc(products: IData[]) {
    return products
      .slice()
      .sort(
        (a, b) =>
          Math.max(...b.offers.map((offer) => offer.price)) -
          Math.max(...a.offers.map((offer) => offer.price))
      );
  }

  // Функция для сортировки по названию (А-Я)
  function sortByNameAsc(products: IData[]) {
    return products.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  function sortedArray(array: IData[], additionalSorting: string) {
    if (array.length === 0) return array;
    if (additionalSorting === "old") return array;
    switch (additionalSorting) {
      case "name":
        return sortByNameAsc(array);

      case "expensive":
        return sortByPriceDesc(array);

      case "cheap":
        return sortByPriceAsc(array);
    }
  }
  const handleComponentsChange = () => {
    setIsCheckComponents((prev: boolean) => !prev);
  };

  const handleAssemblyChange = () => {
    setIsCheckAssembly((prev: boolean) => !prev);
  };
  function formattingCountOfPositions(): string {
    const totalLengthOfFavoriteItems =
      (dataAssembly?.length || 0) + (dataComponent?.length || 0);
    let word = "позиция";

    if (
      totalLengthOfFavoriteItems % 10 === 1 &&
      totalLengthOfFavoriteItems % 100 !== 11
    ) {
      word = "позиция";
    } else if (
      totalLengthOfFavoriteItems % 10 >= 2 &&
      totalLengthOfFavoriteItems % 10 <= 4 &&
      (totalLengthOfFavoriteItems % 100 < 10 ||
        totalLengthOfFavoriteItems % 100 >= 20)
    ) {
      word = "позиции";
    } else {
      word = "позиций";
    }

    return `${totalLengthOfFavoriteItems} ${word}`;
  }
  return (
    <div className="pb-[59px]">
      {/* <div className="w-full h-[1px] mt-[20px] mb-[29px] bg-[#c0d7f9]" /> */}

      <div className="flex gap-[50px] max-lg:flex-col max-lg:gap-[0px]">
        <div>
          <div className="flex gap-[5px] items-center mb-[20px]">
            <h2 className="font-bold text-[32px]">Избранное</h2>
            <p className="text-[32px] text-[#BABABA]">
              {/* {formattingCountOfPositions()} */}
              {`(${
                (dataAssembly ? dataAssembly.length : 0) +
                (dataComponent ? dataComponent.length : 0)
              })`}
            </p>
          </div>
          <p className="text-[black] text-[20px] font-bold mb-[14px]">
            Показать
          </p>
          <label className="flex items-center mb-[15px] max-lg:mb-[7px] max-lg:hidden">
            <input
              type="checkbox"
              name="assemblings"
              className="mr-[4px]"
              checked={isCheckAssembly}
              onChange={handleAssemblyChange}
            />
            <p className="text-[20px] cursor-pointer">Сборки</p>
          </label>
          <label className="flex items-center max-lg:hidden">
            <input
              type="checkbox"
              name="assemblings"
              className="mr-[4px]"
              checked={isCheckComponents}
              onChange={handleComponentsChange}
            />
            <p className="text-[20px] cursor-pointer">Комплектующие</p>
          </label>
        </div>
        <div className="mt-[60px] max-lg:mt-[7px]">
          <FavoritePageFilterComponent
            isCheckAssembly={isCheckAssembly}
            setIsCheckAssembly={setIsCheckAssembly}
            isCheckComponents={isCheckComponents}
            setIsCheckComponents={setIsCheckComponents}
            isSelectedAllItems={isSelectedAllItems}
            setIsSelectedAllItems={setIsSelectedAllItems}
            setDataComponent={setDataComponent}
            setDataAssembly={setDataAssembly}
            selectedData={selectedData}
            dataComponent={dataComponent}
            dataAssembly={dataAssembly}
            additionalSorting={additionalSorting}
            setAdditionalSorting={setAdditionalSorting}
            selectAllItems={selectAllItems}
            setSelectedData={setSelectedData}
          />
          {/* <div className="w-full h-[1px] mt-[24px] mb-[30px] bg-[#98b5e0] max-lg:hidden" /> */}
          <div ref={ref}>
            {isCheckComponents &&
              dataComponent &&
              sortedArray(dataComponent, additionalSorting)!.map(
                (elem: IData) => {
                  return (
                    <FavoriteAssemblingComponent
                      key={elem.id}
                      isAssembly={false}
                      data={elem}
                      setData={setDataComponent}
                      setSelectedData={setSelectedData}
                      selectedData={selectedData}
                      isSelectedAllItems={isSelectedAllItems}
                      setIsSelectedAllItems={setIsSelectedAllItems}
                    />
                  );
                }
              )}
            {isCheckAssembly &&
              dataAssembly &&
              dataAssembly?.map((elem: any, index) => {
                return (
                  <FavoriteAssemblingComponent
                    isAssembly={true}
                    key={index}
                    assemblyIndex={index}
                    data={elem}
                    setData={setDataAssembly}
                    setSelectedData={setSelectedData}
                    selectedData={selectedData}
                    isSelectedAllItems={isSelectedAllItems}
                    setIsSelectedAllItems={setIsSelectedAllItems}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
