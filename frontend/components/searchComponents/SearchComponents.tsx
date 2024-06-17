"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchComponents.module.css";
import close from "../../assets/icons/cross.png";
import settingImg from "../../assets/icons/settingImg.svg";
import { ProductContainer } from "./components/ProductContainer/ProductContainer";
import Image from "next/image";
import FiltersPopUp from "./components/FiltersPopUp/FiltersPopUp";
import MultiRangeSlider from "./components/MultiRangeSlider/MultiRangeSlider";
import searchIcon from "../../assets/icons/search.png";
import menuIconActive from "@/assets/icons/menu-filters-active.svg";
import menuIconDisabled from "@/assets/icons/menu-filters-disabled.svg";
import cx from "classnames";
import cross from "@/assets/icons/cross.svg";

import {
  createLink,
  updateFiltersComponentName,
  useDebounce,
} from "./functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";
import { ActiveFiltersContainer } from "./components/ActiveFiltersContainer/ActiveFiltersContainer";
import { FilterPanel } from "./components/FilterPanel/FilterPanel";
import ky from "ky";
import { useQuery } from "react-query";
import { useRouter, useSearchParams } from "next/navigation";

import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import { useInView } from "react-intersection-observer";
import { HintsComponent } from "../HintsComponent/HintsComponent";
import { changeCurrentIds } from "@/redux/services/compatibleIdForSearchComponentsSlice";

interface Props {
  searchTableName?: any;
  setIsSearchTableOpen?: any;
  isModalWindow: boolean;
}
interface IComponentsList {
  next: string;
}
interface IAdditionalFilters {
  [key: string]: string;
}
export const SearchComponents = memo(function SearchComponents({
  searchTableName = "",
  setIsSearchTableOpen,
  isModalWindow,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [link, setLink] = useState("");
  const [checkboxFilters, setCheckboxFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState<any>([]);
  const [filtersComponentName, setFiltersComponentName] = useState<string>(
    isModalWindow
      ? ""
      : (typeof window !== "undefined" &&
          JSON.parse(String(localStorage.getItem("searchInCatalog")))
            ?.componentTypeSlug) ||
          ""
  );
  const [searchInput, setSearchInput] = useState<any>(
    isModalWindow
      ? ""
      : (typeof window !== "undefined" &&
          JSON.parse(String(localStorage.getItem("searchInCatalog")))
            ?.search) ||
          ""
  );
  // const [data, setData] = useState<any>([]);
  // const [isError, setIsError] = useState(null);
  const [isShowFilterPanel, setIsShowFilterPanel] = useState(false);
  const [isMyLoading, setIsMyLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [additionalSorting, setAdditionalSorting] = useState("ordering=price");
  const [page, setPage] = useState(1);
  const [componentsList, setComponentsList] = useState<IComponentsList[]>([]);
  const [inputIsInFocus, setInputIsInFocus] = useState(false);
  const [hintsArray, setHintsArray] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const hintsRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [defaultCompatible, setDefaultCompatible] = useState(true);
  const [searchOnlyCompatible, setSearchOnlyCompatible] = useState(true);
  const filtersComponentsReducer = useAppSelector(
    (state) => state.filtersComponentsReducer
  );

  const compatibleIds = useAppSelector(
    (state) => state.compatibleIdForSearchComponentsReducer
  );

  const componentsListRef = useRef<any>(null);
  const [
    titleSearchComponentsInLocalStorage,
    setTitleSearchComponentsInLocalStorage,
  ] = useState<string>(
    isModalWindow
      ? ""
      : (typeof window !== "undefined" &&
          JSON.parse(String(localStorage.getItem("searchInCatalog")) || "")
            ?.componentType) ||
          "" ||
          ""
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
  }: { data: any; isLoading: boolean; isError: boolean; refetch: () => void } =
    useQuery("searchComponents", () => getComponents(), {
      keepPreviousData: true,
      enabled: false,
    });

  useEffect(() => {
    createLink(
      filtersComponentsReducer[searchTableName]
        ? filtersComponentsReducer[searchTableName]
        : [],
      setLink
    );
  }, [filtersComponentsReducer[searchTableName]]);

  function getAdditionalyParamsForLink() {
    const newLink =
      link == ""
        ? createLink(
            filtersComponentsReducer[searchTableName]
              ? filtersComponentsReducer[searchTableName]
              : [],
            setLink
          )
        : link;
    const isCompatibleIds = searchOnlyCompatible
      ? compatibleIds.id.length !== 0
        ? "&hideIncompatible=true&compatibleWith=" + compatibleIds.id.join(",")
        : ""
      : "";

    if (isModalWindow) {
      return `?page=${page}${
        searchOnlyCompatible ? isCompatibleIds : ""
      }&componentType=${searchTableName}&${additionalSorting}${
        newLink === "" ? "" : `&${newLink}`
      }${
        searchInput === "" ? "" : `&search=${searchInput || searchInput.name}`
      }`;
    } else {
      return (
        `?page=${page}${
          searchOnlyCompatible ? isCompatibleIds : ""
        }&${additionalSorting}${newLink === "" ? "" : `&${newLink}`}${
          searchInput === "" ? "" : `&search=${searchInput}`
        }` +
        `&componentType=${
          searchTableName
            ? searchTableName
            : titleSearchComponentsInLocalStorage
        }`
      );
    }
  }
  async function getComponents() {
    setIsErrorMessage(false);
    setIsMyLoading(true);

    try {
      const respone = await ky.get(
        `https://techpoisk.com:8443/components/${getAdditionalyParamsForLink()}`
      );
      const data: object = await respone.json();

      // setData(data);
      setComponentsList((prev: any) => [...prev, data]);
      setIsMyLoading(false);

      return data;
    } catch (e: any) {
      console.error(JSON.stringify(e, null, 2));
      setIsErrorMessage(true);
      // setIsError(e);
      setIsMyLoading(false);
      console.log(e, "ERROR IN SEARCH COMPONENTS");
      setTimeout(() => {
        if (e.name === "TimeoutError") refetch();
      }, 2000);
    }
  }

  function handleSearchInputChange(e: any) {
    setSearchInput(e);
  }

  useEffect(() => {
    setComponentsList([]);
    refetch();
  }, [link, additionalSorting, searchOnlyCompatible]);
  useEffect(() => {
    updateFiltersComponentName(searchTableName, setFiltersComponentName);
  }, [searchTableName]);

  useEffect(() => {
    if (page !== 1 && data?.next !== null) {
      getComponents();
    }
  }, [page]);
  useEffect(() => {
    // setTimeout(() => {
    // setIsMyLoading(true);
    setComponentsList([]);
    setPage(1);
    // }, 1000);
  }, [checkboxFilters, priceFilters, additionalSorting, compatibleIds.id]);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (isMyLoading || isLoading) return;

    if (inView === true) {
      setPage((page: number): number => page + 1);
    }
  }, [inView]);
  useEffect(() => {
    if (hintsRef == null) return;
    if (!inputIsInFocus) return;

    const handler = (e: any) => {
      if (!hintsRef.current?.contains(e.target)) {
        setInputIsInFocus(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => removeEventListener("mousedown", handler);
  });

  async function getHintsForSearch(search: string, limit = 10) {
    if (search.length === 0) return;
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/searchHints?search=${search}&limit=${limit}`
      );
      const data = await respone.json();

      setHintsArray(data);

      return data;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getHintsForSearch(searchInput);
  }, [searchInput]);

  const formComponent = (
    <div className="relative">
      <form
        className={`flex items-center py-[10px] px-[9px] gap-[5px] border-solid border-[1px] rounded-[5px] border-[#cdcfd2] justify-between mb-[30px] mt-[9px]`}
        onSubmit={(e) => {
          e.preventDefault();

          if (searchInput !== "") {
            setComponentsList([]);

            setPage(1);
          } else return;
        }}
      >
        <input
          ref={inputSearchRef}
          type="text"
          name="search-components"
          placeholder="Поиск по категории"
          onChange={(e) => {
            handleSearchInputChange(e.target.value);
          }}
          onClick={() => setInputIsInFocus(true)}
          className="outline-none h-[20px] w-full bg-[#F1F6FB]"
        />
        <button type="submit">
          {isLoading || isMyLoading ? (
            <div className={styles["spinner"]} />
          ) : (
            <Image
              src={searchIcon}
              width={20}
              height={20}
              alt={"search image"}
              className="cursor-pointer"
              onClick={() => getComponents()}
            />
          )}
        </button>
      </form>

      {inputIsInFocus && (
        <div
          className="w-full absolute flex items-start flex-col top-[55px] bg-[white] p-[10px] z-[100] rounded-[5px] shadow-2xl"
          ref={hintsRef}
        >
          {hintsArray.map((hint: any, index) => {
            return (
              <button
                className="w-full text-start py-[5px] hover:bg-[#b4d9ff80]"
                key={index}
                onClick={() => {
                  setSearchInput(hint);
                  setInputIsInFocus(false);
                  if (inputSearchRef.current) {
                    inputSearchRef.current.value = hint.name;
                  }
                }}
              >
                {hint.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
  useEffect(() => {
    if (defaultCompatible) {
      const bigObject =
        JSON.parse(String(localStorage.getItem("userCompilation")) || "") || [];
      const allIds = Object.values(bigObject).flatMap((arr: any) =>
        arr.map((obj: any) => obj.id)
      );
      dispatch(changeCurrentIds(allIds));
    } else {
      dispatch(changeCurrentIds([]));
    }
    window.addEventListener("storage", () => {
      if (
        window.location.href.split("/")[3] === "SearchPage" &&
        !isModalWindow
      ) {
        window.location.reload();
      }
    });
  }, []);

  const skeletonComponent = (
    <div className="flex items-center  gap-[5px] pb-[18px]">
      <SkeletonLoading width={97} height={120} />
      <div className="flex flex-col gap-[13px] w-full">
        <SkeletonLoading width={"100%"} height={30} />
        <SkeletonLoading width={"100%"} height={46} />
      </div>

      <div className="flex items-center gap-[27px] max-w-[350px] ">
        <div className="flex flex-col gap-[16px] items-center">
          <SkeletonLoading width={168} height={30} />
          <SkeletonLoading width={200} height={38} />
        </div>
        <div className="flex items-center gap-[20px]">
          <SkeletonLoading width={30} height={30} />

          <SkeletonLoading width={30} height={30} />
        </div>
      </div>
    </div>
  );
  const smallSkeletonComponent = (
    <div className="flex gap-[16px] w-full">
      <SkeletonLoading width={58} height={72} />
      <div className="flex flex-col w-full items-end">
        <div className="w-full flex flex-col gap-[2px] mb-[21px]">
          <SkeletonLoading width={"100%"} height={20} />
          <SkeletonLoading width={"100%"} height={48} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[5px]">
            <SkeletonLoading width={23} height={23} />
            <SkeletonLoading width={23} height={23} />
            <SkeletonLoading width={120} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      // className={styles["container"]}
      className={`
      w-[90%] max-w-[1340px]
      ${!isModalWindow && "mx-auto w-full"}
      relative
      ${isModalWindow && "max-h-[1086px] h-[90%]"} bg-[#F1F6FB] rounded-[5px]
      ${
        isModalWindow && "py-[44px] px-[50px] max-lg:py-[15px] max-lg:px-[15px]"
      } ml-[-2px] flex flex-col`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={`${styles["search-component__title-container"]} mb-[18px]  max-lg:mb-[8px]`}
      >
        <div className="items-center flex">
          <h3 className="text-[32px] max-lg:text-[16px] max-lg:font-normal">
            {filtersComponentName}
          </h3>
          {Number(data?.count) !== 0 && (
            <p className="text-[32px] font-normal max-lg:text-[12px]">
              {data?.count} товаров
            </p>
          )}
        </div>
        {isModalWindow && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
              setIsSearchTableOpen(false);
            }}
          >
            <p>закрыть</p>
            <Image src={close} width={23} height={23} alt="close" />
          </button>
        )}
      </div>
      <div className={`${styles["hzline"]} min-h-[1px] max-lg:mb-[3px]`} />
      <div
        className={`${styles["search-component__body"]} 
        mt-[23px] relative`}
      >
        <div
          className={`${styles["search-components__left-side"]} 
          
          max-lg:hidden

          `}
        >
          <h3>Фильтры</h3>
          <label className={styles["input-container"]}>
            <input
              type="checkbox"
              checked={searchOnlyCompatible}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setSearchOnlyCompatible(true);
                } else {
                  setSearchOnlyCompatible(false);
                }
              }}
            />
            <p className="hover:text-[#0260E8]">Совместимо</p>
          </label>

          <FilterPanel
            searchTableName={
              isModalWindow
                ? searchTableName
                : (typeof window !== "undefined" &&
                    JSON.parse(
                      String(localStorage.getItem("searchInCatalog")) || ""
                    )?.componentType) ||
                  "processor"
            }
            checkboxFilters={checkboxFilters}
            setCheckboxFilters={setCheckboxFilters}
            priceFilters={priceFilters}
            setPriceFilters={setPriceFilters}
            isModalWindow={isModalWindow}
            getComponents={getComponents}
            handleSearchInputChange={handleSearchInputChange}
            setComponentsList={setComponentsList}
            setPage={setPage}
          />
        </div>
        {/* {isShowFilterPanel && ( */}
        <div
          className={`${
            !isShowFilterPanel && "hidden"
          } max-lg:absolute w-full h-full bg-[#00000023] z-[100]`}
          onClick={() => setIsShowFilterPanel(false)}
        >
          <div
            className={`${styles["search-components__left-side"]}  lg:hidden  max-lg:z-[101] max-lg:top-[25px] max-lg:bg-[#F1F6FB] max-lg:max-h-[725px] rounded-[5px] p-[10px] shadow-xl`}
          >
            <button
              className="lg:hidden sticky top-[10px] left-[100%]"
              onClick={() => setIsShowFilterPanel(false)}
            >
              <Image src={cross} height={15} width={15} alt="cross" />
            </button>
            <FilterPanel
              searchTableName={
                isModalWindow
                  ? searchTableName
                  : JSON.parse(String(localStorage.getItem("searchInCatalog")))
                      ?.componentType || "processor"
              }
              checkboxFilters={checkboxFilters}
              setCheckboxFilters={setCheckboxFilters}
              priceFilters={priceFilters}
              setPriceFilters={setPriceFilters}
              isModalWindow={isModalWindow}
              getComponents={getComponents}
              handleSearchInputChange={handleSearchInputChange}
              setComponentsList={setComponentsList}
              setPage={setPage}
            />
          </div>
        </div>
        {/* )} */}
        <div className={styles["components-block"]}>
          {isModalWindow ? (
            <>
              <div className="max-lg:flex max-lg:justify-between max-lg:items-center max-lg:gap-[5px]">
                <button
                  onClick={() => {
                    setIsShowFilterPanel((prev: boolean) => !prev);
                  }}
                  className="lg:hidden flex items-center gap-[4px]"
                >
                  {isShowFilterPanel ? (
                    <Image
                      src={menuIconActive}
                      width={13}
                      height={13}
                      alt="меню"
                    />
                  ) : (
                    <Image
                      src={menuIconDisabled}
                      width={13}
                      height={13}
                      alt="меню"
                    />
                  )}
                  <p>Фильтры</p>
                </button>
                <FiltersContainer setAdditionalSorting={setAdditionalSorting} />
              </div>
              <div className={`${styles["hzline"]} mt-[22px] max-lg:hidden`} />

              <div className={""}>
                <ActiveFiltersContainer
                  checkboxFilters={checkboxFilters}
                  priceFilters={priceFilters}
                  setCheckboxFilters={setCheckboxFilters}
                  setPriceFilters={setPriceFilters}
                  isModalWindow={isModalWindow}
                  searchTableName={searchTableName}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <ActiveFiltersContainer
                  checkboxFilters={checkboxFilters}
                  priceFilters={priceFilters}
                  setCheckboxFilters={setCheckboxFilters}
                  setPriceFilters={setPriceFilters}
                  isModalWindow={isModalWindow}
                />
              </div>
              <div className={"flex justify-between items-center"}>
                <button
                  onClick={() => {
                    setIsShowFilterPanel((prev: boolean) => !prev);
                  }}
                  className="lg:hidden flex items-center gap-[4px]"
                >
                  {isShowFilterPanel ? (
                    <Image
                      src={menuIconActive}
                      width={13}
                      height={13}
                      alt="меню"
                    />
                  ) : (
                    <Image
                      src={menuIconDisabled}
                      width={13}
                      height={13}
                      alt="меню"
                    />
                  )}
                  <p>Фильтры</p>
                </button>
                <FiltersContainer setAdditionalSorting={setAdditionalSorting} />
              </div>
              <div className={`${styles["hzline"]} mt-[22px] mb-[19px]`} />
            </>
          )}
          {isModalWindow && formComponent}

          <div
            ref={componentsListRef}
            className={`flex flex-col gap-[23px] overflow-auto 
          
            `}
          >
            {componentsList &&
              componentsList.map((productDataByPage, id) => {
                return (
                  <ProductContainer
                    key={id}
                    data={productDataByPage}
                    searchTableName={searchTableName}
                    setPage={setPage}
                    isLoading={isLoading}
                    isMyLoading={isMyLoading}
                    isModalWindow={isModalWindow}
                  />
                );
              })}
            {(!isLoading || !isMyLoading) &&
              componentsList[componentsList.length - 1]?.next && (
                <div ref={ref} className="w-full min-h-[20px]" />
              )}
            <div className="lg:hidden">
              {(isLoading || isMyLoading) && smallSkeletonComponent}
            </div>
            <div className="max-lg:hidden">
              {(isLoading || isMyLoading) && skeletonComponent}
            </div>
            {(isError || isErrorMessage) && <p>Ничего не найдено</p>}
          </div>
        </div>
      </div>
    </div>
  );
});
