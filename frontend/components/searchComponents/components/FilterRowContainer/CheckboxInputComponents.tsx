import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addFilterToStore,
  removeFilter,
} from "@/redux/services/filtersComponentsSlice";
import React, { memo, useEffect, useState } from "react";

export const CheckboxInputComponents = memo(function CheckboxInputComponents({
  elem,
  elemContainerName,
  searchTableName,
}: {
  elem: any;
  elemContainerName: string;
  searchTableName: string;
}) {
  const dispatch = useAppDispatch();
  const filtersComponentsReducer = useAppSelector(
    (state) => state.filtersComponentsReducer
  );
  const [isChecked, setIsChecked] = useState(
    filtersComponentsReducer[searchTableName].some(
      (subArray: any) => subArray[1] === elem.value
    ) || false
  );
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  useEffect(() => {
    setIsChecked(
      filtersComponentsReducer[searchTableName].some(
        (subArray: any) => subArray[1] === elem.value
      ) || false
    );
  }, [filtersComponentsReducer[searchTableName]]);
  useEffect(() => {
    if (isPendingUpdate) {
      if (isChecked) {
        dispatch(
          addFilterToStore({
            searchTableName,
            value: elem.value,
            slug: elemContainerName,
          })
        );
      } else {
        dispatch(
          removeFilter({
            searchTableName,
            value: elem.value,
          })
        );
      }

      setIsPendingUpdate(false);
    }
  }, [isPendingUpdate, isChecked, dispatch, elem.value, searchTableName]);

  const handleChange = () => {
    setIsChecked((prev: boolean) => !prev);
    setIsPendingUpdate(true);
  };
  const rusNames: { [key: string]: string } = {
    liquid_cooling: "Система жидкостногоохлаждения (СЖО)",
    cooler: "Кулеры для процессора",
  };

  return (
    <label className="flex gap-[4px] items-baseline mb-[5px]">
      <input
        type="checkbox"
        data-filtername={elem.value}
        name={elemContainerName}
        checked={isChecked}
        onChange={handleChange}
        className="min-w-[15px] min-h-[15px]"
      />
      <p className="text-[20px] font-thin break-all hover:text-[#0260E8]">
        {rusNames[elem.value] ? rusNames[elem.value] : elem.value}
        {elem?.value && (
          <span className="text-[#9E9E9E] ml-[3px]">({elem.count})</span>
        )}
      </p>
    </label>
  );
});
