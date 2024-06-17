"use client";
import React, { memo, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import setting from "../../../../assets/icons/setting.svg";
import cross2 from "../../../../assets/icons/cross2.svg";
import settingImg from "../../../../assets/icons/settingImg.svg";
import corpus from "../../../../assets/icons/corpus.svg";
import cx from "classnames";
import { SellItem } from "@/components/searchComponents/components/SellItem/SellItem";
import arrow from "@/assets/icons/arrow-down-white.svg";
import graph from "@/assets/icons/graph-gray.png";
import redHeard from "@/assets/icons/heart-red.svg";
import sendAssemblyIcon from "@/assets/icons/sendAssemblyIcon.svg";
import settingGray from "@/assets/icons/setting-2.svg";
import { BuyingComponentsModal } from "@/components/configuratorTable/components/BuyingComponentsModal";
interface IProperties {
  id: number;
  isFilter: boolean;
  name: string;
  slug: string;
  value: string;
}
interface IPictures {
  id: number;
  componentId: number;
  height: number;
  width: number;
  url: string;
}
interface IPropertyCategories {
  id: number;
  name: string;
  properties: IProperties[];
}
interface IData {
  id: number;
  componentType: string;
  isCompatible: boolean;
  name: string;
  offers: [];
  pictures: IPictures[];
  propertyCategories: IPropertyCategories[];
}
type Props = {
  data: IData | any;
  setData: any;
  isAssembly: boolean;
  assemblyIndex?: number;
  setSelectedData: any;
  selectedData: any;
  isSelectedAllItems: any;
  setIsSelectedAllItems: any;
};
function findMinAndMaxPrice(array: any): string {
  if (!array || array.length === 0) {
    return "";
  }

  const sortedPrices = array
    .map((obj: any) => obj.price)
    .sort((a: number, b: number) => a - b);

  if (sortedPrices[0] === sortedPrices[sortedPrices.length - 1]) {
    return `${sortedPrices[0]}₽`;
  } else {
    return `${sortedPrices[0]}₽ - ${sortedPrices[sortedPrices.length - 1]}₽`;
  }
}

function removeDataFromLocalStorageById(category: string, idToDelete: number) {
  let existingData = JSON.parse(String(localStorage.getItem(category))) || [];
  existingData = existingData.filter(
    (item: { id: number }) => item.id !== idToDelete
  );
  localStorage.setItem(category, JSON.stringify(existingData));
}

export const FavoriteAssemblingComponent = memo(
  function FavoriteAssemblingComponent({
    data,
    setData,
    isAssembly,
    assemblyIndex = 0,
    setSelectedData,
  }: Props) {
    const [isShowSellers, setIsShowSellers] = useState(false);
    const [showBuyingComponentsModal, setShowBuyingComponentsModal] =
      useState(false);
    const [buyModalData, setBuyModalData] = useState<any>([]);
    const deleteObjectById = (idToDelete: number) => {
      setData((prevData: any) =>
        prevData.filter((obj: IData) => obj.id !== idToDelete)
      );
    };
    const deleteAssemblyById = (idToDelete: number) => {
      setData((prevData: any) => {
        localStorage.setItem(
          "compilation",
          JSON.stringify(
            prevData.filter((obj: any, index: number) => {
              return index !== idToDelete;
            })
          )
        );
        prevData.filter((obj: any, index: number) => {
          return index !== idToDelete;
        });
      });
    };

    const userCompliationPrice =
      isAssembly &&
      Object.keys(data).reduce((acc, category) => {
        if (data[category].length === 0) {
          return acc;
        } else if (data[category].length === 1) {
          return acc + data[category][0]?.offers[0]?.price;
        } else {
          return (
            acc +
            data[category].reduce((acc: any, component: any) => {
              return acc + component.offers[0].price;
            }, 0)
          );
        }
      }, 0);

    useEffect(() => {
      isAssembly &&
        Object.values(data).map((elem: any) => {
          if (elem.length !== 0) {
            elem.map((e: any) => {
              setBuyModalData((prev: any) => [
                ...prev,
                {
                  name: e.name,
                  buyLink: e.offers[0].buyLink,
                  pictures: e.pictures[0].url,
                  description: e.propertyCategories[0].properties,
                },
              ]);
            });
          }
        });
    }, []);
    return (
      <>
        <div className="flex justify-between items-center border-b border-solid border-[#0260E825] max-lg:border-t: max-lg:border-[#C8CACD] py-6 max-lg:flex-col">
          {showBuyingComponentsModal && (
            <BuyingComponentsModal
              buyModalData={buyModalData}
              setShowBuyModal={setShowBuyingComponentsModal}
            />
          )}

          <div className="flex items-center max-lg:w-full max-lg:justify-between  gap-[37px] max-lg:gap-[16px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="assembling"
                className={`${styles["checkbox-style"]} mr-[55px] max-lg:mr-[12px] `}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    //если чекбокс прожат
                    setSelectedData((prev: any) => [...prev, data]);
                  } else {
                    //Если чекбокс не прожат
                    // if (data.id !== undefined) { // тут если отдельный компонент, проверка на наличие id для того чтобы отличать сборки от отдельных комплектующих, ведь у сборок нет id в объекте, id только у комплектующих из которых состоит сборка
                    //По сути тут идет удаление элемента из массива с выбранными данными
                    setSelectedData((prevData: any) =>
                      prevData.filter((obj: any, index: number) => {
                        return obj.id !== data.id;
                      })
                    );
                  }
                }}
              />
              {!isAssembly ? (
                <Image
                  src={
                    data.pictures[0]?.url ? data.pictures[0].url : settingImg
                  }
                  width={117}
                  height={117}
                  alt={"picture"}
                  className="max-lg:w-[58px] max-lg:h-[72px]"
                />
              ) : (
                <Image
                  src={
                    data?.case?.length !== 0 &&
                    data.case[0].pictures &&
                    data.case[0].pictures[0]?.url
                      ? data.case[0].pictures[0].url
                      : corpus
                  }
                  width={117}
                  height={117}
                  alt={"picture"}
                  className="max-lg:w-[58px] max-lg:h-[72px]"
                />
              )}
            </div>

            <div className={`${styles["description-container"]}`}>
              <div className={`${styles["description"]} max-lg:max-w-[252px]`}>
                <h2
                  className={`lg:text-[22px] max-lg:text-[16px] lg:mb-[7px] max-lg:mb-[2px]`}
                >
                  {!isAssembly ? data.name : `Сборка ${assemblyIndex + 1}`}
                </h2>
                <div className="flex items-center gap-[5px] flex-wrap max-w-[450px]">
                  {!isAssembly ? (
                    data.propertyCategories[0].properties?.map((prop: any) => {
                      return (
                        <p
                          key={prop.id}
                          className="break-all lg:text-[15px] max-lg:text-[13px]"
                        >
                          {prop.slug === "turbo_clock"
                            ? `Turbo: ${prop.value}`
                            : prop.value}
                        </p>
                      );
                    })
                  ) : (
                    <div>
                      {/* Проходим по каждому полю объекта и проверяем наличие массива properties */}
                      {Object.keys(data).map((key) => {
                        const element = data[key];
                        if (element.length !== 0) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-[5px] flex-wrap w-full"
                            >
                              {element.map((e: any) => {
                                return e.propertyCategories[0]?.properties.map(
                                  (propertie: any) => {
                                    return (
                                      <p
                                        key={propertie.id}
                                        className="break-all lg:text-[15px] max-lg:text-[13px]"
                                      >
                                        {propertie.value}
                                      </p>
                                    );
                                  }
                                );
                              })}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[9px] items-center max-lg:w-full max-lg:justify-between max-lg:mt-[19px]">
            <div className="flex flex-col items-center gap-[16px]">
              <p
                className={`${styles["price"]} text-[22px] max-lg:text-[18px] max-lg:mr-[21px] max-lg:ml-[30px]`}
              >
                {!isAssembly
                  ? findMinAndMaxPrice(data.offers)
                  : `${userCompliationPrice}₽`}
              </p>
              <button
                className={`items-center gap-[9px] max-w-[200px] w-full py-[7px] px-[19px] rounded-[20px] bg-[#0260E8] text-[white] flex justify-center`}
                onClick={() => {
                  !isAssembly && setIsShowSellers((prev) => !prev);
                  isAssembly && setShowBuyingComponentsModal((prev) => !prev);
                }}
              >
                <p className={`max-lg:hidden`}>
                  {!isAssembly ? "Цены" : "Купить"}
                </p>
                <p className={`lg:hidden`}>
                  {!isAssembly ? "Посмотреть цены" : "Купить"}
                </p>
                {!isAssembly && (
                  <Image
                    src={arrow}
                    width={14}
                    height={14}
                    alt={"arrow-down-white"}
                    className="lg:hidden"
                  />
                )}
              </button>
            </div>
            <div className={`flex gap-[9px] max-lg:gap-[5px] flex-row-reverse`}>
              {/* <button
                className={cx(styles["button"], styles["setting-button"])}
              >
                <Image src={setting} width={35} height={35} alt={"settings"} />
              </button> */}
              {/* <button
                className={cx(styles["heart-button"], styles["button"])}
                onClick={() => {
                  if (!isAssembly) {
                    removeDataFromLocalStorageById("component", data.id);
                    deleteObjectById(data.id);
                  } else {
                    deleteAssemblyById(assemblyIndex);
                  }
                }}
              >
                <Image
                  src={cross2}
                  width={35}
                  height={35}
                  alt={"settings"}
                  title={"Удалить из избранного"}
                />
              </button> */}
              <button className={``}>
                <Image
                  src={redHeard}
                  width={30}
                  height={30}
                  alt={"settings"}
                  title={"Удалить из избранного"}
                  onClick={() => {
                    if (!isAssembly) {
                      removeDataFromLocalStorageById("component", data.id);
                      deleteObjectById(data.id);
                    } else {
                      deleteAssemblyById(assemblyIndex);
                    }
                  }}
                />
              </button>
              {/* <button
                className={`${cx(styles["button"], styles["graph-button"])}`}
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25 14.9584C5.91848 14.9584 5.60054 15.0897 5.36612 15.3235C5.1317 15.5573 5 15.8744 5 16.205V26.1773C5 26.5079 5.1317 26.8249 5.36612 27.0587C5.60054 27.2925 5.91848 27.4238 6.25 27.4238C6.58152 27.4238 6.89946 27.2925 7.13388 27.0587C7.3683 26.8249 7.5 26.5079 7.5 26.1773V16.205C7.5 15.8744 7.3683 15.5573 7.13388 15.3235C6.89946 15.0897 6.58152 14.9584 6.25 14.9584ZM12.5 2.49304C12.1685 2.49304 11.8505 2.62437 11.6161 2.85814C11.3817 3.09192 11.25 3.40898 11.25 3.73958V26.1773C11.25 26.5079 11.3817 26.8249 11.6161 27.0587C11.8505 27.2925 12.1685 27.4238 12.5 27.4238C12.8315 27.4238 13.1495 27.2925 13.3839 27.0587C13.6183 26.8249 13.75 26.5079 13.75 26.1773V3.73958C13.75 3.40898 13.6183 3.09192 13.3839 2.85814C13.1495 2.62437 12.8315 2.49304 12.5 2.49304ZM25 19.9446C24.6685 19.9446 24.3505 20.0759 24.1161 20.3097C23.8817 20.5434 23.75 20.8605 23.75 21.1911V26.1773C23.75 26.5079 23.8817 26.8249 24.1161 27.0587C24.3505 27.2925 24.6685 27.4238 25 27.4238C25.3315 27.4238 25.6495 27.2925 25.8839 27.0587C26.1183 26.8249 26.25 26.5079 26.25 26.1773V21.1911C26.25 20.8605 26.1183 20.5434 25.8839 20.3097C25.6495 20.0759 25.3315 19.9446 25 19.9446ZM18.75 9.97227C18.4185 9.97227 18.1005 10.1036 17.8661 10.3374C17.6317 10.5711 17.5 10.8882 17.5 11.2188V26.1773C17.5 26.5079 17.6317 26.8249 17.8661 27.0587C18.1005 27.2925 18.4185 27.4238 18.75 27.4238C19.0815 27.4238 19.3995 27.2925 19.6339 27.0587C19.8683 26.8249 20 26.5079 20 26.1773V11.2188C20 10.8882 19.8683 10.5711 19.6339 10.3374C19.3995 10.1036 19.0815 9.97227 18.75 9.97227Z"
                    fill="white"
                  />
                </svg>
              </button> */}
              <button className="">
                <Image src={graph} alt="graph" width={30} height={30} />
              </button>
              {/* <button className="lg:hidden">
                <Image src={graph} alt="graph" width={23} height={23} />
              </button> */}
              {/* <button
                className={cx(styles["heart-button"], styles["button"])}
                onClick={() => {
                  if (!isAssembly) {
                    removeDataFromLocalStorageById("component", data.id);
                    deleteObjectById(data.id);
                  } else {
                    deleteAssemblyById(assemblyIndex);
                  }
                }}
              >
                <Image
                  src={cross2}
                  width={35}
                  height={35}
                  alt={"settings"}
                  title={"Удалить из избранного"}
                />
              </button> */}
              <button>
                <Image
                  src={sendAssemblyIcon}
                  width={30}
                  height={30}
                  alt={"settings"}
                />
              </button>
            </div>
          </div>
        </div>
        {isShowSellers && (
          <div className="flex flex-wrap border-b border-solid border-[#9e9e9e20] pb-[18px] mx-auto m-0 w-full">
            <div
              className="flex max-w-[650px] gap-[20px] flex-wrap min-w-full"
              // key={uuidv4()}
            >
              {data?.offers?.slice(0, 6)?.map((e: any, index: number) => {
                return <SellItem elem={data} e={e} key={index} />;
              })}
            </div>
          </div>
        )}
      </>
    );
  }
);
