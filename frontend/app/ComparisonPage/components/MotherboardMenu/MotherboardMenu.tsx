"use client";
import React from "react";
import styles from "../style.module.css";
import cx from "classnames";

export default function MotherboardMenu({
  comparison,
  motherboardData,
  isHide,
}: any) {
  let haveMotherboard = comparison.compilationsList.reduce(
    (acc: any, compilation: any) => {
      return acc + compilation.motherboard.length;
    },
    0
  );
  if (!haveMotherboard) {
    return;
  }
  return (
    <>
      {motherboardData.length === 0 ? (
        <div
          className={!isHide ? styles.open : styles.close}
          style={{ height: "567px", width: "100%" }}
        ></div>
      ) : (
        <div
          className={cx(
            styles.descriptionContainer,
            !isHide ? styles.open : styles.close
          )}
        >
          <div className={styles.rowContainer}>
            <p className={styles.descriptionStyle} style={{ flex: 1 }}>
              {motherboardData[0].name}
            </p>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Цена</p>
                <p className={styles.descriptionStyle}>
                  {motherboardData[0].offers[0].price}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Socket</p>
                <p className={styles.descriptionStyle}>
                  {motherboardData[0].propertyCategories[0].properties[2].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Чип сет</p>
                <p className={styles.descriptionStyle}>
                  {motherboardData[0].propertyCategories[0].properties[3].value}
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
                  {motherboardData[0].propertyCategories[0].properties[4].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Тип памяти</p>
                <p className={styles.descriptionStyle}>
                  {motherboardData[0].propertyCategories[6].properties[0].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Кол-во слотов памяти</p>
                <p className={styles.descriptionStyle}>
                  {motherboardData[0].propertyCategories[6].properties[2].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
        </div>
      )}
    </>
  );
}
