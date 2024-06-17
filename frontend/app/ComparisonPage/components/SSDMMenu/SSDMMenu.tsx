"use client";
import React from "react";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import cx from "classnames";
import { useState } from "react";
import Image from "next/image";
export default function SSDMMenu({ hddData }: any) {
  const [isHide, setIsHide] = useState(false);

  return (
    <div
      className={styles.container}
      // style={{ maxWidth: `calc(${countAssembly} * 290px )` }} //countAssembly отсутствует, доделаешь крч потом
    >
      <button className={styles.hideButton} onClick={() => setIsHide(!isHide)}>
        <h3 className={styles.title}>SSD M.2</h3>
        <Image
          src={arrowDown}
          alt={"arrow-down"}
          className={cx(isHide ? styles.rotateImg : styles.rotate180Img)}
        />
      </button>
      <div className={styles.rowContainer}>
        <p className={styles.descriptionStyle} style={{ flex: 1 }}>
          1Tb ADATA Legend 960 Max
        </p>
        <p className={styles.descriptionStyle} style={{ flex: 1 }}>
          1Tb ADATA Legend 960 Max
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
              <p className={styles.descriptionStyle}>Онлайн.Трейд</p>
            </div>
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
              <p className={styles.descriptionStyle}>7898 rub.</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Цена</p>
              <p className={styles.descriptionStyle}>7898 rub.</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Объем накопителя</p>
              <p className={styles.descriptionStyle}>1 000 Гб</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Объем накопителя</p>
              <p className={styles.descriptionStyle}>1 000 Гб</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Интерфейс</p>
              <p className={styles.descriptionStyle}>PCI-E 4.0 x4</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Интерфейс</p>
              <p className={styles.descriptionStyle}>PCI-E 4.0 x4</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Скорость чтения</p>
              <p className={styles.descriptionStyle}>7400 МБ/сек</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Скорость чтения</p>
              <p className={styles.descriptionStyle}>7400 МБ/сек</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Скорость записи</p>
              <p className={styles.descriptionStyle}>6000 МБ/сек</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Скорость записи</p>
              <p className={styles.descriptionStyle}>6000 МБ/сек</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Ресурс перезаписи (TBW)</p>
              <p className={styles.descriptionStyle}>780 тб</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Ресурс перезаписи (TBW)</p>
              <p className={styles.descriptionStyle}>780 тб</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
        <div className={styles.descriptionContainer}>
          <div className={styles.rowContainer}>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Время наработки на отказ</p>
              <p className={styles.descriptionStyle}>2000000 ч</p>
            </div>
            <div className={styles.descriptionSecondContainer}>
              <p className={styles.shopStyle}>Время наработки на отказ</p>
              <p className={styles.descriptionStyle}>2000000 ч</p>
            </div>
          </div>
        </div>
        <div className={styles.hzline} />
      </div>
    </div>
  );
}
