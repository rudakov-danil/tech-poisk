"use client";
import styles from "./style.module.css";
export const Specifications = ({ property }: any) => {
  return (
    <div className={styles.specificationsContainer}>
      <h3>Краткие характеристики</h3>
      <ul className={styles.ulContainer}>
        {property.map((elem: any) => {
          return (
            <li key={elem.id}>
              <p>
                {elem.name}: <span>{elem.value}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
