"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import MotherboardMenu from "./components/MotherboardMenu/MotherboardMenu";
import ProcessorsMenu from "./components/ProcessorsMenu/ProcessorsMenu";
import VideoCardsMenu from "./components/VideoCardsMenu/VideoCardsMenu";
import RAMMenu from "./components/RAMMenu/RAMMenu";
import CoolingMenu from "./components/CoolingMenu/CoolingMenu";
import CaseFanMenu from "./components/CaseFanMenu/CaseFanMenu";
import CaseMenu from "./components/CaseMenu/CaseMenu";
import SSDMMenu from "./components/SSDMMenu/SSDMMenu";
import SSDMenu from "./components/SSDMenu/SSDMenu";
import HDDMenu from "./components/HDDMenu/HDDMenu";
import PowerUnitMenu from "./components/PowerUnitMenu/PowerUnitMenu";
import AssemblyBlock from "./components/AssemblyBlock/AssemblyBlock";
import { CompilationColumn } from "./components/CompilationColumn/CompilationColumn";

const componentsListWords = {
  compilations: "Сборки",
  case: "Корпусы",
  case_fun: "Доп. Охлаждение",
  cooler: "Охлаждение",
  gpu: "Видеокарты",
  hdd: "hdd",
  ssd: "ssd",
  motherboard: "Материнские платы",
  processor: "Процессоры",
  liquid_cooling: "Водное охлаждение",
  power_supply: "Блоки питания",
  ram: "Оперативная память",
};

export default function ComparisonPage() {
  // const [comparison, setComparison] = useState(
  //   JSON.parse(String(localStorage?.getItem("comparison")))
  // );
  const [pages, setPages] = useState(Object.values(componentsListWords));
  const [activePage, setActivePage] = useState("compilations");
  const [isHideMotherboardMenu, setIsHideMotherboardMenu] = useState(false);
  const [isHideProcessorsMenu, setIsHideProcessorsMenu] = useState(false);
  const [isHideGraphicsCardMenu, setIsHideGraphicsCardMenu] = useState(false);
  const [isHideRamMenu, setIsHideRamMenu] = useState(false);
  const [isHideCoolerMenu, setIsHideCoolerMenu] = useState(false);
  const [isHideCaseFunMenu, setIsHideCaseFunMenu] = useState(false);
  const [isHideCaseMenu, setIsHideCaseMenu] = useState(false);
  return (
    <div>
      <h1 className={styles.title}>Страница Сравнения в разработке...</h1>
      {/* <div className={styles.settings}>
        <p>Показать:</p>
        {pages.map((page, index) => {
          if (page === "Сборки") {
            return (
              <button key={index}>
                <p>
                  <span>
                    Сборки{" "}
                    {comparison?.compilationsList?.length !== undefined &&
                      `(${comparison?.compilationsList?.length})`}
                  </span>
                </p>
              </button>
            );
          } else {
            const currentPageCategory = Object.keys(componentsListWords).find(
              (key) => {
                if (componentsListWords[key] === page) {
                  return key;
                }
              }
            );

            return (
              <button key={index}>
                <p>
                  <span>
                    {page} (
                    {
                      comparison?.componentsList.find(
                        (component) => component === currentPageCategory
                      )?.length
                    }
                    )
                  </span>
                </p>
              </button>
            );
          }
        })}
      </div>
      <div className={styles.activePage}>
        {activePage === "compilations" &&
          comparison?.compilationsList?.map(
            (compilation: any, index: number) => {
              return (
                <div key={index} className={styles.burgerMenu}>
                  <CompilationColumn
                    isHideCaseFunMenu={isHideCaseFunMenu}
                    setIsHideCaseFunMenu={setIsHideCaseFunMenu}
                    setIsHideMotherboardMenu={setIsHideMotherboardMenu}
                    isHideMotherboardMenu={isHideMotherboardMenu}
                    isHideProcessorsMenu={isHideProcessorsMenu}
                    setIsHideProcessorsMenu={setIsHideProcessorsMenu}
                    isHideGraphicsCardMenu={isHideGraphicsCardMenu}
                    setIsHideGraphicsCardMenu={setIsHideGraphicsCardMenu}
                    setIsHideRamMenu={setIsHideRamMenu}
                    isHideRamMenu={isHideRamMenu}
                    setComparison={setComparison}
                    index={index}
                    comparison={comparison}
                    compilation={compilation}
                    key={index}
                    isHideCoolerMenu={isHideCoolerMenu}
                    setIsHideCoolerMenu={setIsHideCoolerMenu}
                    isHideCaseMenu={isHideCaseMenu}
                    setIsHideCaseMenu={setIsHideCaseMenu}
                  />
                </div>
              );
            }
          )}
      </div> */}
    </div>
  );
}
