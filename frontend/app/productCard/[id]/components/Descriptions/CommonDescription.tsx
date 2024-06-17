"use client";
import React from "react";
import styles from "./style.module.css";

export const CommonDescription = ({ data }: any) => {
  return (
    <>
      <div className="flex flex-wrap gap-[20px] justify-between max-lg:justify-center">
        {data?.propertyCategories?.map((e: any) => {
          return (
            <div className={styles.DescriptionBlock} key={e.id}>
              <h2 className={`${styles.DescriptionBlockTitle}`}>{e.name}</h2>

              {e?.properties.length === 0 ? (
                <p>Пусто</p>
              ) : (
                e?.properties.map((elem: any) => {
                  return (
                    <div className={styles.Description} key={elem.id}>
                      <div className={styles.DescriptionColumn}>
                        <div className={styles.DescriptionRow}>
                          <h3 className="!break-keep">{elem.name}</h3>
                          <p>
                            <span className="!break-keep">{elem.value}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
