import Image from "next/image";
import settingImage from "../../../../../assets/icons/setting-blue.svg";
import settingImg from "../../../../../assets/icons/settingImg.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addComponent,
  removeComponent,
} from "@/redux/services/userComponentsListSlice";
import check from "../../../../../assets/icons/check.svg";
import styles from "./style.module.css";

export function OfferItem({ offer, data }: any) {
  const [isAddedToConfugurator, setIsAddedToCounfigurator] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const dispatch = useAppDispatch();
  const userCompilationList = useAppSelector(
    (state) => state.userComponentsListReducer
  );
  useEffect(() => {
    if (
      userCompilationList[data.componentType]?.find(
        (component: any) => component.id === data.id
      )
    ) {
      setIsAddedToCounfigurator(true);
    }
  }, []);
  const handleAddToConfigurationClick = () => {
    if (!data) {
      return;
    }
    if (isAddedToConfugurator === true) {
      dispatch(removeComponent<any>({component: data, store: offer.store.name}));
      setIsAddedToCounfigurator(false);
      return;
    }
    dispatch(addComponent<any>({ data, store: offer.store.name }));
    setIsAddedToCounfigurator(true);
  };
  return (
    <div key={offer.id}>
      <div className="max-lg:hidden">
        <div className="flex gap-[45px] items-center justify-between">
          <a href={offer.buyLink} className="flex items-center gap-[45px]">
            <Image
              width={96}
              height={96}
              src={
                data?.pictures[0]?.url ? data?.pictures[0]?.url : settingImage
              }
              alt={"empty img"}
            />
            <div className="max-w-[359px]">
              <h3 className="text-[28px]">{data?.name} </h3>

              <div className="flex items-center gap-[5px] flex-wrap">
                {data?.propertyCategories[0].properties
                  .slice(0, 10)
                  .map((e: any) => {
                    return (
                      <p
                        key={e.id}
                        className="text-[16px] font-bold text-[#00000050]"
                      >
                        {e.value}
                      </p>
                    );
                  })}
              </div>
            </div>
          </a>
          <button
            onClick={() => handleAddToConfigurationClick()}
            onMouseEnter={() => {
              setIsButtonHover(true);
            }}
            onMouseLeave={() => {
              setIsButtonHover(false);
            }}
            className={`px-[10px] pr-[17px] py-[8px] border-solid border-[1.5px] rounded-[5px] ${
              isAddedToConfugurator || isButtonHover
                ? `border-[#0260E8]
              text-[#0260E8]`
                : `border-[#717171]
              text-[#717171]`
            }  text-[16px] flex gap-[10px] items-center`}
          >
            Добавить&nbsp;в&nbsp;конфигуратор
            {isAddedToConfugurator || isButtonHover ? (
              <Image
                style={{ fill: "#0260E8" }}
                src={settingImage}
                width={24}
                height={24}
                alt={"settingImg"}
              />
            ) : (
              <Image
                style={{ fill: "#717171" }}
                src={settingImg}
                width={24}
                height={24}
                alt={"settingImg"}
              />
            )}
          </button>
          <h3 className={styles.price}>{(offer?.price).toLocaleString()}₽</h3>
          <Link className={styles.store} href={offer.buyLink}>
            <Image
              width={96}
              height={96}
              src={
                offer?.store?.logo?.url ? offer?.store?.logo?.url : settingImg
              }
              alt={"empty img"}
            />
          </Link>
        </div>
        <div className="w-full bg-[#9E9E9E25] h-[1px] my-[22px]" />
      </div>
      <div
        style={{ fontFamily: "source-sans-pro-regular" }}
        className="lg:hidden max-w-[300px] mx-auto"
      >
        <div className="flex items-center justify-between">
          <Link href={offer.buyLink} className="flex items-center gap-[12px]">
            <Image
              width={58}
              height={58}
              src={
                data?.pictures[0]?.url ? data?.pictures[0]?.url : settingImage
              }
              alt={"empty img"}
            />
            <div>
              <h3 className="text-[14px] ">{data?.name} </h3>

              <div className="flex items-center gap-[5px] flex-wrap">
                {data?.propertyCategories[0].properties
                  .slice(0, 10)
                  .map((e: any) => {
                    return (
                      <p key={e.id} className="text-[12px]  text-[#00000050]">
                        {e.value}
                      </p>
                    );
                  })}
              </div>
            </div>
          </Link>
          <button className="p-[4px] border-solid border-[2px] rounded-[5px] border-[#717171] flex justify-center items-center ">
            <Image src={settingImg} width={29} height={29} alt={"setting"} />
          </button>
        </div>
        <div className="flex justify-end items-center gap-[22px]">
          <h3 className="text-[26px] font-bold">
            {(offer?.price).toLocaleString()}р
          </h3>
          <Link  href={offer?.buyLink}>
            <Image
              width={51}
              height={51}
              src={
                offer?.store?.logo?.url ? offer?.store?.logo?.url : settingImg
              }
              alt={"empty img"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
