"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import FiltersPopUp from "../FiltersPopUp/FiltersPopUp";
import searchIcon from "@/assets/icons/search.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import ky from "ky";
import { FilterRowContainer } from "../FilterRowContainer/FilterRowContainer";
import SkeletonLoading from "@/components/SkeletonLoading/SkeletonLoading";
import Image from "next/image";
import cross from "@/assets/icons/cross.svg";
import tick from "@/assets/icons/galochka-white.png";
import { useAppDispatch } from "@/redux/hooks";
import { changeCurrentIds } from "@/redux/services/compatibleIdForSearchComponentsSlice";

// import { v4 as uuidv4 } from "uuid";
interface IFilterPanel {
  searchTableName: string;
  getComponents: any;
  handleSearchInputChange: any;
  checkboxFilters: any;
  setCheckboxFilters: any;
  priceFilters: any;
  setPriceFilters: any;
  isModalWindow: boolean;
  setComponentsList: any;
  setPage: any;
}
interface Props {
  handleCheckboxChange: (
    container: string,
    filterName: string,
    checked: boolean
  ) => void;
  setPriceFilters: ({}) => void;
  checkboxFilters: { [key: string]: string[] };
}

// interface IFilterArr {
//   id: number;
//   name: string;
//   propertyCategories: [
//     {
//       id: number;
//       name: string;
//       properties: [
//         {
//           id: number;
//           name: string;
//           slug: string;
//         }
//       ];
//     }
//   ];
// }

interface Property {
  id: number;
  name: string;
  slug: string;
}

interface PropertyCategoryies {
  id: number;
  name: string;
  properties: Property[];
}

interface IFilterArr {
  id: number;
  name: string;
  propertyCategories: PropertyCategoryies[];
}

export const FilterPanel = memo(function FilterPanel({
  searchTableName = "processor",
  checkboxFilters,
  setCheckboxFilters,
  priceFilters,
  setPriceFilters,
  isModalWindow,
  getComponents,
  handleSearchInputChange,
  setComponentsList,
  setPage,
}: IFilterPanel) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterArr, setFilterArr] = useState<any | null>(null);
  const [filterId, setFilterId] = useState<number>(0);

  const addFilterCheckbox = (
    containerName: string,
    filterName: string,
    checked: boolean
  ) => {
    //////////////////// это часть кода нужна для того, чтобы уберать значение search в local storage searchInCatalog, для того чтобы при изменении фильтров, в запрос не вставало то что было в инпуте, иначе всё ломается
    const prevLSData =
      JSON.parse(String(localStorage.getItem("searchInCatalog")) || "") || {};

    const componentTypeSlug = prevLSData.componentTypeSlug;
    const componentType = prevLSData.componentType;
    localStorage.setItem(
      "searchInCatalog",
      JSON.stringify({
        componentTypeSlug: componentTypeSlug,
        componentType: componentType,
        search: "",
      })
    );
    ///////////////////
    setCheckboxFilters((prevFilters: any) => {
      const updatedFilters: { [key: string]: string[] } = { ...prevFilters };

      if (checked) {
        if (Object.keys(updatedFilters).includes(containerName)) {
          updatedFilters[containerName].push(filterName);
        } else {
          updatedFilters[containerName] = [filterName];
        }
      } else {
        if (Object.keys(updatedFilters).length !== 0) {
          const index = updatedFilters[containerName].indexOf(filterName);

          updatedFilters[containerName].splice(index, 1);
          if (updatedFilters[containerName].length === 0) {
            delete updatedFilters[containerName];
          }
        }
      }

      return updatedFilters;
    });
  };

  const handleCheckboxChange = (
    container: string,
    filterName: string,
    checked: boolean
  ) => {
    addFilterCheckbox(container, filterName, checked);
  };

  function getDefaultCheckedState(containerName: string, filterName: string) {
    if (checkboxFilters[containerName]?.includes(filterName)) {
      return true;
    }
    return false;
  }
  const divRef = useRef<HTMLDivElement | null>(null);
  function updateCheckboxes() {
    if (divRef.current !== null) {
      Array.from(divRef.current.querySelectorAll("input")).forEach((input) => {
        if (
          checkboxFilters[input.name]?.includes(input.attributes[0].nodeValue)
        ) {
          input.checked = true;
        } else {
          input.checked = false;
        }
      });
    }
  }
  useEffect(() => {
    updateCheckboxes();
  }, [checkboxFilters]);

  function findFiltersId(searchTableName: string) {
    const ids: { [key: string]: number | number[] } = {
      motherboard: 1,
      processor: 2,
      ram: 3,
      "hdd,ssd": [4, 5],
      hdd: 4,
      ssd: 5,
      gpu: 6,
      power_supply: 7,
      case: 8,
      "cooler,liquid_cooling,case_fans": [9, 10, 11],
      cooler: [9, 10, 11],
      liquid_cooling: [9, 10, 11],
      case_fans: [9, 10, 11],
    };

    return ids[searchTableName];
  }

  // const [data, setData] = useState<IFilterArr | null>(null);
  const [isMyLoading, setIsMyLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    "filters",
    () => fetchFilters(),
    { keepPreviousData: true, enabled: false }
  );

  async function fetchFilters() {
    // setIsError(false);
    setIsMyLoading(true);
    try {
      const respone = await ky.get(
        `https://techpoisk.com:8443/componentTypes/${findFiltersId(
          searchTableName ||
            JSON.parse(String(localStorage.getItem("searchInCatalog")) || "")
              .componentType ||
            ""
        )}/?hideNonFilterProps=true&showValues=always`
      );
      const data: IFilterArr | any = await respone.json();

      setFilterArr(data.propertyCategories);
      setIsMyLoading(false);
      // setData(data);

      return data;
    } catch (err: any) {
      if (err.name === "TimeoutError") {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
      console.log(err, "FILTER PANEL ERRORS");
      // setIsError(true);
      setIsMyLoading(false);
    }
  }
  useEffect(() => {
    refetch();
  }, []);
  // В инпутах, важно чтобы был id с названием фильтра, и name который указывает на то, где искать этот фильтр в массиве и нужно ли его обновить.
  // инпуты minPrice и maxPrice не всчет, так как там не чекбоксы
  // const dispatch = useAppDispatch();
  return (
    <div ref={divRef}>
      {isModalWindow && searchTableName === "cooler" && (
        <div className="mb-[29px]">
          <label className={styles["input-container"]}>
            <input
              type="checkbox"
              data-filtername="cooler"
              name="componentType"
              defaultChecked={getDefaultCheckedState("componentType", "cooler")}
              onClick={(e: any) => {
                if (e.target.checked) !e.target.checked;
                handleCheckboxChange(
                  e.target.name,
                  e.target.attributes[0].nodeValue,
                  e.target.checked
                );
              }}
            />
            <p className="hover:text-[#0260E8]">Кулеры для процессора</p>
          </label>
          <label className={styles["input-container"]}>
            <input
              type="checkbox"
              data-filtername="liquid_cooling"
              name="componentType"
              defaultChecked={getDefaultCheckedState(
                "componentType",
                "liquid_cooling"
              )}
              onClick={(e: any) => {
                if (e.target.checked) !e.target.checked;

                handleCheckboxChange(
                  e.target.name,
                  e.target.attributes[0].nodeValue,
                  e.target.checked
                );
              }}
            />
            <p className="hover:text-[#0260E8]">
              Система жидкостного охлаждения (СЖО)
            </p>
          </label>
        </div>
      )}

      <FiltersPopUp title={"Цена"}>
        <div className={styles["price-blocks-container"]}>
          <div>
            <p>От</p>
            <input
              type="text"
              name="minPrice"
              placeholder={"0"}
              defaultValue={
                searchParams.get("minPrice")?.length !== 0
                  ? searchParams.get("minPrice") || ""
                  : "0"
              }
              onChange={(e: any) => {
                setPriceFilters((prevFilters: any) => {
                  const updatedFilters = { ...prevFilters };

                  if (e.target.value === "") {
                    delete updatedFilters["minPrice"];
                  } else {
                    updatedFilters.minPrice = e.target.value * 100;
                  }

                  return updatedFilters;
                });
              }}
            />
          </div>
          <div>
            <p>До</p>
            <input
              type="text"
              placeholder={"0"}
              defaultValue={
                (searchParams.get("maxPrice")?.length !== 0 &&
                  searchParams.get("maxPrice")) ||
                ""
              }
              onChange={(e: any) => {
                setPriceFilters((prevFilters: any) => {
                  const updatedFilters = { ...prevFilters };
                  if (e.target.value === "") {
                    delete updatedFilters["maxPrice"];
                  } else {
                    updatedFilters.maxPrice = e.target.value * 100;
                  }

                  return updatedFilters;
                });
              }}
            />
          </div>
        </div>

        {/* <MultiRangeSlider min={valueFrom} max={valueTo} /> */}
      </FiltersPopUp>
      {isError && <p>Не удалось подключить фильтры</p>}

      {data?.map((elem: any) => {
        return elem.propertyCategories?.map((e: any) => {
          // if (e.length === 0) return <p>Пусто</p>;
          return e?.properties?.map((elem: any) => {
            return (
              <FiltersPopUp title={elem.name} key={elem.id}>
                <FilterRowContainer
                  getDefaultCheckedState={getDefaultCheckedState}
                  handleCheckboxChange={handleCheckboxChange}
                  element={elem.values}
                  elemContainerName={elem.slug}
                  searchTableName={searchTableName}
                />
              </FiltersPopUp>
            );
          });
        });
      })}
      {(isLoading || isMyLoading) && (
        <div className="flex flex-col gap-[5px]">
          <div className="flex gap-[5px] items-center mb-[14px]">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={142} height={25} />
          </div>
          <div className="flex gap-[5px] items-center mb-[5px]">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={72} height={25} />
          </div>
          <div className="flex gap-[5px] items-center">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={72} height={25} />
          </div>
          <div className="flex gap-[5px] items-center mb-[14px] mt-[29px]">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={142} height={25} />
          </div>
          <div className="flex gap-[5px] items-center mb-[5px]">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={72} height={25} />
          </div>
          <div className="flex gap-[5px] items-center">
            <SkeletonLoading width={16} height={16} />
            <SkeletonLoading width={72} height={25} />
          </div>
        </div>
      )}
    </div>
  );
});
