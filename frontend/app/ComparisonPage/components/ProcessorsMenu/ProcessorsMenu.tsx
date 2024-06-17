import React from "react";
import styles from "../style.module.css";
import cx from "classnames";

export default function ProcessorsMenu({
  comparison,
  processorData,
  isHide,
}: any) {
  let haveProcessors = comparison.compilationsList.reduce(
    (acc: any, compilation: any) => {
      return acc + compilation.processor.length;
    },
    0
  );
  if (!haveProcessors) {
    return;
  }
  return (
    <>
      {processorData.length === 0 ? (
        <div
          className={!isHide ? styles.open : styles.close}
          style={{ height: "735px", width: "100%" }}
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
              {processorData[0].name}
            </p>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Магазин</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].offers[0].store.name}
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
                  {processorData[0].offers[0].price} руб.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Количество ядер</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].propertyCategories[2].properties[1].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Количество потоков</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].propertyCategories[2].properties[3].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Базовая частота</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].propertyCategories[1].properties[0].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Частота в Turbo Boost</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].propertyCategories[1].properties[1].value}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.hzline} />
          <div className={styles.descriptionContainer}>
            <div className={styles.rowContainer}>
              <div className={styles.descriptionSecondContainer}>
                <p className={styles.shopStyle}>Тип оперативной памяти</p>
                <p className={styles.descriptionStyle}>
                  {processorData[0].propertyCategories[4].properties[0].value}
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
                  {processorData[0].propertyCategories[3].properties[0].value}
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
