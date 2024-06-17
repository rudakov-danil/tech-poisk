"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [buyModalData, setBuyModalData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(
        String(localStorage.getItem("buyComponentsData")) || "[]"
      );
      setBuyModalData(data);
    }
  }, []);

  return (
    <div className="pb-[61px] relative">
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="font-normal text-[32px] text-[black] mb-[20px] max-lg:text-[20px]">
            Купить сборку
          </h2>
        </div>
        {buyModalData?.map((elem: any, index: number) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              buyModalData.length - 1 !== index && "border-b"
            } border-solid border-gray-300 py-[24px]`}
          >
            <div className="flex items-center">
              <Image
                src={elem.pictures}
                width={82}
                height={82}
                alt="logo component"
                className="max-lg:w-[40px] max-lg:h-[40px] mr-[15px]"
              />
              <div className="flex flex-col gap-[6px] max-w-[495px] ml-[33px] max-lg:ml-[5px] mr-[10px]">
                <h3 className="max-lg:text-[12px]">{elem.name}</h3>
                <div className="flex gap-[5px] flex-wrap max-lg:hidden">
                  {elem.description.map((e: any, index: number) => (
                    <p className="text-[14px] text-[#9e9e9e]" key={index}>
                      {e.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <a
              target="_blank"
              href={elem.buyLink}
              className="whitespace-nowrap flex items-center gap-[10px] text-[white] text-[20px] rounded-[38px] bg-[#0260e8] py-[12px] px-[35px] max-lg:text-[14px] max-lg:py-[7px] max-lg:px-[21px] hover:bg-[#599eff]"
            >
              В магазин
            </a>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="sticky left-0 right-0 bottom-[80px] flex justify-center min-w-full bg-[#DDE1E7] rounded-[35px] text-[14px] font-bold py-[14px] px-[14px] hover:bg-[#dde1e7b9]"
      >
        Вернуться в конфигуратор
      </Link>
    </div>
  );
}
