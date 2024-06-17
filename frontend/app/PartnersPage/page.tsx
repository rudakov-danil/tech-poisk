import { NavigationComponent } from "@/components/NavigationComponent/NavigationComponent";
import Image from "next/image";
import React from "react";
import telegramIcon from "@/assets/icons/telegram-blue.svg";
import mailIcon from "@/assets/icons/mail-blue.svg";

export default function page() {
  return (
    <div className="flex items-start max-lg:flex-col gap-[34px] mt-[20px]">
      <NavigationComponent currentPage={"PartnersPage"} />
      <div>
        <p className="text-[32px]">Партнёрам</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />
        <p className="text-[18px] mb-[25px] max-lg:text-[16px]">
          К сожалению, наша автоматизированная партнёрская программа ещё не
          готова.
        </p>
        <p className="text-[18px] max-lg:text-[16px]">
          Для начала сотрудничества с нашим сервисом вам следует обратиться на
          почту или в <br />
          Телеграм:
        </p>
        <a
          target="_blank"
          href="https://t.me/techworld_qa"
          className="flex gap-[5px] items-center mb-[10px] underline mt-[20px] text-[#0260E8]"
        >
          <Image src={telegramIcon} width={20} height={12} alt="telegram" />{" "}
          <p className="text-[18px] max-lg:text-[16px] font-bold">
            @techworld_qa
          </p>
        </a>
        <a
          href="mailto:request@techpoisk.com"
          className="flex gap-[5px] items-center"
        >
          <Image src={mailIcon} width={20} height={12} alt="telegram" />{" "}
          <p className="text-[18px] max-lg:text-[16px] underline text-[#0260E8] font-bold">
            request@techpoisk.com
          </p>
        </a>
      </div>
    </div>
  );
}
