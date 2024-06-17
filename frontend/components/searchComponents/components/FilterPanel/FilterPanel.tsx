"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  minPriceFilters: string;
  setMinPriceFilters: any;
  maxPriceFilters: string;
  setMaxPriceFilters: any;
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
  minPriceFilters,
  setMinPriceFilters,
  maxPriceFilters,
  setMaxPriceFilters,
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

  const divRef = useRef<HTMLDivElement | null>(null);
  const updateCheckboxes = useCallback(() => {
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
  }, [divRef, checkboxFilters]);
  useEffect(() => {
    updateCheckboxes();
  }, [checkboxFilters]);

  const findFiltersId = useCallback((searchTableName: string) => {
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
  }, []);

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
        )}/?hideNonFilterProps=true&showValues=always&showCount=true`
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

  return (
    <div ref={divRef}>
      {isModalWindow &&
        searchTableName === "cooler,liquid_cooling,case_fans" && (
          <div className="mb-[29px]">
            <FilterRowContainer
              element={[{ value: "cooler" }]}
              elemContainerName={"componentType"}
              searchTableName={searchTableName}
            />
            <FilterRowContainer
              element={[{ value: "liquid_cooling" }]}
              elemContainerName={"componentType"}
              searchTableName={searchTableName}
            />
          </div>
        )}
      {isModalWindow && searchTableName === "hdd,ssd" && (
        <div className="mb-[29px]">
          <FilterRowContainer
            element={[{ value: "hdd" }]}
            elemContainerName={"componentType"}
            searchTableName={searchTableName}
          />
          <FilterRowContainer
            element={[{ value: "ssd" }]}
            elemContainerName={"componentType"}
            searchTableName={searchTableName}
          />
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
              onChange={(e: any) => {
                setMinPriceFilters(e.target.value);
              }}
            />
          </div>
          <div>
            <p>До</p>
            <input
              type="text"
              placeholder={"0"}
              onChange={(e: any) => {
                setMaxPriceFilters(e.target.value);
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
                  // getDefaultCheckedState={getDefaultCheckedState}
                  // handleCheckboxChange={handleCheckboxChange}
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
