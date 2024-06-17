import { NavigationComponent } from "@/components/NavigationComponent/NavigationComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import telegramIcon from "@/assets/icons/telegram-blue.svg";
import mailIcon from "@/assets/icons/mail-blue.svg";
// import smileFace from "@/assets/images/smileFace.jpg";

enum components {
  aboutCompany = "about_company",
  contacts = "contacts",
  partners = "partners",
  personalData = "personal_data",
  feedback = "feedback",
  paymentAndDelivery = "payment_and_delivery",
}

export default function page() {
  return (
    <div className="flex items-start max-lg:flex-col gap-[34px] mt-[20px]">
      <NavigationComponent currentPage={"ContactsPage"} />
      <div className="flex flex-col">
        <p className="text-[32px] font-bold">Контакты</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />
        <p className="text-[18px] max-lg:text-[16px]">
          Уважаемые пользователи, компания “Техпоиск” не продаёт товары, а
          является информационным порталом для выбора товара и поиска лучшей
          цены.
        </p>
        <br />
        <br />
        <p className="text-[18px] max-lg:text-[16px] mb-[30px]">
          Мы не предоставляем консультации о товарах. Если у вас возникли
          вопросы по товарам, их оплате или доставке, вам следует обратиться в
          службу поддержки выбранного магазина.
        </p>
        <div className="flex justify-between flex-wrap">
          <div className="flex flex-col gap-[10px] justify-between">
            <p className="text-[18px] max-lg:text-[16px] font-bold">
              Для связи используйте
            </p>

            <a
              target="_blank"
              href="https://t.me/techworld_qa"
              className="flex gap-[5px] items-center mb-[10px] underline mt-[20px] text-[#0260E8]"
            >
              <Image src={telegramIcon} width={20} height={12} alt="telegram" />{" "}
              <p className="text-[18px] font-bold">@techworld_qa</p>
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
          <div className="flex flex-col gap-[10px] items-end max-lg:ml-auto">
            <p className="text-[18px] max-lg:text-[16px]">ООО “Техпоиск”</p>
            <p className="text-[18px] max-lg:text-[16px]">ИНН 4500013510</p>
            <p className="text-[18px] max-lg:text-[16px]">ОГРН 1244500001316</p>
            <p className="text-[18px] max-lg:text-[16px]">
              640002 г. Курган, ул. М.Горького д. 61
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
