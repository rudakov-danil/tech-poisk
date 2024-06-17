import Image from "next/image";
import AssemblyBlock from "../AssemblyBlock/AssemblyBlock";
import CaseFanMenu from "../CaseFanMenu/CaseFanMenu";
import CaseMenu from "../CaseMenu/CaseMenu";
import CoolingMenu from "../CoolingMenu/CoolingMenu";
import HDDMenu from "../HDDMenu/HDDMenu";
import MotherboardMenu from "../MotherboardMenu/MotherboardMenu";
import ProcessorsMenu from "../ProcessorsMenu/ProcessorsMenu";
import RAMMenu from "../RAMMenu/RAMMenu";
import SSDMMenu from "../SSDMMenu/SSDMMenu";
import SSDMenu from "../SSDMenu/SSDMenu";
import VideoCardsMenu from "../VideoCardsMenu/VideoCardsMenu";
import styles from "../style.module.css";
import arrowDown from "../../../../assets/icons/arrow-down.svg";
import { useState } from "react";
import cx from "classnames";
import PowerUnitMenu from "../PowerUnitMenu/PowerUnitMenu";
export function CompilationColumn({
  compilation,
  index,
  comparison,
  setComparison,
  setIsHideMotherboardMenu,
  isHideMotherboardMenu,
  isHideProcessorsMenu,
  setIsHideProcessorsMenu,
  setIsHideGraphicsCardMenu,
  isHideGraphicsCardMenu,
  setIsHideRamMenu,
  isHideRamMenu,
  isHideCoolerMenu,
  setIsHideCoolerMenu,
  isHideCaseFunMenu,
  setIsHideCaseFunMenu,
  isHideCaseMenu,
  setIsHideCaseMenu,
}: any) {
  return (
    <>
      <AssemblyBlock
        setComparison={setComparison}
        index={index}
        compilation={compilation}
      />{" "}
      <>
        {index === 0 ? (
          <button
            className={styles.hideButton}
            onClick={() => setIsHideMotherboardMenu(!isHideMotherboardMenu)}
          >
            <h3 className={styles.title}>Материнская плата</h3>
            <Image
              src={arrowDown}
              alt={"arrow-down"}
              className={cx(
                isHideMotherboardMenu ? styles.rotateImg : styles.rotate180Img
              )}
            />
          </button>
        ) : (
          <div style={{ height: "42px", width: "100%" }}></div>
        )}

        <MotherboardMenu
          comparison={comparison}
          isHide={isHideMotherboardMenu}
          motherboardData={compilation.motherboard}
        />
      </>
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideProcessorsMenu(!isHideProcessorsMenu)}
        >
          <h3 className={styles.title}>Процессоры</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideProcessorsMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <ProcessorsMenu
        comparison={comparison}
        isHide={isHideProcessorsMenu}
        processorData={compilation.processor}
      />
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideGraphicsCardMenu(!isHideGraphicsCardMenu)}
        >
          <h3 className={styles.title}>Видеокарты</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideGraphicsCardMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <VideoCardsMenu
        isHide={isHideGraphicsCardMenu}
        graphicsCard={compilation.gpu}
        comparison={comparison}
      />
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideRamMenu(!isHideRamMenu)}
        >
          <h3 className={styles.title}>Оперативная память</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideRamMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <RAMMenu
        comparison={comparison}
        isHide={isHideRamMenu}
        ramData={compilation.ram}
      />
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideCoolerMenu(!isHideCoolerMenu)}
        >
          <h3 className={styles.title}>Охлаждение</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideCoolerMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <CoolingMenu
        comparison={comparison}
        isHide={isHideCoolerMenu}
        coolerData={compilation.cooler}
      />
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideCaseFunMenu(!isHideCaseFunMenu)}
        >
          <h3 className={styles.title}>Доп. Охлаждение</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideCaseFunMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <CaseFanMenu
        comparison={comparison}
        isHide={isHideCaseFunMenu}
        caseFanData={compilation.case_fans}
      />
      {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideCaseMenu(!isHideCaseMenu)}
        >
          <h3 className={styles.title}>Корпус</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideCaseMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
      <CaseMenu
        comparison={comparison}
        isHide={isHideCaseMenu}
        caseData={compilation.case}
      />
      {/* {!!compilation.hdd.length && (
        <>
          <SSDMMenu hddData={compilation.hdd} />
          <HDDMenu hddData={compilation.hdd} />
        </>
      )}  */}
      {/* {index === 0 ? (
        <button
          className={styles.hideButton}
          onClick={() => setIsHideCaseMenu(!isHideCaseMenu)}
        >
          <h3 className={styles.title}>Корпус</h3>
          <Image
            src={arrowDown}
            alt={"arrow-down"}
            className={cx(
              isHideCaseMenu ? styles.rotateImg : styles.rotate180Img
            )}
          />
        </button>
      ) : (
        <div style={{ height: "42px", width: "100%" }}></div>
      )}
    <PowerUnitMenu /> */}
    </>
  );
}
