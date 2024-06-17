"use client";

import Image from "next/image";
import styles from "./ConfiguratorTable.module.css";

import motherIcon from "../../assets/icons/mother.svg";
import processorIcon from "../../assets/icons/processor.svg";
import videoCardIcon from "../../assets/icons/video-card.svg";
import ramIcon from "../../assets/icons/ram.svg";
import coolingIcon from "../../assets/icons/cooling.svg";
import corpusIcon from "../../assets/icons/corpus.svg";
import memoryIcon from "../../assets/icons/memory.svg";
import powerIcon from "../../assets/icons/power.svg";
import comparisonBlackIcon from "@/assets/icons/comparison-black-icon.svg";

import favouritesLight from "../../assets/icons/favourites-light.svg";
import comparisonLight from "../../assets/icons/comparison-light.svg";
import { useEffect, useState } from "react";
import { SearchComponents } from "../searchComponents/SearchComponents";
import { useAppSelector } from "@/redux/hooks";
import { ConfiguratorTableRow } from "./components/configuratorTableRow/ConfiguratorTableRow";
import blackHeart from "@/assets/icons/black-heart.svg";
import Link from "next/link";
import { BuyingComponentsModal } from "./components/BuyingComponentsModal";
import { useRouter } from "next/navigation";

interface IComponentsRowDataList {
  id: string;
  title: string;
  iconSrc: string;
}

interface IBuyModalData {
  buyLink: string;
  name: string;
}

export function ConfiguratorTable() {
  const userComponents = useAppSelector(
    (state) => state.userComponentsListReducer
  );
  const componentsRowDataList: IComponentsRowDataList[] = [
    { id: "motherboard", title: "Материнская плата", iconSrc: motherIcon },
    { id: "processor", title: "Процессор", iconSrc: processorIcon },
    { id: "gpu", title: "Видеокарта", iconSrc: videoCardIcon },
    { id: "ram", title: "Оперативная память", iconSrc: ramIcon },
    {
      id: "cooler,liquid_cooling,case_fans",
      title: "Охлаждение",
      iconSrc: coolingIcon,
    },
    { id: "case", title: "Корпус", iconSrc: corpusIcon },
    { id: "hdd,ssd", title: "Хранение данных", iconSrc: memoryIcon },
    { id: "power_supply", title: "Блок питания", iconSrc: powerIcon },
  ];
  const [isSearchTableOpen, setIsSearchTableOpen] = useState(false);
  const [searchTableName, setSearchTableName] = useState("");
  const [userComponentsList, setUserComponentsList] = useState(userComponents);
  const [checkCompatibility, setCheckCompatibility] = useState([]);
  const [buyModalData, setBuyModalData] = useState<IBuyModalData[]>([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [allCountComponentsList, setAllCountComponents] = useState<
    { componentType_Slug: string; count: number }[]
  >([]);
  const [userCompliationPrice, setUserCompliationPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://techpoisk.com:8443/componentTypeCount/`)
      .then((response) => response.json())
      .then((data) => setAllCountComponents(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const componentsIds: any = [];
    Object.keys(userComponentsList).map((category) => {
      if (userComponentsList[category].length === 0) {
        return;
      } else if (userComponentsList[category].length === 1) {
        componentsIds.push(userComponentsList[category][0].id);
      } else {
        userComponentsList[category].map((acc: any, component: any) => {
          componentsIds.push(component.id);
        });
      }
    });

    fetch(
      `https://techpoisk.com:8443/checkCompatibility/?ids=${componentsIds.join(
        ","
      )}`
    )
      .then((response) => response.json())
      .then((data) => setCheckCompatibility(data))
      .catch((e) => console.log(e));
  }, [userComponentsList]);

  const buyCompilationHandler = () => {
    if (showBuyModal) {
      setBuyModalData([]);
      setShowBuyModal(false);
    } else {
      setShowBuyModal(true);

      Object.keys(userComponentsList).map((category) => {
        if (userComponentsList[category].length === 0) {
          return;
        } else {
          userComponentsList[category]?.map((component: any) => {
            setBuyModalData((prev: IBuyModalData[]) => {
              localStorage.setItem(
                "buyComponentsData",
                JSON.stringify([
                  ...prev,
                  {
                    name: component.name,
                    buyLink: component.offers[0].buyLink,
                    pictures: component.pictures[0].url,
                    description: component.propertyCategories[0].properties,
                  },
                ])
              );

              return [
                ...prev,
                {
                  name: component.name,
                  buyLink: component.offers[0].buyLink,
                  pictures: component.pictures[0].url,
                  description: component.propertyCategories[0].properties,
                },
              ];
            });
          });
          // localStorage.setItem(
          //   "buyComponentsData",
          //   JSON.stringify(buyModalData)
          // );
        }
      });
    }
  };
  useEffect(() => {
    const userCompilation = JSON.parse(
      String(localStorage.getItem("userCompilation"))
    );
    if (userCompilation === null) {
      return;
    }
    setUserComponentsList(userCompilation);
  }, [userComponents]);

  useEffect(() => {
    if (userComponentsList === "[object Object]") return;
    const newPrice = Object.keys(userComponentsList).reduce((acc, category) => {
      if (userComponentsList[category].length === 0) {
        return acc;
      } else if (userComponentsList[category].length === 1) {
        return acc + userComponentsList[category][0]?.offers[0]?.price;
      } else {
        return (
          acc +
          userComponentsList[category].reduce((acc: any, component: any) => {
            return acc + component.offers[0].price;
          }, 0)
        );
      }
    }, 0);
    setUserCompliationPrice(newPrice);
  }, [userComponentsList]);

  function addToFavouriteHandler() {
    const compilation = JSON.parse(String(localStorage.getItem("compilation")));

    if (compilation === null) {
      localStorage.setItem("compilation", JSON.stringify([userComponentsList]));
    } else {
      localStorage.setItem(
        "compilation",
        JSON.stringify([userComponentsList, ...compilation])
      );
    }
  }

  function handleAddCompilationToComparison() {
    const comparisonStorage = JSON.parse(
      String(localStorage.getItem("comparison"))
    );

    if (comparisonStorage === null) {
      localStorage.setItem(
        "comparison",
        JSON.stringify({
          compilationsList: [userComponentsList],
          componentsList: [],
        })
      );
    } else {
      localStorage.setItem(
        "comparison",
        JSON.stringify({
          compilationsList: [
            ...comparisonStorage.compilationsList,
            userComponentsList,
          ],
          componentsList: [...comparisonStorage.componentsList],
        })
      );
    }
  }
  return (
    <>
      {showBuyModal && (
        <BuyingComponentsModal
          buyModalData={buyModalData}
          setShowBuyModal={setShowBuyModal}
        />
      )}
      <div className={styles["configurator-table-container"]}>
        <div className="flex justify-between items-center">
          <h2 className={styles["main-title"]}>Системный блок</h2>
          <div className="lg:hidden flex gap-[16px]">
            <button
              className={styles["control-panel-button"]}
              onClick={() => {
                addToFavouriteHandler(); //
              }}
            >
              {/* <Image src={blackHeart} alt="icon" /> */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.2003 6.23296C23.8753 4.90815 22.1189 4.09956 20.2483 3.95325C18.3777 3.80695 16.5163 4.33257 15.0003 5.43517C13.4099 4.2555 11.4303 3.72058 9.46024 3.93813C7.49016 4.15568 5.67589 5.10955 4.38281 6.60765C3.08973 8.10575 2.41387 10.0368 2.49135 12.0119C2.56882 13.9871 3.39387 15.8596 4.80034 17.2523L12.5628 25.0058C13.2129 25.6438 14.0883 26.0013 15.0003 26.0013C15.9124 26.0013 16.7878 25.6438 17.4378 25.0058L25.2003 17.2523C26.6598 15.788 27.479 13.8073 27.479 11.7427C27.479 9.67805 26.6598 7.69731 25.2003 6.23296ZM23.4378 15.5321L15.6753 23.2731C15.587 23.3621 15.4819 23.4327 15.366 23.4809C15.2502 23.529 15.1259 23.5539 15.0003 23.5539C14.8748 23.5539 14.7505 23.529 14.6347 23.4809C14.5188 23.4327 14.4137 23.3621 14.3253 23.2731L6.56284 15.4947C5.58254 14.4954 5.03361 13.1531 5.03361 11.7551C5.03361 10.3572 5.58254 9.0148 6.56284 8.01551C7.56179 7.03197 8.90906 6.48048 10.3128 6.48048C11.7166 6.48048 13.0639 7.03197 14.0628 8.01551C14.179 8.13234 14.3173 8.22508 14.4696 8.28836C14.6219 8.35165 14.7853 8.38423 14.9503 8.38423C15.1154 8.38423 15.2787 8.35165 15.4311 8.28836C15.5834 8.22508 15.7216 8.13234 15.8378 8.01551C16.8368 7.03197 18.1841 6.48048 19.5878 6.48048C20.9916 6.48048 22.3389 7.03197 23.3378 8.01551C24.3316 9.0017 24.8986 10.3368 24.9173 11.7348C24.936 13.1328 24.4049 14.4825 23.4378 15.4947V15.5321Z"
                  fill="black"
                />
              </svg>
            </button>
            <button
              onClick={handleAddCompilationToComparison}
              className={styles["control-panel-button"]}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.25 14.9585C5.91848 14.9585 5.60054 15.0899 5.36612 15.3236C5.1317 15.5574 5 15.8745 5 16.2051V26.1774C5 26.508 5.1317 26.825 5.36612 27.0588C5.60054 27.2926 5.91848 27.4239 6.25 27.4239C6.58152 27.4239 6.89946 27.2926 7.13388 27.0588C7.3683 26.825 7.5 26.508 7.5 26.1774V16.2051C7.5 15.8745 7.3683 15.5574 7.13388 15.3236C6.89946 15.0899 6.58152 14.9585 6.25 14.9585ZM12.5 2.49316C12.1685 2.49316 11.8505 2.6245 11.6161 2.85827C11.3817 3.09204 11.25 3.4091 11.25 3.7397V26.1774C11.25 26.508 11.3817 26.825 11.6161 27.0588C11.8505 27.2926 12.1685 27.4239 12.5 27.4239C12.8315 27.4239 13.1495 27.2926 13.3839 27.0588C13.6183 26.825 13.75 26.508 13.75 26.1774V3.7397C13.75 3.4091 13.6183 3.09204 13.3839 2.85827C13.1495 2.6245 12.8315 2.49316 12.5 2.49316ZM25 19.9447C24.6685 19.9447 24.3505 20.076 24.1161 20.3098C23.8817 20.5436 23.75 20.8606 23.75 21.1912V26.1774C23.75 26.508 23.8817 26.825 24.1161 27.0588C24.3505 27.2926 24.6685 27.4239 25 27.4239C25.3315 27.4239 25.6495 27.2926 25.8839 27.0588C26.1183 26.825 26.25 26.508 26.25 26.1774V21.1912C26.25 20.8606 26.1183 20.5436 25.8839 20.3098C25.6495 20.076 25.3315 19.9447 25 19.9447ZM18.75 9.97239C18.4185 9.97239 18.1005 10.1037 17.8661 10.3375C17.6317 10.5713 17.5 10.8883 17.5 11.2189V26.1774C17.5 26.508 17.6317 26.825 17.8661 27.0588C18.1005 27.2926 18.4185 27.4239 18.75 27.4239C19.0815 27.4239 19.3995 27.2926 19.6339 27.0588C19.8683 26.825 20 26.508 20 26.1774V11.2189C20 10.8883 19.8683 10.5713 19.6339 10.3375C19.3995 10.1037 19.0815 9.97239 18.75 9.97239Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles["main-part"]}>
          <div className={styles["configurator-table"]}>
            {componentsRowDataList.map((componentData, id) => {
              return (
                <ConfiguratorTableRow
                  allCountComponentsList={allCountComponentsList}
                  checkCompatibility={checkCompatibility}
                  setUserComponentsList={setUserComponentsList}
                  key={id}
                  componentData={componentData}
                  userComponentsList={userComponentsList}
                  setIsSearchTableOpen={setIsSearchTableOpen}
                  setSearchTableName={setSearchTableName}
                />
              );
            })}
          </div>

          <div className={styles["control-panel"]}>
            <button
              onClick={() => {
                setBuyModalData([]);
                buyCompilationHandler();
              }}
              className={styles["buying-button"]}
            >
              {showBuyModal ? (
                <p className={styles["buying-button-text"]}>Закрыть</p>
              ) : (
                <>
                  <p className={styles["buying-button-text"]}>Купить сборку</p>
                  <p className={styles["buying-button-text"]}>
                    {userCompliationPrice.toLocaleString()} ₽
                  </p>
                </>
              )}
            </button>

            <div className={styles["save-config-container"]}>
              <h2>Сохранить конфигурацию</h2>
              <button
                className={styles["control-panel-button"]}
                onClick={() => {
                  addToFavouriteHandler(); //
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.2003 6.23296C23.8753 4.90815 22.1189 4.09956 20.2483 3.95325C18.3777 3.80695 16.5163 4.33257 15.0003 5.43517C13.4099 4.2555 11.4303 3.72058 9.46024 3.93813C7.49016 4.15568 5.67589 5.10955 4.38281 6.60765C3.08973 8.10575 2.41387 10.0368 2.49135 12.0119C2.56882 13.9871 3.39387 15.8596 4.80034 17.2523L12.5628 25.0058C13.2129 25.6438 14.0883 26.0013 15.0003 26.0013C15.9124 26.0013 16.7878 25.6438 17.4378 25.0058L25.2003 17.2523C26.6598 15.788 27.479 13.8073 27.479 11.7427C27.479 9.67805 26.6598 7.69731 25.2003 6.23296ZM23.4378 15.5321L15.6753 23.2731C15.587 23.3621 15.4819 23.4327 15.366 23.4809C15.2502 23.529 15.1259 23.5539 15.0003 23.5539C14.8748 23.5539 14.7505 23.529 14.6347 23.4809C14.5188 23.4327 14.4137 23.3621 14.3253 23.2731L6.56284 15.4947C5.58254 14.4954 5.03361 13.1531 5.03361 11.7551C5.03361 10.3572 5.58254 9.0148 6.56284 8.01551C7.56179 7.03197 8.90906 6.48048 10.3128 6.48048C11.7166 6.48048 13.0639 7.03197 14.0628 8.01551C14.179 8.13234 14.3173 8.22508 14.4696 8.28836C14.6219 8.35165 14.7853 8.38423 14.9503 8.38423C15.1154 8.38423 15.2787 8.35165 15.4311 8.28836C15.5834 8.22508 15.7216 8.13234 15.8378 8.01551C16.8368 7.03197 18.1841 6.48048 19.5878 6.48048C20.9916 6.48048 22.3389 7.03197 23.3378 8.01551C24.3316 9.0017 24.8986 10.3368 24.9173 11.7348C24.936 13.1328 24.4049 14.4825 23.4378 15.4947V15.5321Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div className={styles["add-to-config-container"]}>
              <h2>
                Добавить <br /> в сравнение
              </h2>
              <button
                onClick={handleAddCompilationToComparison}
                className={styles["control-panel-button"]}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25 14.9585C5.91848 14.9585 5.60054 15.0899 5.36612 15.3236C5.1317 15.5574 5 15.8745 5 16.2051V26.1774C5 26.508 5.1317 26.825 5.36612 27.0588C5.60054 27.2926 5.91848 27.4239 6.25 27.4239C6.58152 27.4239 6.89946 27.2926 7.13388 27.0588C7.3683 26.825 7.5 26.508 7.5 26.1774V16.2051C7.5 15.8745 7.3683 15.5574 7.13388 15.3236C6.89946 15.0899 6.58152 14.9585 6.25 14.9585ZM12.5 2.49316C12.1685 2.49316 11.8505 2.6245 11.6161 2.85827C11.3817 3.09204 11.25 3.4091 11.25 3.7397V26.1774C11.25 26.508 11.3817 26.825 11.6161 27.0588C11.8505 27.2926 12.1685 27.4239 12.5 27.4239C12.8315 27.4239 13.1495 27.2926 13.3839 27.0588C13.6183 26.825 13.75 26.508 13.75 26.1774V3.7397C13.75 3.4091 13.6183 3.09204 13.3839 2.85827C13.1495 2.6245 12.8315 2.49316 12.5 2.49316ZM25 19.9447C24.6685 19.9447 24.3505 20.076 24.1161 20.3098C23.8817 20.5436 23.75 20.8606 23.75 21.1912V26.1774C23.75 26.508 23.8817 26.825 24.1161 27.0588C24.3505 27.2926 24.6685 27.4239 25 27.4239C25.3315 27.4239 25.6495 27.2926 25.8839 27.0588C26.1183 26.825 26.25 26.508 26.25 26.1774V21.1912C26.25 20.8606 26.1183 20.5436 25.8839 20.3098C25.6495 20.076 25.3315 19.9447 25 19.9447ZM18.75 9.97239C18.4185 9.97239 18.1005 10.1037 17.8661 10.3375C17.6317 10.5713 17.5 10.8883 17.5 11.2189V26.1774C17.5 26.508 17.6317 26.825 17.8661 27.0588C18.1005 27.2926 18.4185 27.4239 18.75 27.4239C19.0815 27.4239 19.3995 27.2926 19.6339 27.0588C19.8683 26.825 20 26.508 20 26.1774V11.2189C20 10.8883 19.8683 10.5713 19.6339 10.3375C19.3995 10.1037 19.0815 9.97239 18.75 9.97239Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            {/* <div className={styles["save-config-container"]}>
              <h2>
                Мощность <br /> блока питания
              </h2>
            </div> */}
          </div>
        </div>
        <Link
          href="/BuyingComponentsPage"
          onClick={() => {
            // setBuyModalData([]);
            buyCompilationHandler();
          }}
          className={styles["buying-button-mobile"]}
        >
          <p className={styles["buying-button-text"]}>Купить сборку </p>
          <p className={styles["buying-button-cost"]}>
            {userCompliationPrice.toLocaleString()} ₽
          </p>
        </Link>
        {/* {showBuyModal && (
          <div className={styles["buy-modal-mobile"]}>
            {buyModalData.map((elem: any, index: number) => {
              return (
                <Link
                  className={styles["buy-link"]}
                  target="_blank"
                  href={elem.buyLink}
                  key={index}
                >
                  {elem.name}
                </Link>
              );
            })}
          </div>
        )} */}
      </div>
      {isSearchTableOpen && (
        <div
          style={{ zIndex: "999999" }}
          className={styles["wrapper"]}
          onClick={(e) => {
            e.stopPropagation();
            router.push("/");
            setIsSearchTableOpen(false);
          }}
        >
          <SearchComponents
            setIsSearchTableOpen={setIsSearchTableOpen}
            searchTableName={searchTableName}
            isModalWindow={true}
          />
        </div>
      )}
    </>
  );
}
