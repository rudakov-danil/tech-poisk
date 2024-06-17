"use client";
import React from "react";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
import { useState } from "react";
import Image from "next/image";

export default function CaseFanMenu({ caseFanData, comparison, isHide }: any) {
  let maxCount = 0;
  comparison?.compilationsList.map((compilation: any) => {
    if (compilation.cooler.length > maxCount) {
      maxCount = compilation.cooler.length;
    }
  });

  if (caseFanData?.length === 0 || caseFanData === undefined) {
    return (
      <div
        className={!isHide ? styles.open : styles.close}
        style={{
          height: `${550 * maxCount + (20 * maxCount) / 2}px`,
          width: "100%",
        }}
      ></div>
    );
  }

  return (
    <>
      {caseFanData?.map((cooler: any, index: any) => {
        return (
          <div
            key={index}
            className={cx(
              styles.descriptionContainer,
              !isHide ? styles.open : styles.close
            )}
          >
            <div className={styles.rowContainer}>
              <p className={styles.descriptionStyle} style={{ flex: 1 }}>
                Cooler Master Sickleflow 120 ARGB White 3 in 1
              </p>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Магазин</p>
                  <p className={styles.descriptionStyle}>Онлайн.Трейд</p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Цена</p>
                  <p className={styles.descriptionStyle}>7898 руб.</p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Количество вентиляторов</p>
                  <p className={styles.descriptionStyle}>3</p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Размер вентиляторов</p>
                  <p className={styles.descriptionStyle}>120x120</p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Максимальная скорость</p>
                  <p className={styles.descriptionStyle}>1800 об/мин</p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
          </div>
        );
      })}
    </>
  );
}
