"use client";

import Image from "next/image";
import styles from "./ConfiguratorTableRow.module.css";

import addComponentPlus from "../../../../assets/icons/add-component-plus.svg";
import changeArrows from "../../../../assets/icons/change-arrows.svg";
import deleteComponentCross from "../../../../assets/icons/delete-component-cross.svg";
import { useAppDispatch } from "@/redux/hooks";
import { removeComponent } from "@/redux/services/userComponentsListSlice";
import cx from "classnames";
import Link from "next/link";
import settingImg from "@/assets/icons/settingImg.svg";
import { useState, useEffect } from "react";
import leftRightArrow from "@/assets/icons/left-right-arrow.svg";

interface Props {
  componentData: object;
  userComponentsList: object;
  setIsSearchTableOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTableName: React.Dispatch<React.SetStateAction<string>>;
  setUserComponentsList: any;
}

const componentsListWordForms = {
  case: "корпусом",
  case_fun: "охлаждением",
  cooler: "кулером",
  gpu: "видеокартой",
  hdd: "hdd",
  ssd: "ssd",
  motherboard: "материнской платой",
  processor: "процессором",
  liquid_cooling: "водным охлаждением",
  power_supply: "блоком питания",
  ram: "оперативной памятью",
};

export function ConfiguratorTableRow({
  allCountComponentsList,
  componentData,
  userComponentsList,
  setIsSearchTableOpen,
  setSearchTableName,
  setUserComponentsList,
  checkCompatibility,
}: any) {
  const dispatch = useAppDispatch();
  const [multiplyComponents, setMultiplyComponents] = useState<any>([]);
  const [componentIncompatibleWith, setComponentIncompatibleWith] =
    useState<any>([]);
  const [allCountComponents, setAllCountComponents] = useState(0);
  const [incompatibleComponentsNamesById, setIncompatibleComponentsNamesById] =
    useState<any>(new Map());
  const removeComponentHandler = (componentData: any) => {
    dispatch(
      removeComponent<any>({
        component: componentData,
        store: componentData.offers[0].store.name,
      })
    );
    const userCompilation = String(
      JSON.parse(String(localStorage.getItem("userCompilation")) || "")
    );
    setUserComponentsList(userCompilation);
  };

  useEffect(() => {
    let totalCount = 0;
    if (
      componentData.id === "hdd" ||
      componentData.id === "ssd" ||
      componentData.id === "cooler" ||
      componentData.id === "liquid_cooling" ||
      componentData.id === "case_fans"
    ) {
      totalCount = allCountComponentsList.reduce(
        (
          acc: number,
          component: { componentType_Slug: string; count: number }
        ) => {
          if (componentData.title === "Хранение данных") {
            if (
              component.componentType_Slug === "hdd" ||
              component.componentType_Slug === "ssd"
            ) {
              return acc + component.count;
            }
          } else if (componentData.title === "Охлаждение") {
            if (
              component.componentType_Slug === "cooler" ||
              component.componentType_Slug === "liquid_cooling" ||
              component.componentType_Slug === "case_fans"
            ) {
              return acc + component.count;
            }
          }
        },
        0
      );
    } else {
      totalCount = allCountComponentsList.find(
        (component: { componentType_Slug: string; count: number }) => {
          return componentData.id.includes(component.componentType_Slug);
        }
      )?.count;
    }
    setAllCountComponents(totalCount);
  }, [allCountComponentsList]);

  useEffect(() => {
    if (
      !(
        userComponentsList?.cooler?.length ||
        userComponentsList?.case_fans?.length ||
        userComponentsList?.liquid_cooling?.length ||
        userComponentsList?.hdd?.length ||
        userComponentsList?.ssd?.length
      )
    ) {
      setMultiplyComponents([]);
    }
    if (
      (userComponentsList?.cooler?.length ||
        userComponentsList?.case_fans?.length ||
        userComponentsList?.liquid_cooling?.length) &&
      componentData.id === "cooler,liquid_cooling,case_fans"
    ) {
      setMultiplyComponents([
        ...userComponentsList?.cooler,
        ...userComponentsList?.case_fans,
        ...userComponentsList?.liquid_cooling,
      ]);
    }
    if (
      (userComponentsList?.hdd?.length || userComponentsList?.ssd?.length) &&
      componentData.id === "hdd,ssd"
    ) {
      setMultiplyComponents([
        ...userComponentsList?.hdd,
        ...userComponentsList?.ssd,
      ]);
    }
  }, [userComponentsList]);

  useEffect(() => {
    const componentIncompatibleWith: any = [];
    const incompatibleComponentsNamesById: any = {};
    checkCompatibility?.incompatible?.map((pare: any) => {
      if (multiplyComponents.length) {
        const isHddOrSsd = userComponentsList[componentData.id] === "hdd,ssd";
        const isCooling =
          userComponentsList[componentData.id] ===
            userComponentsList?.cooler?.length ||
          userComponentsList[componentData.id] ===
            userComponentsList?.case_fans?.length ||
          userComponentsList[componentData.id] ===
            userComponentsList?.liquid_cooling?.length;
      } else {
        Object.keys(userComponentsList).map((category) => {
          if (userComponentsList[category].length === 0) {
            return;
          } else if (
            userComponentsList[category].length === 1 &&
            userComponentsList[category][0].id === pare[1]
          ) {
            incompatibleComponentsNamesById[category] =
              userComponentsList[category][0].id;
          } else {
            userComponentsList[category].map((component: any) => {
              if (component.id === pare[1]) {
                incompatibleComponentsNamesById[category] = component.id;
              }
            });
          }
        });
        userComponentsList[componentData.id]?.map((component: any) => {
          if (pare[0] === component.id) {
            componentIncompatibleWith.push(pare[1]);
          }
          return [pare[0], component.componentType];
        });
      }
    });
    setComponentIncompatibleWith(componentIncompatibleWith);
    setIncompatibleComponentsNamesById(incompatibleComponentsNamesById);
  }, [checkCompatibility]);

  return (
    <>
      {(userComponentsList[componentData.id]?.length === 0 ||
        userComponentsList[componentData.id]?.length === undefined) &&
      multiplyComponents.length < 1 ? (
        <button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (
              userComponentsList[componentData.id]?.length == 0 ||
              userComponentsList[componentData.id]?.length === undefined
            ) {
              setIsSearchTableOpen(true);
              setSearchTableName(componentData.id);
            }
          }}
          id={componentData.id}
          className={styles["row"]}
        >
          <div className={styles["row-title-container"]}>
            <h2 className={styles["row-title"]}>{componentData.title}</h2>
          </div>
          <div className={styles["row-product-container"]}>
            {/* <Image
              className={styles["row-product-image"]}
              src={componentData.iconSrc}
              alt="icon"
              width={30}
              height={30}
            /> */}
            <div className={styles["row-product-adding-part"]}>
              <p className={styles["row-product-count-text"]}>
                {allCountComponents} товара(ов)
              </p>
            </div>
            <svg
              className={styles["plus"]}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9H17"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 1L9 17"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>
      ) : multiplyComponents.length > 0 ? (
        <>
          <div
            id={componentData.id}
            className={cx(styles["row"], styles["with-component"])}
          >
            <div className={styles["row-title-container"]}>
              <h2 className={styles["row-title"]}>{componentData.title}</h2>
            </div>
            <div className={styles["row-component-array"]}>
              {multiplyComponents.map((component: any, id: any) => {
                return (
                  <div
                    className={cx(
                      styles["row-product-container"],
                      styles["row-product-array-element-container"]
                    )}
                    key={id}
                  >
                    <Image
                      className={styles["row-product-image"]}
                      src={
                        component.pictures[0]?.url
                          ? component.pictures[0].url
                          : settingImg
                      }
                      alt="icon"
                      width={70}
                      height={70}
                    />

                    <div className={styles["row-product-right-part"]}>
                      <div className={styles["row-product-info-part"]}>
                        <Link href={`/productCard/${component.id}`}>
                          <div className={styles["info-part-description"]}>
                            <p className={styles["info-part-description-name"]}>
                              {component.name}
                            </p>
                            <p className={styles["info-part-description-text"]}>
                              {" "}
                              {component.propertyCategories[0].properties.map(
                                (property: { value: string }) =>
                                  `${property.value}, `
                              )}
                            </p>
                          </div>
                        </Link>
                        <div className={styles["info-part-price"]}>
                          <p className={styles["row-product-price-text"]}>
                            {component.offers[0].price.toLocaleString()}₽
                          </p>
                          <p className={styles["row-product-store-name"]}>
                            {component.offers[0].store.name}{" "}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className={styles["row-product-adding-part"]}>
                          {/* <Link
                            className={styles["change-component-img"]}
                            href={`/productCard/${component.id}`}
                          >
                            
                          </Link> */}

                          {componentData.id === "gpu" ||
                          componentData.id === "ram" ||
                          componentData.id === "cooler" ||
                          componentData.id === "hdd" ||
                          componentData.id === "ssd" ||
                          componentData.id === "case_fans" ||
                          componentData.id === "liquid_cooling" ||
                          componentData.id.includes("cooler") ? (
                            <button
                              onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setIsSearchTableOpen(true);
                                setSearchTableName(componentData.id);
                              }}
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 43 43"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill="currentColor"
                                  className={styles["add-component-img"]}
                                  d="M21.5009 8.95923L21.5009 34.0409"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  fill="currentColor"
                                  d="M8.95925 21.4993L34.0409 21.4993"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setIsSearchTableOpen(true);
                                setSearchTableName(componentData.id);
                              }}
                            >
                              <Image width={24} src={changeArrows} alt="img" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              removeComponentHandler(component);
                            }}
                          >
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 34 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="currentColor"
                                d="M7.08472 7.08325L26.9167 26.9153"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fill="currentColor"
                                d="M7.08344 26.9153L26.9154 7.08325"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            id={componentData.id}
            className={cx(styles["row"], styles["with-component"])}
          >
            <div className={styles["row-title-container"]}>
              <h2 className={styles["row-title"]}>{componentData.title}</h2>
              {componentIncompatibleWith.length ? (
                <div className={styles["notify-incompatible-container"]}>
                  <div className={styles["notify-incompatible-text-container"]}>
                    <p className={styles["notify-incompatible-text"]}>
                      Несовместимо{" "}
                    </p>
                    {componentIncompatibleWith?.map(
                      (componentId: any, index: any) => {
                        const incompatibleComponent = Object.keys(
                          incompatibleComponentsNamesById
                        ).find((key) => {
                          if (
                            incompatibleComponentsNamesById[key] === componentId
                          ) {
                            return key;
                          }
                        });

                        return (
                          <p
                            className={styles["notify-incompatible-text"]}
                            key={index}
                          >
                            {/* @ts-ignore: Unreachable code error */}c{" "}
                            {componentsListWordForms[incompatibleComponent]}
                          </p>
                        );
                      }
                    )}
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.8418 28.6538L12.3462 14.1581C11.8509 13.6629 11.8509 12.8414 12.3462 12.3462C12.8414 11.8509 13.6628 11.8509 14.1581 12.3462L28.6538 26.8419C29.1491 27.3371 29.1491 28.1585 28.6538 28.6538C28.1585 29.1491 27.3371 29.1491 26.8418 28.6538Z"
                      fill="#FF5252"
                    />
                    <path
                      d="M12.3462 28.6538C11.8509 28.1585 11.8509 27.3371 12.3462 26.8419L26.8419 12.3462C27.3372 11.8509 28.1586 11.8509 28.6538 12.3462C29.1491 12.8414 29.1491 13.6629 28.6538 14.1581L14.1582 28.6538C13.6629 29.1491 12.8415 29.1491 12.3462 28.6538Z"
                      fill="#FF5252"
                    />
                  </svg>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles["row-component-array"]}>
              {userComponentsList[componentData.id].map(
                (component: any, id: any) => {
                  return (
                    <div
                      className={cx(
                        styles["row-product-container"],
                        styles["row-product-array-element-container"]
                      )}
                      key={id}
                    >
                      <Image
                        className={styles["row-product-image"]}
                        src={
                          component.pictures[0]?.url
                            ? component.pictures[0].url
                            : settingImg
                        }
                        alt="icon"
                        width={70}
                        height={70}
                      />

                      <div className={styles["row-product-right-part"]}>
                        <div className={styles["row-product-info-part"]}>
                          <Link href={`/productCard/${component.id}`}>
                            <div className={styles["info-part-description"]}>
                              <p
                                className={styles["info-part-description-name"]}
                              >
                                {component.name}
                              </p>
                              <p
                                className={styles["info-part-description-text"]}
                              >
                                {" "}
                                {component.propertyCategories[0].properties.map(
                                  (property: { value: string }) =>
                                    `${property.value}, `
                                )}
                              </p>
                            </div>
                          </Link>
                          <div className={styles["info-part-price"]}>
                            <p className={styles["row-product-price-text"]}>
                              {component.offers[0].price.toLocaleString()}₽
                            </p>
                            <p className={styles["row-product-store-name"]}>
                              {component.offers[0].store.name}{" "}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className={styles["row-product-adding-part"]}>
                            {componentData.id === "gpu" ||
                            componentData.id === "ram" ||
                            componentData.id === "cooler" ||
                            componentData.id === "hdd" ||
                            componentData.id === "ssd" ||
                            componentData.id === "case_fans" ||
                            componentData.id === "liquid_cooling" ? (
                              <button
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                  setIsSearchTableOpen(true);
                                  setSearchTableName(componentData.id);
                                }}
                              >
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 43 43"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill="currentColor"
                                    className={styles["add-component-img"]}
                                    d="M21.5009 8.95923L21.5009 34.0409"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M8.95925 21.4993L34.0409 21.4993"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                  setIsSearchTableOpen(true);
                                  setSearchTableName(componentData.id);
                                }}
                              >
                                <Image
                                  width={24}
                                  src={changeArrows}
                                  alt="img"
                                />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                removeComponentHandler(component);
                              }}
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 34 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill="currentColor"
                                  d="M7.08472 7.08325L26.9167 26.9153"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  fill="currentColor"
                                  d="M7.08344 26.9153L26.9154 7.08325"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {/* <Image
                                src={leftRightArrow}
                                alt="left-right-arrow"
                                width={24}
                                height={24}
                              /> */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}
