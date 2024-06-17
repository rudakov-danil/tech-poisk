"use client";
import styles from "./style.module.css";
import { PriceBlock } from "./components/PriceBlock/PriceBlock";
import { SelectImage } from "./components/SelectImage/SelectImage";
import { Specifications } from "./components/Specifications/Specifications";
import { useQuery } from "react-query";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CommonDescription } from "./components/Descriptions/CommonDescription";
import settingImg from "../../../assets/images/testImage.png";
import Image from "next/image";
import arrow from "@/assets/icons/arrow-down.svg";
import { OffersComponent } from "./components/OffersComponent/OffersComponent";

interface IStore {
  id: number;
  name: string;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
}

interface IOffer {
  price: number;
  store: IStore;
}

interface IData {
  id: number;
  detail: string | null;
  properties: {
    [key: string]: boolean;
  };
  offers: IOffer[];
  componentType: string;
  name: string;
  manufacturer: string | null;
}

interface IDescriptionBlock {
  [key: string]: any;
  case_fan: JSX.Element;
  motherboard: JSX.Element;
  processor: JSX.Element;
  graphicsCard: JSX.Element;
  ram: JSX.Element;
  cooler: JSX.Element;
  liquidCooling: JSX.Element;
  case: JSX.Element;
  hdd: JSX.Element;
  ssd: JSX.Element;
  ssdm2: JSX.Element;
  power_supply: JSX.Element;
}
interface IUseQuery {
  data: any;
  isLoading: boolean;
  isError: ReactNode;
}
export default function ProductCard() {
  const params = usePathname();

  const digits = params?.split("/")[2];

  const [isShowDescription, setIsShowDescription] = useState(true);
  const [shortDescriptionData, setShortDescriptionData] = useState<any>({});
  const { data, isLoading, isError }: IUseQuery = useQuery(
    "productData",
    getProductData
  );
  const [offersLimit, setOffersLimit] = useState(false);

  async function getProductData() {
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/components/${digits}/`
      );
      const data = await respone.json();

      return data;
    } catch (e) {
      console.error(e);
    }
  }
  async function getShortDescrition() {
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/components/${digits}?hide_non_short_props=true`
      );
      const data = await respone.json();

      setShortDescriptionData(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getProductData();
    getShortDescrition();
  }, []);

  return (
    <>
      {isLoading && <h2>Загрузка...</h2>}
      {isError && <h2>Возникла ошибка: {isError}</h2>}
      {!isLoading && (
        <>
          <div className="max-lg:hidden">
            <h1 className="text-[28px]">{data?.name}</h1>
            <div className={styles.container}>
              <div className={styles.container}>
                {" "}
                {data?.pictures && <SelectImage pictures={data?.pictures} />}
                {shortDescriptionData?.propertyCategories?.properties && (
                  <Specifications
                    property={
                      shortDescriptionData?.propertyCategories?.properties
                    }
                  />
                )}
              </div>
              {data?.offers && data && (
                <PriceBlock offers={data?.offers} data={data} />
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <div className={"flex flex-col items-center"}>
              {data?.pictures && <SelectImage pictures={data?.pictures} />}
              <h1 className={"text-[20px] mt-[19px] mb-[11px]"}>
                {data?.name}
              </h1>

              {data?.offers && data && (
                <PriceBlock offers={data?.offers} data={data} />
              )}
              <div className="w-full h-[1px] bg-[#C8CACD] my-[11px]" />
              {data?.propertyCategories && (
                <Specifications property={data?.propertyCategories} />
              )}
            </div>
          </div>
          <h2 className={`${styles["title"]} mt-[10px] mb-[20px]`}>
            Характеристики
          </h2>
          <div className="flex items-center gap-[14px] lg:hidden">
            <button
              onClick={() => {
                setIsShowDescription((prev) => !prev);
              }}
              className="self-baseline flex items-center gap-[5px] bg-[#F1F6FB] rounded-[5px] px-[5px] py-[8px] text-[12px]"
            >
              Полные характеристики
              <Image
                src={arrow}
                alt="arrowDown"
                width={12}
                height={12}
                className={`${isShowDescription && "rotate-180"}`}
              />
            </button>
            <button
              onClick={() => {
                setOffersLimit((prev) => !prev);
              }}
              className={`self-baseline flex items-center gap-[5px] bg-[#F1F6FB] rounded-[5px] px-[5px] py-[8px] text-[12px] ${
                data?.offers?.length === 2 && "hidden"
              }`}
            >
              Все магазины
              <Image
                src={arrow}
                alt="arrowDown"
                width={12}
                height={12}
                className={`${offersLimit && "rotate-180"}`}
              />
            </button>
          </div>
          {isShowDescription && <CommonDescription data={data} />}
          {data?.detail && <h2>{data.detail}</h2>}

          <h2 className="mt-[50px] text-[28px] font-bold max-lg:hidden">
            Цены на {data?.name}
          </h2>
          <div className="w-full border-t-2 border-[#dde1e7] mt-[3px] mb-[20px] max-lg:hidden" />
          <OffersComponent
            data={data}
            offersLimit={offersLimit}
            setOffersLimit={setOffersLimit}
          />
        </>
      )}
    </>
  );
}
