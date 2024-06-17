"use client";
import React from "react";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
import { useState } from "react";
import Image from "next/image";

export default function HDDMenu({ hddData }: any) {
  const [isHide, setIsHide] = useState(false);
  // console.log(hddData);
  return (
    <>
      {hddData.map((hdd: any) => {
        return (
          <>
            <button
              className={styles.hideButton}
              onClick={() => setIsHide(!isHide)}
            >
              <h3 className={styles.title}>HDD 3.5</h3>
              <Image
                src={arrowDown}
                alt={"arrow-down"}
                className={cx(isHide ? styles.rotateImg : styles.rotate180Img)}
              />
            </button>
            <div className={styles.rowContainer}>
              <p className={styles.descriptionStyle} style={{ flex: 1 }}>
                {hdd.name}
              </p>
            </div>
            <div
              className={cx(
                styles.descriptionContainer,
                !isHide ? styles.open : styles.close
              )}
            >
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Магазин</p>
                    <p className={styles.descriptionStyle}>
                      {hdd.offers[0].store.name}
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
                      {hdd.offers[0].price} руб.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Объем накопителя</p>
                    <p className={styles.descriptionStyle}>
                      {hdd.propertyCategories[1].properties[3].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Интерфейс</p>
                    <p className={styles.descriptionStyle}>
                      {hdd.propertyCategories[1].properties[2].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>
                      Скорость вращения шпинделя
                    </p>
                    <p className={styles.descriptionStyle}>
                      {hdd.propertyCategories[1].properties[5].value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hzline} />
              <div className={styles.descriptionContainer}>
                <div className={styles.rowContainer}>
                  <div className={styles.descriptionSecondContainer}>
                    <p className={styles.shopStyle}>Объём буферной памяти</p>
                    <p className={styles.descriptionStyle}>
                      {hdd.propertyCategories[1].properties[4].value}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.hzline} />
            </div>
          </>
        );
      })}
    </>
  );
}
