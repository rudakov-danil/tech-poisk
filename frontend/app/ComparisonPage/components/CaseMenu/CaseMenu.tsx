"use client";
import React from "react";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
import { useState } from "react";
import Image from "next/image";

export default function CaseMenu({ comparison, isHide, caseData }: any) {
  let maxCount = 0;
  comparison?.compilationsList.map((compilation: any) => {
    if (compilation.case.length > maxCount) {
      maxCount = compilation.case.length;
    }
  });

  if (caseData?.length === 0) {
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

  if (caseData.length === 0) {
    return;
  }
  return (
    <>
      <div
        className={cx(
          styles.descriptionContainer,
          !isHide ? styles.open : styles.close
        )}
      >
        <div className={styles.rowContainer}>
          <p className={styles.descriptionStyle} style={{ flex: 1 }}>
            {caseData[0].name}
          </p>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Магазин</p>
              <p className={styles.descriptionStyle}>
                {caseData[0].offers[0].store.name}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Цена</p>
              <p className={styles.descriptionStyle}>
                {caseData[0].offers[0].price}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Форм-фактор</p>
              <p className={styles.descriptionStyle}>
                {caseData[0].propertyCategories[0].properties[2].value}
              </p>
            </div>
          </div>
        </div>
        {/* <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Форм-фактор мат. платы</p>
              <p className={styles.descriptionStyle}>
                {caseData[0].propertyCategories[0].properties[2].value}
              </p>
            </div>
          </div>
        </div> */}
        {/* <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Материал окна</p>
              <p className={styles.descriptionStyle}>Закаленное стекло</p>
            </div>
          </div>
        </div> */}
        <div className={styles.hzline} />
      </div>
    </>
  );
}
