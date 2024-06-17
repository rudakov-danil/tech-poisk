import React, {
  JSXElementConstructor,
  useState,
  useEffect,
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  ClassAttributes,
  memo,
  useCallback,
} from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import close from "../.././../../assets/icons/close.png";
import {
  removeFilter,
  resetFilters,
} from "@/redux/services/filtersComponentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface IFiltersNames {
  [key: string]: string;
}

export const ActiveFiltersContainer = memo(function ActiveFiltersContainer({
  minPriceFilters,
  setMinPriceFilters,
  maxPriceFilters,
  setMaxPriceFilters,
  isModalWindow,
  searchTableName = "",
}: any) {
  const newSearchTableName = !isModalWindow
    ? typeof window !== "undefined"
      ? JSON.parse(String(localStorage.getItem("searchInCatalog")) || "")
          .componentType || ""
      : ""
    : searchTableName;
  const filtersNames: IFiltersNames = {
    manufacturer: "Производитель",
    processor: "Процессор",
    socket: "Сокет",
    maxPrice: "До",
    minPrice: "От",
    сompatible: "Совместимо",
  };

  type ICommonFilters = {
    [key: string]: string[] | string | any;
  };
  const filtersComponentsReducer = useAppSelector(
    (state) => state.filtersComponentsReducer
  );
  const [renderItems, setRenderItems] = useState<any>(
    filtersComponentsReducer[newSearchTableName] || []
  );
  // console.log(filtersComponentsReducer[searchTableName], "AAAAAAAAA");

  useEffect(() => {
    setRenderItems(filtersComponentsReducer[newSearchTableName]);
  }, [filtersComponentsReducer]);
  // const commonFilters: ICommonFilters = { ...priceFilters, ...checkboxFilters };

  // function renderArrayItems(arr: any) {
  //   const result = [];

  //   for (const key in arr) {
  //     if (arr[key] === "componentType" && arr[key] === "page") {
  //       continue;
  //     }
  //     if (Array.isArray(arr[key])) {
  //       arr[key].forEach((item: any) => {
  //         result.push([key, item]);
  //       });
  //     } else {
  //       result.push([key, arr[key]]);
  //     }
  //   }

  //   setRenderItems(result);
  // }

  // useEffect(() => {
  //   renderArrayItems(commonFilters);
  // }, [priceFilters, checkboxFilters]);

  // const removeFilter = (containerName: string, filter: string) => {
  //   if (containerName === "minPrice") {
  //     const { minPrice, ...rest } = priceFilters;

  //     setPriceFilters(rest);
  //   } else if (containerName === "maxPrice") {
  //     const { maxPrice, ...rest } = priceFilters;

  //     setPriceFilters(rest);
  //   } else {
  //     const updatedFilters = { ...checkboxFilters };

  //     if (Object.keys(updatedFilters).length !== 0) {
  //       const index = updatedFilters[containerName].indexOf(filter);

  //       updatedFilters[containerName].splice(index, 1);
  //       if (updatedFilters[containerName].length === 0) {
  //         delete updatedFilters[containerName];
  //       }
  //     }

  //     setCheckboxFilters(updatedFilters);
  //   }
  // };
  const dispatch = useAppDispatch();

  const rusNames: { [key: string]: string } = {
    maxPrice: "Максимальная цена",
    minPrice: "Минимальная цена",
    manufacturer: "Производитель",
    manufacturer_code: "Код производителя",
    type: "Тип",
    form_factor: "Форм-фактор",
    interface: "Интерфейс",
    capacity: "Объем HDD",
    buffer_memory: "Объем кэш-памяти",
    spindle_speed: "Скорость вращения шпинделя",
    maximum_transfer_rate: "Максимальная скорость передачи данных",
    latency: "Среднее время задержки (Latency)",
    noise: "Уровень шума во время работы",
    number_of_positioning_loops: "Число циклов позиционирования-парковки",
    socket: "Сокет",
    core: "Ядро",
    core_count: "Общее количество ядер",
    thread_count: "Максимальное число потоков",
    energy_efficient_cores: "Количество энергоэффективных ядер",
    base_clock: "Базовая частота процессора",
    turbo_clock: "Максимальная частота в турбо режиме",
    unlocked_multiplier: "Свободный множитель",
    integrated_graphics: "Интегрированное графическое ядро",
    video_processor: "Модель графического процессора",
    l1_cache: "Объём кэша L1",
    l2_cache: "Объём кэша L2",
    l3_cache: "Объём кэша L3",
    process_node: "Техпроцесс",
    max_temperature: "Максимальная температура процессора",
    tdp: "Базовое тепловыделение",
    max_tdp: "Тепловыделение (TDP)",
    release_date: "Год релиза",
    delivery_type: "Тип поставки",
    memory_type: "Тип памяти",
    memory_form_factor: "Форм-фактор поддерживаемой памяти",
    max_memory_frequency: "Максимально поддерживаемый объем памяти",
    chanels_number: "Количество каналов",
    ecc_support: "Поддержка режима ECC",
    chipset: "Чипсет",
    compatible_processors: "Совместимые ядра процессоров",
    main_power_connectors: "Основной разъём питания",
    processor_power_connectors: "Разъём питания процессора",
    power_connectors_phases: "Количество фаз питания",
    passive_cooling: "Пассивное охлаждение",
    active_cooling: "Активное охлаждение",
    usb_type_a: "Порты USB Type-A",
    usb_type_c: "Порты USB Type-C",
    video_outputs: "Видеовыходы",
    network_ports: "Количество сетевых портов (RJ-45)",
    sma_ports: "Разъемы SMA (для антенны Wi-Fi)",
    pcie_x16_slots: "Слоты PCIe x16",
    sli_crossfire: "Поддержка SLI / CrossFire",
    sli_crossfire_slots: "Количество карт в SLI / Crossfire",
    pcie_x1_slots: "Количество слотов PCI-E x1",
    m2_slots: "Количество разъемов M.2",
    audio: "Звуковая схема",
    audio_controller: "Чипсет звукового адаптера",
    expansion_slots: "Слоты расширения",
    m2_slot_types: "Тип слотов M.2",
    network_interface: "Сетевой интерфейс",
    network_controller: "Сетевой адаптер",
    network_controller_speed: "Скорость сетевого адаптера",
    memory_slots: "Количество слотов памяти",
    memory_channels: "Количество каналов памяти",
    max_memory: "Максимальный объём памяти",
    memory_base_clock: "Максимальная частота памяти (JEDEC / без разгона)",
    fan_headers: "Разъемы для корпусных вентиляторов (4 pin)",
    atx_power_connectors: "Разъём питания ATX 12 В",
    argb_headers: "Разъемы 5V-D-G (3 pin) для ARGB подсветки",
    rgb_headers: "Разъемы 12V-G-R-B (4 pin) для RGB подсветки",
    lighting: "Подсветка элементов платы",
    lighting_type: "Тип подсветки",
    liquid_cooling_support: "Поддержка жидкостного охлаждения",
    case_dimensions: "Габариты корпуса",
    case_material: "Материал корпуса",
    side_panel: "Наличие боковой панели",
    side_panel_material: "Материал боковой панели",
    front_panel_ports: "Передние разъемы",
    included_fans: "Включенные в комплект вентиляторы",
    fan_size: "Размер вентилятора",
    fan_rpm: "Скорость вращения вентилятора",
    fan_noise: "Уровень шума вентилятора",
    fan_control: "Управление вентиляторами",
    radiator: "Наличие радиатора",
    radiator_size: "Размер радиатора",
    radiator_mounting_size: "Посадочный размер радиатора",
    radiator_material: "Материал радиатора",
    heat_pipes: "Тепловые трубки",
    base_material: "Материал основания",
    heatsink_material: "Материал радиатора",
    gpu_manufacturer: "Производитель GPU",
    gpu_codename: "Кодовое название GPU",
    gpu_architecture: "Архитектура GPU",
    gpu_clock_speed: "Базовая частота GPU",
    gpu_boost_clock: "Максимальная частота GPU в режиме Boost",
    cuda_cores: "Количество CUDA ядер",
    tensor_cores: "Количество Tensor ядер",
    ray_tracing_cores: "Количество ядер трассировки лучей",
    display_outputs: "Видеовыходы",
    max_resolution: "Максимальное разрешение",
    memory_size: "Объем видеопамяти",
    memory_bus_width: "Ширина шины видеопамяти",
    memory_bandwidth: "Пропускная способность видеопамяти",
    sli_crossfire_support: "Поддержка SLI / CrossFire",
    opengl_support: "Поддержка OpenGL",
    ray_tracing_support: "Поддержка трассировки лучей",
    slot_count: "Количество слотов расширения",
    power_connector: "Тип разъема питания",
    recommended_psu: "Рекомендуемый блок питания",
    used_power: "Потребляемая мощность",
    "2_5_inch_bays": 'Отсеки 2.5"',
    "3_5_inch_bays": 'Отсеки 3.5"',
    vertial_ssd_hdd_mount: "Вертикальное размещение SSD/HDD",
    additional_fan_mounts: "Дополнительные крепления для вентиляторов",
    dust_filters: "Пылевые фильтры",
    color_scheme: "Цветовая схема",
    window_material: "Материал окна",
    purpose: "Назначение устройства",
    rater_type: "Тип устройства",
    series: "Серия",
    processor_model: "Модель процессора",
    processor_codename: "Кодовое название процессора",
    hyper_threading: "Поддержка Hyper-Threading",
    power_consumption: "Энергопотребление",
    coming_soon: "В ближайшее время",
    connectivity: "Связь",
    audio_codec: "Аудио кодек",
    display_size: "Размер экрана",
    display_type: "Тип экрана",
    display_resolution: "Разрешение экрана",
    display_refresh_rate: "Частота обновления экрана",
    display_aspect_ratio: "Соотношение сторон экрана",
    display_brightness: "Яркость экрана",
    display_contrast_ratio: "Контрастность экрана",
    display_color_gamut: "Цветовой охват экрана",
    display_hdr: "Поддержка HDR",
    touch_screen: "Сенсорный экран",
    webcam: "Веб-камера",
    microphone: "Встроенный микрофон",
    speakers: "Встроенные динамики",
    keyboard: "Клавиатура",
    pointing_device: "Указывающее устройство",
    storage_type: "Тип хранилища",
    storage_capacity: "Объем хранилища",
    storage_interface: "Интерфейс хранилища",
    battery_capacity: "Емкость аккумулятора",
    battery_life: "Время работы от аккумулятора",
    operating_system: "Операционная система",
    ports: "Разъемы и порты",
    wireless: "Беспроводная связь",
    bluetooth: "Bluetooth",
    dimensions: "Габариты",
    weight: "Вес",
    color: "Цвет",
    warranty: "Гарантия",
    compatible: "Совместимо",
    componentType: "Тип компонента",
    search: "Поиск",
    raytracing_support: "Поддержка трассировки лучей",
    overclocked: "OC версия",
    multi_gpu_support: "Поддержка SLI/CrossFire",
    low_profile: "Низкопрофильная карта (Low Profile)",
    lightning: "Подсветка",
    total_capacity: "Общий объем памяти",
    module_capacity: "Объем одного модуля",
    module_count: "Количество модулей",
    clock_speed: "Тактовая частота",
    cas_latency: "Задержка CL",
    xmp_support: "Поддержка XMP",
    cooling_system: "Система охлаждения",

    led_display: "ЖК-дисплей",
    fan_count: "Количество вентиляторов",
    cooler_height: "Высота кулера",
    molex_4pin_converter: "Molex 4-пин",
    connector_type: "Тип разъема",
    noise_level: "Уровень шума",
    compatible_motherboards: "Совместимые материнские платы",
    psu_included: "БП в комплекте",
    psu_position: "Расположение БП",
    side_window: "Боковое окно",
    max_gpu_length: "Максимальная длина видеокарты",
    max_cooler_height: "Максимальная высота кулера",
    max_psu_length: "Максимальная длина БП",
    power_output: "Мощность",
    modular_cables: "Модульные кабели",
    plus_certification: "Сертификат 80 PLUS",
    liquid_cooling: "Система жидкостногоохлаждения (СЖО)",
  };
  return (
    <div
      className={`${styles["container"]} overflow-y-auto max-h-[79px] my-[24px] max-lg:my-[13px]`}
    >
      <div className="flex flex-wrap gap-[24px] items-center max-lg:gap-[15px] max-lg:flex-nowrap max-lg:overflow-x-auto">
        {minPriceFilters && (
          <div
            className={`flex items-center gap-[8px] ${
              isModalWindow ? "px-[9px] py-[6px]" : "px-[22px] py-[10px]"
            } bg-[#d9d9d9] hover:bg-[#dde1e773] rounded-[33px] select-none`}
            onClick={() => setMinPriceFilters("")}
          >
            <p className="text-[#828282] text-[16px] max-lg:text-[14px] max-lg:whitespace-nowrap">
              {isModalWindow &&
                `${rusNames["minPrice"] ? rusNames["minPrice"] : "minPrice"}: `}
              <span className="text-[black] text-[16px]">
                {Number(minPriceFilters)}
              </span>
            </p>

            {isModalWindow && (
              <Image
                className="max-w-max"
                src={close}
                width={15}
                height={15}
                alt="delete filter icon"
              />
            )}
          </div>
        )}
        {maxPriceFilters && (
          <div
            className={`flex items-center gap-[8px] ${
              isModalWindow ? "px-[9px] py-[6px]" : "px-[22px] py-[10px]"
            } bg-[#d9d9d9] hover:bg-[#dde1e773] rounded-[33px] select-none`}
            onClick={() => setMaxPriceFilters("")}
          >
            <p className="text-[#828282] text-[16px] max-lg:text-[14px] max-lg:whitespace-nowrap">
              {isModalWindow &&
                `${rusNames["maxPrice"] ? rusNames["maxPrice"] : "minPrice"}: `}
              <span className="text-[black] text-[16px]">
                {Number(maxPriceFilters)}
              </span>
            </p>

            {isModalWindow && (
              <Image
                className="max-w-max"
                src={close}
                width={15}
                height={15}
                alt="delete filter icon"
              />
            )}
          </div>
        )}
        {renderItems.map((elem: any, index: number) => {
          return (
            <div
              key={index}
              className={`flex items-center gap-[8px] ${
                isModalWindow ? "px-[9px] py-[6px]" : "px-[22px] py-[10px]"
              } bg-[#d9d9d9] hover:bg-[#dde1e773] rounded-[33px] select-none`}
              // onClick={() => removeFilter(elem[0], elem[1])} //elem[0]-containerName-manufacturer elem[1]-фильтр - AMD
              onClick={() => {
                dispatch(
                  removeFilter({
                    searchTableName: newSearchTableName,
                    value: elem[1],
                  })
                );
              }}
            >
              <p className="text-[#828282] text-[16px] max-lg:text-[14px] max-lg:whitespace-nowrap">
                {isModalWindow &&
                  `${rusNames[elem[0]] ? rusNames[elem[0]] : elem[0]}: `}
                <span className="text-[black] text-[16px]">
                  {elem[0] === "maxPrice" || elem[0] === "minPrice"
                    ? Number(elem[1]) / 100
                    : elem[1]}
                </span>
              </p>

              {isModalWindow && (
                <Image
                  className="max-w-max"
                  src={close}
                  width={15}
                  height={15}
                  alt="delete filter icon"
                />
              )}
            </div>
          );
        })}
        {renderItems.length !== 0 && (
          <button
            className={`${styles["reset-all-filters"]} max-lg:whitespace-nowrap`}
            onClick={() => {
              dispatch(resetFilters());
            }}
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </div>
  );
});
