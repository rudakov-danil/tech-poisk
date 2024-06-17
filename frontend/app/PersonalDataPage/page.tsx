import { NavigationComponent } from "@/components/NavigationComponent/NavigationComponent";
import React from "react";

export default function page() {
  return (
    <div className="flex items-start max-lg:flex-col gap-[34px] mt-[20px]">
      <NavigationComponent currentPage={"PersonalDataPage"} />
      <div className="w-full">
        <p className="text-[32px]">Пользовательское соглашение</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />
        <a
          href="/files/sogl.pdf"
          className="underline text-[26px] max-lg:text-[20px] hover:text-[#0260E8]"
        >
          Пользовательское соглашение
        </a>
        <p className="text-[32px] mt-[30px]">Политика данных</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />
        <a
          href="/files/policy.pdf"
          className="underline text-[26px] max-lg:text-[20px] hover:text-[#0260E8]"
        >
          Политика данных
        </a>
      </div>
    </div>
  );
}
