"use client";

import styles from "./Header.module.css";
import {
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from "react";

import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/icons/tech-poisk-logo-main.svg";
import setting from "../../assets/icons/setting.svg";

import catalog from "../../assets/icons/catalog.svg";
import search from "../../assets/icons/search.svg";
import { CatalogPopUp } from "../catalogPopUp/CatalogPopUp";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { HintsComponent } from "../HintsComponent/HintsComponent";

export function Header({ isCatalogPopUpActive, setIsCatalogPopUpActive }: any) {
  const [searchInput, setSearchInput] = useState("");
  const [inputIsInFocus, setInputIsInFocus] = useState(false);
  const [_scrollY, setScrollY] = useState(0);
  const [showHints, setShowHints] = useState<boolean>(inputIsInFocus);

  const router = useRouter();

  async function getComponentType() {
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/searchHints?search=${searchInput}&limit=1`
      );
      const data = await respone.json();

      // setHintsArray(data);

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit() {
    if (searchInput.length === 0) return;
    const componentType = await getComponentType();

    localStorage.setItem(
      "searchInCatalog",
      JSON.stringify({
        componentType: componentType[0].component_type__slug,
        componentTypeSlug: searchInput,
        search: searchInput,
      })
    );
    // setHintsArray([]);

    window.dispatchEvent(new Event("storage"));
  }

  useEffect(() => {
    addEventListener("scroll", () => {
      setScrollY(scrollY);
    });
  }, []);

  function submitOnEnter() {
    addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    });
    return removeEventListener("keydown", handleSubmit);
  }

  return (
    <>
      <header
        style={{
          zIndex: "200",
          position: "fixed",
          width: "100%",
          borderBottom: _scrollY ? "1px solid lightgray" : "none",
          maxWidth: "none",
        }}
        className={styles["header"]}
      >
        <div
          style={{ maxWidth: "1300px", margin: "0 auto" }}
          className={styles["nav-part"]}
        >
          <div className={styles["logo-container"]}>
            <Link href="/">
              <Image
                src={logo}
                alt=""
                className="max-lg:w-[135px] max-lg:mb-[13px]"
              />
            </Link>
          </div>
          <div className={styles["navigation"]}>
            <div className={styles["links"]}>
              <Link className={styles["link"]} href="/AssemblyGuidePage">
                Гид по сборке
              </Link>
              <Link className={styles["link"]} href="/">
                Сборки пользователей
              </Link>
            </div>
            <Link href={"/"} className={styles["configurator-button"]}>
              <Image src={setting} alt="" />
              <span>Конфигуратор</span>
            </Link>
          </div>
        </div>
        <div
          style={{ maxWidth: "1300px", margin: "0 auto" }}
          className={styles["search-part"]}
        >
          <div className={styles["search-container"]}>
            <div
              className={styles["catalog-button-container"]}
              onClick={() => setIsCatalogPopUpActive((prev: any) => !prev)}
            >
              <button
                className={`${styles["catalog-button"]} py-[7px] px-[15px] text-[white] flex items-center gap-[26px] font-bold`}
              >
                <span>Каталог</span>
                <Image src={catalog} alt="" />
              </button>
            </div>

            <div className="relative w-full">
              <form
                className={styles["form"]}
                onSubmit={(e) => {
                  e.preventDefault();
                  submitOnEnter();
                }}
              >
                <input
                  className={styles["search-input"]}
                  placeholder="Поиск по сайту"
                  type="text"
                  onChange={(e: any) => {
                    setSearchInput(e.target.value);
                  }}
                  onClick={() => {
                    setInputIsInFocus(true);
                  }}
                />
                <Link
                  href={"/SearchPage"}
                  // type="submit"
                  onClick={() => {
                    // e.preventDefault();
                    handleSubmit();
                  }}
                  className={styles["search-button"]}
                >
                  <Image
                    src={search}
                    alt=""
                    className="max-lg:w-[15px] max-lg:h-[15px]"
                  />
                </Link>
              </form>

              <HintsComponent
                searchInput={searchInput}
                inputIsInFocus={inputIsInFocus}
                setInputIsInFocus={setInputIsInFocus}
              />
            </div>
          </div>

          <div className={styles["links-container"]}>
            <Link className={styles["search-part-link"]} href="/ComparisonPage">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={styles["search-part-comparison-path"]}
                  d="M6.25 14.9584C5.91848 14.9584 5.60054 15.0897 5.36612 15.3235C5.1317 15.5573 5 15.8744 5 16.205V26.1773C5 26.5079 5.1317 26.8249 5.36612 27.0587C5.60054 27.2925 5.91848 27.4238 6.25 27.4238C6.58152 27.4238 6.89946 27.2925 7.13388 27.0587C7.3683 26.8249 7.5 26.5079 7.5 26.1773V16.205C7.5 15.8744 7.3683 15.5573 7.13388 15.3235C6.89946 15.0897 6.58152 14.9584 6.25 14.9584ZM12.5 2.49304C12.1685 2.49304 11.8505 2.62437 11.6161 2.85814C11.3817 3.09192 11.25 3.40898 11.25 3.73958V26.1773C11.25 26.5079 11.3817 26.8249 11.6161 27.0587C11.8505 27.2925 12.1685 27.4238 12.5 27.4238C12.8315 27.4238 13.1495 27.2925 13.3839 27.0587C13.6183 26.8249 13.75 26.5079 13.75 26.1773V3.73958C13.75 3.40898 13.6183 3.09192 13.3839 2.85814C13.1495 2.62437 12.8315 2.49304 12.5 2.49304ZM25 19.9446C24.6685 19.9446 24.3505 20.0759 24.1161 20.3097C23.8817 20.5434 23.75 20.8605 23.75 21.1911V26.1773C23.75 26.5079 23.8817 26.8249 24.1161 27.0587C24.3505 27.2925 24.6685 27.4238 25 27.4238C25.3315 27.4238 25.6495 27.2925 25.8839 27.0587C26.1183 26.8249 26.25 26.5079 26.25 26.1773V21.1911C26.25 20.8605 26.1183 20.5434 25.8839 20.3097C25.6495 20.0759 25.3315 19.9446 25 19.9446ZM18.75 9.97227C18.4185 9.97227 18.1005 10.1036 17.8661 10.3374C17.6317 10.5711 17.5 10.8882 17.5 11.2188V26.1773C17.5 26.5079 17.6317 26.8249 17.8661 27.0587C18.1005 27.2925 18.4185 27.4238 18.75 27.4238C19.0815 27.4238 19.3995 27.2925 19.6339 27.0587C19.8683 26.8249 20 26.5079 20 26.1773V11.2188C20 10.8882 19.8683 10.5711 19.6339 10.3374C19.3995 10.1036 19.0815 9.97227 18.75 9.97227Z"
                  fill="black"
                />
              </svg>
              <p className={styles["comparison-text"]}>Сравнение</p>
            </Link>
            <Link className={styles["search-part-link"]} href="/FavoritePage">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={styles["search-part-favorites-path"]}
                  d="M25.2001 6.23271C23.8751 4.9079 22.1186 4.09932 20.248 3.95301C18.3774 3.8067 16.5161 4.33233 15.0001 5.43493C13.4097 4.25525 11.4301 3.72033 9.46 3.93789C7.48991 4.15544 5.67565 5.10931 4.38257 6.6074C3.08948 8.1055 2.41363 10.0365 2.4911 12.0117C2.56858 13.9868 3.39362 15.8593 4.8001 17.2521L12.5626 25.0056C13.2126 25.6435 14.0881 26.0011 15.0001 26.0011C15.9121 26.0011 16.7876 25.6435 17.4376 25.0056L25.2001 17.2521C26.6596 15.7878 27.4788 13.807 27.4788 11.7424C27.4788 9.6778 26.6596 7.69706 25.2001 6.23271ZM23.4376 15.5319L15.6751 23.2729C15.5868 23.3618 15.4816 23.4324 15.3658 23.4806C15.2499 23.5288 15.1256 23.5536 15.0001 23.5536C14.8746 23.5536 14.7503 23.5288 14.6344 23.4806C14.5186 23.4324 14.4134 23.3618 14.3251 23.2729L6.5626 15.4945C5.5823 14.4952 5.03336 13.1528 5.03336 11.7549C5.03336 10.3569 5.5823 9.01455 6.5626 8.01526C7.56154 7.03173 8.90882 6.48024 10.3126 6.48024C11.7164 6.48024 13.0637 7.03173 14.0626 8.01526C14.1788 8.1321 14.3171 8.22483 14.4694 8.28812C14.6217 8.3514 14.7851 8.38399 14.9501 8.38399C15.1151 8.38399 15.2785 8.3514 15.4308 8.28812C15.5831 8.22483 15.7214 8.1321 15.8376 8.01526C16.8365 7.03173 18.1838 6.48024 19.5876 6.48024C20.9914 6.48024 22.3387 7.03173 23.3376 8.01526C24.3314 9.00146 24.8983 10.3366 24.917 11.7345C24.9357 13.1325 24.4047 14.4822 23.4376 15.4945V15.5319Z"
                  fill="black"
                />
              </svg>
              <p className={styles["favorites-text"]}>Избранное</p>
            </Link>
          </div>
        </div>
      </header>
      <div className="lg:h-[200px] h-[170px]"></div>

      {isCatalogPopUpActive && (
        <div
          onClick={() => {
            setIsCatalogPopUpActive(false);
          }}
          className={
            "inset-0 fixed flex justify-center backdrop-blur-sm w-full h-full z-[1000]"
          }
        >
          <CatalogPopUp setIsCatalogPopUpActive={setIsCatalogPopUpActive} />
        </div>
      )}
    </>
  );
}
