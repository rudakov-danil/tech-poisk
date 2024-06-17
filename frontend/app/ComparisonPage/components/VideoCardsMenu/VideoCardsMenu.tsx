import React from "react";
import styles from "../style.module.css";
import cx from "classnames";

export default function VideoCardsMenu({
  graphicsCard,
  isHide,
  comparison,
}: any) {
  let maxGpuCount = 0;
  comparison?.compilationsList.map((compilation: any) => {
    if (compilation.gpu.length > maxGpuCount) {
      maxGpuCount = compilation.gpu.length;
    }
  });

  if (graphicsCard.length === 0) {
    return (
      <div
        className={!isHide ? styles.open : styles.close}
        style={{
          height: `${487 * maxGpuCount + (20 * maxGpuCount) / 2}px`,
          width: "100%",
        }}
      ></div>
    );
  }
  return graphicsCard?.map((gpu: any, index: any) => {
    return (
      <>
        <div
          key={index}
          className={cx(
            styles.descriptionContainer,
            !isHide ? styles.open : styles.close
          )}
        >
          <div className={styles.rowContainer}>
            <p className={styles.descriptionStyle} style={{ flex: 1 }}>
              {gpu.name}
            </p>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Магазин</p>
                <p className={styles.descriptionStyle}>
                  {gpu.offers[0].store.name}
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
                  {gpu.offers[0].price} руб.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Объём памяти</p>
                <p className={styles.descriptionStyle}>
                  {gpu.propertyCategories[3].properties[0].value}
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
                  {gpu.propertyCategories[3].properties[1].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>TDP</p>
                <p className={styles.descriptionStyle}>
                  {gpu.propertyCategories[4].properties[2].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
        </div>
        {graphicsCard.length < maxGpuCount && (
          <div
            className={!isHide ? styles.open : styles.close}
            style={{
              height: `${(maxGpuCount - graphicsCard.length) * 487}px`,
              width: "100%",
            }}
          ></div>
        )}
      </>
    );
  });
}
