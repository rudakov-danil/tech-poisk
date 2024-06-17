"use client";
import styles from "./CatalogPopUp.module.css";

import { CatalogPopUpColumn } from "../catalogPopUpColumn/CatalogPopUpColumn";
import Link from "next/link";
import Image from "next/image";
import cross from "@/assets/icons/cross.svg";

interface Props {
  isCatalopPopUpActive: boolean;
  setIsCatalopPopUpActive: () => void;
}

export function CatalogPopUp({ setIsCatalogPopUpActive }: any) {
  const intelProcessors: string[] = [
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Intel Pentium",
    // "Intel_Xeon", //Их пока нет в бд
  ];
  const amdProcessors = [
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "AMD Ryzen 9",
    "AMD Athlon",
    "AMD Threadripper",
  ];

  const intelMotherBoards = [
    "Intel_H610",
    // "Intel_B660", // их нет в бд пока что
    "Intel_B760",
    "Intel_H670",
    "Intel_H770",
    "Intel_Z690",
    "Intel_Z790",
  ];

  const amdMotherBoards = [
    "AMD_A320",
    "AMD_A520",
    "AMD_B450",
    "AMD_B550",
    "AMD_B650",
    "AMD_X570",
    "AMD_X670",
  ];

  const nvidiaGraphicsCards = [
    "GeForce RTX 4000",
    "GeForce RTX 3000",
    "GeForce RTX_2000",
    "GeForce GTX 1600",
    "GeForce GT/GTX 1000",
    "GeForce GT_700",
  ];

  const intelGraphicsCards = ["Arc A700", "Arc A300"];

  const amdGraphicsCards = [
    "Radeon RX 7000",
    "Radeon RX 6000",
    "Radeon RX 500",
  ];

  const ramTypes = ["DDR5", "DDR4", "DDR3L", "DDR3"];

  const powerArray = ["400_Вт", "600_Вт", "800_Вт", "1000_Вт"];

  const powerSertificate = [
    "80 Plus Platinum",
    "80_Plus_Gold",
    "80_Plus_Bronze",
    "80 Plus",
  ];

  const sizeTypes = ["Full-Tower", "Mid-Tower", "Mini-Tower", "Slim", "SFF"];

  const motherboardTypes = ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"];

  const coldTypes = [
    "Охлаждение_процессора",
    "Охлаждение_SSD",
    "Корпусные_вентиляторы",
    // "Термопаста_и_термопрокладки", //Этого видимо тоже нет в бд
  ];

  const ssd = ["SSD M2", "SSD mSATA", "SSD 2.5″"];

  const hdd = ["HDD 3.5″", "HDD_2.5″"];
  function setInLocalStorage(
    title: string = "",
    search: string = "",
    slug: string = ""
  ) {
    localStorage.setItem(
      "searchInCatalog",
      JSON.stringify({
        componentType: title,
        componentTypeSlug: slug,
        search: search,
      })
    );
    window.dispatchEvent(new Event("storage"));
    // window.location.reload();
  }
  return (
    <div className={styles["catalog-pop-up"]}>
      {/* <Image
        src={cross}
        width={11}
        height={11}
        alt="cross"
        onClick={() => {
          setIsCatalogPopUpActive(false); //
        }}
        className="sticky right-0 top-0 lg:hidden"
      /> */}
      {/* <div
        onClick={() => {
          setIsCatalogPopUpActive(false);
        }}
        className={styles["layout"]}
      ></div> */}
      <div className={styles["modal"]}>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("processor", "", "Процессоры");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Процессоры
            </h2>
          </Link>
          <div className={styles["content"]}>
            <CatalogPopUpColumn
              title="processor"
              slug="Процессоры"
              setInLocalStorage={setInLocalStorage}
              array={intelProcessors}
              setIsCatalogPopUpActive={setIsCatalogPopUpActive}
            />
            <CatalogPopUpColumn
              title="processor"
              slug="Процессоры"
              setInLocalStorage={setInLocalStorage}
              array={amdProcessors}
              setIsCatalogPopUpActive={setIsCatalogPopUpActive}
            />
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("motherboard", "", "Материнские платы");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Материнские платы
            </h2>
          </Link>
          <div className={styles["content"]}>
            <CatalogPopUpColumn
              title="motherboard"
              slug="Материнские платы"
              setInLocalStorage={setInLocalStorage}
              array={intelMotherBoards}
              setIsCatalogPopUpActive={setIsCatalogPopUpActive}
            />
            <CatalogPopUpColumn
              title="motherboard"
              slug="Материнские платы"
              setInLocalStorage={setInLocalStorage}
              array={amdMotherBoards}
              setIsCatalogPopUpActive={setIsCatalogPopUpActive}
            />
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("gpu", "", "Видеокарты");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Видеокарты
            </h2>
          </Link>
          <div className={styles["content"]}>
            <div className={styles["block-column"]}>
              <Link
                href={`/SearchPage`}
                onClick={() => {
                  setIsCatalogPopUpActive(false);
                  setInLocalStorage("gpu", "Nvidia", "Nvidia");
                }}
                className="hover:underline hover:text-[#0260E8]"
              >
                <h3
                  className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}
                >
                  Nvidia
                </h3>
              </Link>
              <CatalogPopUpColumn
                title="gpu"
                slug="Видеокарты"
                setInLocalStorage={setInLocalStorage}
                array={nvidiaGraphicsCards}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
            <div className={styles["block-column"]}>
              <Link
                href={`/SearchPage`}
                onClick={() => {
                  setIsCatalogPopUpActive(false);
                  setInLocalStorage("gpu", "AMD", "AMD");
                }}
                className="hover:underline hover:text-[#0260E8]"
              >
                <h3
                  className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}
                >
                  AMD
                </h3>
              </Link>
              <CatalogPopUpColumn
                title="gpu"
                slug="Видеокарты"
                setInLocalStorage={setInLocalStorage}
                array={amdGraphicsCards}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />

              <Link
                href={`/SearchPage`}
                onClick={() => {
                  setIsCatalogPopUpActive(false);
                  setInLocalStorage("gpu", "Intel", "Intel");
                }}
                className="hover:underline hover:text-[#0260E8]"
              >
                {" "}
                <h3
                  className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}
                >
                  Intel
                </h3>
              </Link>
              <CatalogPopUpColumn
                title="gpu"
                slug="Видеокарты"
                setInLocalStorage={setInLocalStorage}
                array={intelGraphicsCards}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("hdd,ssd", "", "Оперативная память");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Оперативная память
            </h2>
          </Link>
          <div className={styles["content"]}>
            <div className={styles["block-column"]}>
              <Link
                href={`/SearchPage`}
                onClick={() => {
                  setIsCatalogPopUpActive(false);
                  setInLocalStorage("ram", "DIMM", "DIMM");
                }}
                className="hover:underline hover:text-[#0260E8]"
              >
                {" "}
                <h3
                  className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}
                >
                  DIMM
                </h3>
              </Link>
              <CatalogPopUpColumn
                title="ram"
                slug="Оперативная память"
                setInLocalStorage={setInLocalStorage}
                array={ramTypes}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
            <div className={styles["block-column"]}>
              <Link
                href={`/SearchPage`}
                onClick={() => {
                  setIsCatalogPopUpActive(false);
                  setInLocalStorage("ram", "SO-DIMM", "SO-DIMM");
                }}
                className="hover:underline hover:text-[#0260E8]"
              >
                <h3
                  className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}
                >
                  SO-DIMM
                </h3>
              </Link>
              <CatalogPopUpColumn
                title="ram"
                slug="Оперативная память"
                setInLocalStorage={setInLocalStorage}
                array={ramTypes}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false),
                setInLocalStorage(
                  "cooler,liquid_cooling,case_fans",
                  "",
                  "охлаждение"
                );
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Охлаждение
            </h2>
          </Link>
          <CatalogPopUpColumn
            title="cooler,liquid_cooling,case_fans"
            slug="охлаждение"
            setInLocalStorage={setInLocalStorage}
            array={coldTypes}
            setIsCatalogPopUpActive={setIsCatalogPopUpActive}
          />
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("power_supply", "", "Блоки питания");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Блоки питания
            </h2>
          </Link>
          <div className={styles["content"]}>
            <div className={styles["block-column"]}>
              <h3 className={`${styles["block-subtitle"]}`}>Мощность от</h3>
              <CatalogPopUpColumn
                title="power_supply"
                slug="Блоки питания"
                setInLocalStorage={setInLocalStorage}
                array={powerArray}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
            <div className={styles["block-column"]}>
              <h3>Сертификат</h3>
              <CatalogPopUpColumn
                title="power_supply"
                slug="Блоки питания"
                setInLocalStorage={setInLocalStorage}
                array={powerSertificate}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("case", "", "Корпуса");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Корпуса
            </h2>
          </Link>
          <div className={styles["content"]}>
            <div className={styles["block-column"]}>
              <h3 className={`${styles["block-subtitle"]}`}>Типоразмер</h3>
              <CatalogPopUpColumn
                title="case"
                slug="Корпуса"
                setInLocalStorage={setInLocalStorage}
                array={sizeTypes}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
            <div className={styles["block-column"]}>
              <h3 className={`${styles["block-subtitle"]}`}>
                Форм-фактор платы
              </h3>
              <CatalogPopUpColumn
                title="case"
                slug="Корпуса"
                setInLocalStorage={setInLocalStorage}
                array={motherboardTypes}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
          </div>
        </div>
        <div className={styles["block"]}>
          <Link
            href="/SearchPage"
            onClick={() => {
              setIsCatalogPopUpActive(false);
              setInLocalStorage("hdd,ssd", "", "Хранение данных");
            }}
            className="hover:underline hover:text-[#0260E8]"
          >
            <h2 className={`${styles["block-title"]} hover:text-[#0260E8]`}>
              Хранение данных
            </h2>
          </Link>
          <div className={styles["content"]}>
            <div className={styles["block-column"]}>
              {/* <h3 className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}>SSD накопители</h3> */}
              <CatalogPopUpColumn
                title="hdd,ssd"
                slug="Хранение данных"
                setInLocalStorage={setInLocalStorage}
                array={ssd}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
            <div className={styles["block-column"]}>
              {/* <h3 className={`${styles["block-subtitle"]} hover:text-[#0260E8]`}>Жёсткие диски</h3> */}
              <CatalogPopUpColumn
                title="hdd,ssd"
                slug="Хранение данных"
                setInLocalStorage={setInLocalStorage}
                array={hdd}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
