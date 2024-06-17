import Image from "next/image";
import Link from "next/link";
import React from "react";
import externalLink from "@/assets/icons/external-link.svg";
import blackCross from "@/assets/icons/black-cross.svg";

export function BuyingComponentsModal({
  buyModalData,
  setShowBuyModal,
}: {
  buyModalData: any;
  setShowBuyModal: any;
}) {
  return (
    <div
      className="w-full h-full backdrop-blur-sm z-[15000] max-lg:z-[199] fixed left-[0] right-[0] top-[0] max-lg:top-[62px] flex flex-col justify-center items-center "
      onClick={() => setShowBuyModal(false)}
    >
      <div
        className="max-w-[960px] rounded-[20px] shadow-xl bg-[white] max-h-[793px] overflow-y-auto p-[24px] max-lg:max-w-[100%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-normal text-[32px] text-[black] mb-[20px] max-lg:text-[20px]">
            Купить сборку
          </h2>
          <button
            onClick={() => setShowBuyModal(false)}
            className=" top-[48px] right-[40px] max-lg:top-[28px] max-lg:right-[20px]"
          >
            <Image
              src={blackCross}
              width={24}
              height={24}
              alt="logo component"
              className=""
            />
          </button>
        </div>
        {buyModalData.map((elem: any, index: number) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between border-b border-solid border-gray-300  py-[24px] "
            >
              <div className="flex items-center">
                <Image
                  src={elem.pictures}
                  width={72}
                  height={72}
                  alt="logo component"
                  className="max-lg:w-[30px] max-lg:h-[30px]"
                />
                <div className="flex flex-col gap-[6px] max-w-[495px] ml-[28px] max-lg:ml-[5px] mr-[10px]">
                  <h3 className="max-lg:text-[12px]">{elem.name}</h3>
                  <div className="flex gap-[5px] flex-wrap max-lg:hidden">
                    {elem.description.map((e: any, index: number) => {
                      return (
                        <p className="text-[14px] text-[#9e9e9e]" key={index}>
                          {e.value}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <a
                target="_blank"
                href={elem.buyLink}
                className="whitespace-nowrap flex items-center gap-[10px] text-[white] text-[20px] rounded-[38px] bg-[#0260e8] py-[12px] px-[35px] max-lg:text-[14px] max-lg:py-[7px] max-lg:px-[21px] hover:bg-[#599eff]"
              >
                В магазин{" "}
                <Image
                  src={externalLink}
                  width={24}
                  height={24}
                  alt="externalLink"
                  className="max-lg:hidden"
                />
              </a>
            </div>

            // <Link
            //   className={``}
            //   target="_blank"
            //   href={elem.buyLink}
            //   key={index}
            // >
            //   {elem.name}
            // </Link>
          );
        })}
      </div>
    </div>
  );
}
