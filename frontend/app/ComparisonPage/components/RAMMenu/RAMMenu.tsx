import React from "react";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
import Image from "next/image";

interface props {
  countAssembly: number;
}
export default function RAMMenu({ ramData, isHide, comparison }: any) {
  let maxCount = 0;
  comparison?.compilationsList.map((compilation: any) => {
    if (compilation.ram.length > maxCount) {
      maxCount = compilation.ram.length;
    }
  });

  if (ramData.length === 0) {
    return (
      <div
        className={!isHide ? styles.open : styles.close}
        style={{
          height: `${648 * maxCount + (20 * maxCount) / 2}px`,
          width: "100%",
        }}
      ></div>
    );
  }
  return (
    <>
      {ramData.map((ram: any) => {
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
                  {ram.name}
                </p>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Магазин</p>
                    <p className={styles.descriptionStyle}>
                      {ram.offers[0].store.name}
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
                      {ram.offers[0].price} руб.
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
                      {ram.propertyCategories[0].properties[3].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Объём одного модуля</p>
                    <p className={styles.descriptionStyle}>
                      {ram.propertyCategories[0].properties[5].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Количество модулей</p>
                    <p className={styles.descriptionStyle}>
                      {ram.propertyCategories[0].properties[6].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Тактовая частота</p>
                    <p className={styles.descriptionStyle}>
                      {ram.propertyCategories[1].properties[0].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>CAS Latency (CL)</p>
                    <p className={styles.descriptionStyle}>
                      {ram.propertyCategories[1].properties[2].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
            </div>
            {ramData.length < maxCount && (
              <div
                className={!isHide ? styles.open : styles.close}
                style={{
                  height: `${(maxCount - ramData.length) * 648}px`,
                  width: "100%",
                }}
              ></div>
            )}
          </>
        );
      })}
    </>
  );
}
