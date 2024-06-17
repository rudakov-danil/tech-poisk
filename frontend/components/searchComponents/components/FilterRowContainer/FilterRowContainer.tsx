import React, { memo, useState } from "react";
import FiltersPopUp from "../FiltersPopUp/FiltersPopUp";
import styles from "../FilterPanel/styles.module.css";
import cx from "classnames";
import { v4 as uuidv4 } from "uuid";
import {
  addFilterToStore,
  removeFilter,
} from "@/redux/services/filtersComponentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckboxInputComponents } from "./CheckboxInputComponents";

export const FilterRowContainer = memo(function FilterRowContainer({
  searchTableName,
  element,
  elemContainerName,
}: any) {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  return (
    <>
      <div
        className={cx(
          styles["FilterRowHiding"],
          isShowAll
            ? styles["FilterRowHidingMaxHeightUnSet"]
            : styles["FilterRowHidingMaxHeightSet"]
        )}
      >
        {element?.length !== 0 ? (
          element?.map((elem: any) => {
            // if (elem.value === "-") return <p key={uuidv4()}>Пусто</p>;

            return (
              <CheckboxInputComponents
                key={uuidv4()}
                elem={elem}
                elemContainerName={elemContainerName}
                searchTableName={searchTableName}
              />
            );
          })
        ) : (
          <p>Пусто</p>
        )}
      </div>

      {element?.length
        ? element?.length > 3 && ( // кнопка показать все зависит от количества элементов в массиве
            <button
              className={`${styles["show-all-button"]} hover:text-[#0260e8]`}
              onClick={() => setIsShowAll((prev) => !prev)}
            >
              {isShowAll ? "Скрыть" : "Показать всё"}
            </button>
          )
        : null}
    </>
  );
});
