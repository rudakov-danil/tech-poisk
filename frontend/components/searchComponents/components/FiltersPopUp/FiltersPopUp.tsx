"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import arrow from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
interface Props {
  children: JSX.Element[] | JSX.Element;
  title: string;
}
export default function FiltersPopUp({ children, title }: Props) {
  const [open, isOpen] = useState(true);
  return (
    <div className={styles["container"]}>
      <button
        onClick={() => isOpen(!open)}
        className={cx(styles["button"], open ? styles["margin-top-style"] : "")}
      >
        <Image
          src={arrow}
          width={14}
          height={14}
          alt="arrow"
          className={cx(open ? styles["no-rotate"] : styles["rotate"])}
        />
        <p className="font-normal text-[20px]">{title}</p>
      </button>
      <div className={open ? styles["open"] : styles["close"]}>{children}</div>
    </div>
  );
}
