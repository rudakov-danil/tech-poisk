import { NavigationComponent } from "@/components/NavigationComponent/NavigationComponent";
import React from "react";

export default function page() {
  return (
    <div className="flex items-start max-lg:flex-col gap-[34px] mt-[20px]">
      <NavigationComponent currentPage={"paymentAndDeliveryPage"} />
      <div>
        <p className="text-[32px]">Оплата и доставка</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />
        <p className="text-[18px] max-lg:text-[16px]">
          Уважаемые пользователи, компания “Техпоиск” не продаёт товары, а
          является информационным порталом для выбора товара и поиска лучшей
          цены.
        </p>
        <br />
        <br />
        <p className="text-[18px] max-lg:text-[16px]">
          Мы не предоставляем консультации о товарах. Если у вас возникли
          вопросы по товарам, их оплате или доставке, вам следует обратиться в
          службу поддержки выбранного магазина.
        </p>
      </div>
    </div>
  );
}
