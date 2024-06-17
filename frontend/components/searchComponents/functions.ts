import { useEffect, useState } from "react";

export function createLink(array: any, setLink: any) {
  const result = array.reduce((acc: any, [key, value]: string[]) => {
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value);
    return acc;
  }, {});

  const queryString = Object.entries(result)
    .map(([key, values]: any) => `&${key}=${values.join(",")}`)
    .join("");

  setLink(queryString);

  return queryString;
}
export function updateFiltersComponentName(
  searchTableName: string,
  setFiltersComponentName: (name: string) => void
): void {
  const componentNames: Record<string, string> = {
    processor: "Процессоры",
    gpu: "Видеокарты",
    motherboard: "Материнская плата",
    ram: "Оперативна память",
    power_supply: "Блок питания",
    "hdd,ssd": "Хранение данных",
    case: "Корпус",
    cooler: "Охлаждение",
    liquid_cooling: "Охлаждение",
    "cooler,liquid_cooling": "Охлаждение",
  };

  setFiltersComponentName(componentNames[searchTableName] || "");
}
// export function updateFiltersComponentName(
//   searchTableName: string,
//   setFiltersComponentName: any
// ): void {
//   //При открытии компонента с фильтрами выберается, что будет отображаться, проц или видеокарта
//   switch (searchTableName) {
//     case "processor":
//       setFiltersComponentName("Процессоры");
//       break;
//     case "gpu":
//       setFiltersComponentName("Видеокарты");
//       break;
//     case "motherboard":
//       setFiltersComponentName("Материнская плата");
//       break;
//     case "ram":
//       setFiltersComponentName("Оперативна память");
//       break;
//     case "power_supply":
//       setFiltersComponentName("Блок питания");
//       break;
//     case "hdd,ssd":
//       setFiltersComponentName("Хранение данных");
//       break;
//     case "case":
//       setFiltersComponentName("Корпус");
//       break;
//     case "cooler":
//       setFiltersComponentName("Охлаждение");
//       break;
//     case "liquid_cooling":
//       setFiltersComponentName("Охлаждение");
//       break;
//     case "cooler,liquid_cooling":
//       setFiltersComponentName("Охлаждение");
//       break;
//   }
// }

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
