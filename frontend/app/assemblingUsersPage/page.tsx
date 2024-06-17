import React from "react";
import AssemblingComponent from "./components/AssemblingComponent/AssemblingComponent";
import styles from "./styles.module.css";
export default function page() {
  return (
    <div>
      <div className={styles["hzline"]} />
      <AssemblingComponent />
      <AssemblingComponent />
    </div>
  );
}
