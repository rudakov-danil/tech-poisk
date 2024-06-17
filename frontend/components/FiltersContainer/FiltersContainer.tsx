import React, { memo, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import arrow from "../../assets/icons/arrow-down.svg";
import cx from "classnames";
type filters = {
  [key: string]: string;
};
export const FiltersContainer = memo(function FiltersContainer({
  setAdditionalSorting,
}: any) {
  const [filterisOpen, setFilterIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("cheap");
  const filters: filters = {
    popular: "Сначала популярные",
    expensive: "Сначала дорогие",
    cheap: "Сначала дешёвые",
    name: "По названия (А-Я)",
    performance: "По производительности",
    cores: "По числу ядер",
    new: "Сначала новые",
    old: "Сначала старые",
  };
  return (
    <button
      className={cx(styles["sort-settings-container"])}
      onClick={() => setFilterIsOpen(!filterisOpen)}
    >
      <p
        className={`${styles["sort-settings"]} text-[20px] max-lg:text-[16px]`}
      >
        Сортировать: <span>{filters[filter]}</span>
      </p>
      <Image
        src={arrow}
        width={14}
        height={14}
        alt="arrow"
        className={cx(filterisOpen ? styles["close"] : styles["open"])}
      />
      {filterisOpen && (
        <div
          className={`${styles["sort-settings-block"]} left-[66px] max-lg:left-[-31px]`}
        >
          {filter !== "popular" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("popular");
                setAdditionalSorting("");
              }}
            >
              Сначала популярные
            </p>
          )}
          {filter !== "cheap" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("cheap");
                setAdditionalSorting("ordering=price");
              }}
            >
              Сначала дешёвые
            </p>
          )}

          {filter !== "expensive" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("expensive");
                setAdditionalSorting("ordering=-price");
              }}
            >
              Сначала дорогие
            </p>
          )}

          {filter !== "name" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("name");
                setAdditionalSorting("ordering=name");
              }}
            >
              По названия (А-Я)
            </p>
          )}

          {filter !== "performance" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("performance");
                setAdditionalSorting("");
              }}
            >
              По производительности
            </p>
          )}

          {filter !== "cores" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("cores");
                setAdditionalSorting("");
              }}
            >
              По числу ядер
            </p>
          )}

          {filter !== "new" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("new");
                setAdditionalSorting("");
              }}
            >
              Сначала новые
            </p>
          )}

          {filter !== "old" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("old");
                setAdditionalSorting("");
              }}
            >
              Сначала старые
            </p>
          )}
        </div>
      )}
    </button>
  );
});
