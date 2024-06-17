"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import arrowDownIcon from "../../../../assets/icons/arrow-down.svg";
import { FiltersContainer } from "../FilterContainer/FilterContainer";
type Props = {
  isCheckAssembly: boolean;
  setIsCheckAssembly: React.Dispatch<React.SetStateAction<any>>;
  isCheckComponents: boolean;
  setIsCheckComponents: React.Dispatch<React.SetStateAction<any>>;
  isSelectedAllItems: boolean;
  setIsSelectedAllItems: React.Dispatch<React.SetStateAction<any>>;
  setDataComponent: React.Dispatch<React.SetStateAction<any>>;
  setDataAssembly: React.Dispatch<React.SetStateAction<any>>;
  selectedData: any;
  dataComponent: any;
  dataAssembly: any;
  additionalSorting: string;
  setAdditionalSorting: any;
  selectAllItems: () => void;
  setSelectedData: any;
};
export default function FavoritePageFilterComponent({
  isCheckAssembly,
  setIsCheckAssembly,
  isCheckComponents,
  setIsCheckComponents,
  isSelectedAllItems,
  setIsSelectedAllItems,
  setDataComponent,
  setDataAssembly,
  selectedData,
  dataComponent,
  dataAssembly,
  additionalSorting,
  setAdditionalSorting,
  selectAllItems,
  setSelectedData,
}: Props) {
  const handleComponentsChange = () => {
    setIsCheckComponents((prev: boolean) => !prev);
  };

  const handleAssemblyChange = () => {
    setIsCheckAssembly((prev: boolean) => !prev);
  };
  const handleAllItemsChange = (event: any) => {
    if (event.target.checked) {
      setIsSelectedAllItems(true);
      // selectAllItems();
    } else {
      setIsSelectedAllItems(false);
      // selectAllItems();
    }
  };
  function deleteSelectedData(selectedData: any) {
    selectedData.map((e: any) => {
      if (e.id !== undefined) {
        setDataComponent((prev: any) => {
          return prev.filter((obj: any, index: number) => {
            return obj.id !== e.id;
          });
        });
        let existingData =
          JSON.parse(String(localStorage.getItem("component"))) || [];
        existingData = existingData.filter(
          (item: { id: number }) => item.id !== e.id
        );
        localStorage.setItem("component", JSON.stringify(existingData));
      } else {
        const newDataAssembly = dataAssembly.filter(
          (item1: any) => JSON.stringify(item1) !== JSON.stringify(e)
        );
        localStorage.setItem("compilation", JSON.stringify(newDataAssembly));
        setDataAssembly(newDataAssembly);
      }
    });
    setSelectedData([]);
  }

  return (
    <>
      <div className={`max-lg:hidden`}>
        <div className="flex gap-[10px] items-center justify-between">
          <div className="flex gap-[37px] items-center">
            <label className="flex items-center ">
              <input
                type="checkbox"
                name="assemblings"
                className="mr-[8px]"
                // checked={isSelectedAllItems}
                onChange={handleAllItemsChange}
              />
              <p className="text-[20px] text-[#9E9E9E]  cursor-pointer">
                Выбрать все
              </p>
            </label>
            <button
              className={`text-[17px] text-[#BABABA] ${
                selectedData.length === 0
                  ? "text-[#BABABA] hover:text-[#BABABA] pointer-events-none"
                  : "text-[#000] hover:text-[#0260E8] "
              }`}
              disabled={selectedData.length !== 0}
            >
              Оформить заказ
            </button>
            <button
              className={`text-[17px] text-[#BABABA] 
                ${
                  selectedData.length === 0
                    ? "text-[#BABABA] hover:text-[#BABABA] pointer-events-none"
                    : "text-[#000] hover:text-[#0260E8] "
                }
              `}
              disabled={selectedData.length !== 0}
            >
              Добавить в конфигуратор
            </button>
            <button
              className={`text-[17px] text-[#F38383] ${
                selectedData.length === 0
                  ? "text-[#F38383] hover:text-[#F38383] pointer-events-none"
                  : "text-[#FF5252] hover:text-[#FF5252] "
              }`}
              onClick={() => {
                deleteSelectedData(selectedData);
              }}
              title={"Удалить всё"}
              disabled={selectedData.length === 0}
            >
              Удалить
            </button>
          </div>

          <FiltersContainer setAdditionalSorting={setAdditionalSorting} />
        </div>
      </div>
      <div className={`lg:hidden`}>
        <div className={`flex justify-between gap-[15px]`}>
          <div className={`flex flex-col gap-[7px] items-start`}>
            <p className="text-[#BABABA] text-[20px] max-lg:hidden">
              Показать:
            </p>
            <label className="flex items-center select-none">
              <input
                type="checkbox"
                name="assemblings"
                className="mr-[8px]"
                checked={isCheckAssembly}
                onChange={handleAssemblyChange}
              />
              <p className="text-[20px] font-medium ">Сборки</p>
            </label>
            <label className="flex items-center select-none">
              <input
                type="checkbox"
                name="assemblings"
                className="mr-[8px]"
                checked={isCheckComponents}
                onChange={handleComponentsChange}
              />
              <p className="text-[20px] font-medium ">Комплектующие</p>
            </label>
          </div>
          <div className={`flex flex-col justify-between items-end gap-[7px]`}>
            <button
              className={`text-[17px] max-lg:text-[14px] text-[#BABABA] ${
                selectedData.length === 0
                  ? "text-[#BABABA] hover:text-[#BABABA] pointer-events-none"
                  : "text-[#000] hover:text-[#0260E8] "
              }  text-end`}
              disabled={selectedData.length !== 0}
            >
              Оформить заказ
            </button>
            <button
              className={`text-[17px] max-lg:text-[14px] text-[#BABABA] 
                ${
                  selectedData.length === 0
                    ? "text-[#BABABA] hover:text-[#BABABA] pointer-events-none"
                    : "text-[#000] hover:text-[#0260E8] "
                }
                text-end
              `}
              disabled={selectedData.length !== 0}
            >
              Добавить в конфигуратор
            </button>
            <button
              className={`text-[17px] max-lg:text-[14px] text-[#F38383] ${
                selectedData.length === 0
                  ? "text-[#F38383] hover:text-[#F38383] pointer-events-none"
                  : "text-[#FF5252] hover:text-[#FF5252] "
              }  text-end`}
              onClick={() => {
                deleteSelectedData(selectedData);
              }}
              title={"Удалить всё"}
              disabled={selectedData.length === 0}
            >
              Удалить
            </button>
          </div>
        </div>

        <div
          className={`flex justify-between border-t border-[#C8CACD] mt-[8px] pt-[6px] max`}
        >
          <label className="flex items-center ">
            <input
              type="checkbox"
              name="assemblings"
              className="mr-[8px]"
              // checked={isSelectedAllItems}
              onChange={handleAllItemsChange}
            />
            <p className="text-[20px] font-medium ">Все товары</p>
          </label>
          <FiltersContainer setAdditionalSorting={setAdditionalSorting} />
        </div>
      </div>
    </>
  );
}
