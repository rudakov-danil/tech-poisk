"use client";

import styles from "./page.module.css";
import { ConfiguratorTable } from "@/components/configuratorTable/ConfiguratorTable";
import Image from "next/image";
import { useState } from "react";
import guideIcon from "@/assets/icons/guid-icon.svg";
import usersAssemblingsIcon from "@/assets/icons/users-assemblings-icon.svg";
import starCircle from "@/assets/icons/star-circle.svg";
import userCircle from "@/assets/icons/user-circle.svg";

export default function Home() {
  return (
    <div className={styles["home"]}>
      <div className="mx-auto">
        <h1 className={styles["title-page"]}>Конфигуратор ПК</h1>
        <div className=" flex justify-between gap-[29px] mt-[18px]  lg:!hidden">
          <button className="flex justify-between items-center px-[8px] py-[2px] bg-[#ffdce0] text-[11px] rounded-[5px] text-left w-full h-[49px]">
            Гид по сборке{" "}
            <Image
              src={starCircle}
              width={40}
              height={42}
              alt="guideIcon"
              className="ml-[18px]"
            />
          </button>
          <button className="flex justify-between items-center px-[8px] py-[2px] bg-[#E2EEFF] text-[11px] rounded-[5px] text-left w-full h-[49px]">
            Сборки пользователей{" "}
            <Image
              src={userCircle}
              width={40}
              height={42}
              alt="usersAssemblingsIcon"
              className="ml-[18px]"
            />
          </button>
        </div>
        <div className={styles["main"]}>
          <ConfiguratorTable />
        </div>
      </div>
    </div>
  );
}
