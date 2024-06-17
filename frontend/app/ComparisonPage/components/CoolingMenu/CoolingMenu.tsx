"use client";
import React from "react";
import styles from "../style.module.css";
import cx from "classnames";

export default function CoolingMenu({ coolerData, comparison, isHide }: any) {
  let maxCount = 0;
  comparison?.compilationsList.map((compilation: any) => {
    if (compilation.cooler.length > maxCount) {
      maxCount = compilation.cooler.length;
    }
  });

  if (coolerData?.length === 0) {
    return (
      <div
        className={!isHide ? styles.open : styles.close}
        style={{
          height: `${580 * maxCount + (20 * maxCount) / 2}px`,
          width: "100%",
        }}
      ></div>
    );
  }
  return (
    <>
      {coolerData.map((cooler: any, index: any) => {
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
                {cooler.name}
              </p>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Магазин</p>
                  <p className={styles.descriptionStyle}>
                    {cooler.offers[0].store.name}
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
                    {cooler.offers[0].price}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Тип охлаждения</p>
                  <p className={styles.descriptionStyle}>
                    {cooler.propertyCategories[0].properties[5].value}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Рассеиваемая мощность</p>
                  <p className={styles.descriptionStyle}>
                    {cooler.propertyCategories[0].properties[4].value}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Количество вентиляторов</p>
                  <p className={styles.descriptionStyle}>
                    {cooler.propertyCategories[2].properties[0].value}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.hzline} />
            <div className={styles.descriptionContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.descriptionSecondContainer}>
                  <p className={styles.shopStyle}>Размер вентилятора</p>
                  <p className={styles.descriptionStyle}>
                    {cooler.propertyCategories[2].properties[1].value}
                  </p>
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
