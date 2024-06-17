import React, { memo, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import arrow from "../../../../assets/icons/arrow-down.svg";
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
    old: "Сначала старые",
    cheap: "Сначала дешёвые",
    expensive: "Сначала дорогие",
    name: "По названия (А-Я)",
  };

  return (
    <button
      className={cx(styles["sort-settings-container"])}
      onClick={() => setFilterIsOpen(!filterisOpen)}
    >
      <p className={styles["sort-settings"]}>
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
        <div className={styles["sort-settings-block"]}>
          {filter !== "old" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("old");
                setAdditionalSorting("old");
              }}
            >
              Сначала старые
            </p>
          )}
          {filter !== "cheap" && (
            <p
              onClick={() => {
                setFilterIsOpen(false);
                setFilter("cheap");
                setAdditionalSorting("cheap");
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
                setAdditionalSorting("expensive");
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
                setAdditionalSorting("name");
              }}
            >
              По названия (А-Я)
            </p>
          )}
        </div>
      )}
    </button>
  );
});
