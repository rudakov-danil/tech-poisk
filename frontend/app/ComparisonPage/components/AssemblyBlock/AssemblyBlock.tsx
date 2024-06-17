import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import imgSettings from "../../../../assets/icons/setting-2.svg";
import close from "../../../../assets/icons/close.png";

export default function AssemblyBlock({
  setComparison,
  index,
  compilation,
}: any) {
  const handleDeleteCompilationFromComparison = () => {
    const comparisonStorage = JSON.parse(
      String(localStorage.getItem("comparison")) || ""
    );
    const newCompilationsList = comparisonStorage.compilationsList.filter(
      (compilation: any, compilationIndex: any) => {
        return compilationIndex !== index;
      }
    );
    localStorage.setItem(
      "comparison",
      JSON.stringify({
        compilationsList: [...newCompilationsList],
        componentsList: [...comparisonStorage.componentsList],
      })
    );
    setComparison({
      compilationsList: [...newCompilationsList],
      componentsList: [...comparisonStorage.componentsList],
    });
  };
  const userCompliationPrice = Object.keys(compilation).reduce(
    (acc, category) => {
      if (compilation[category].length === 0) {
        return acc;
      } else if (compilation[category].length === 1) {
        return acc + compilation[category][0].offers[0].price;
      } else {
        return (
          acc +
          compilation[category].reduce((acc: any, component: any) => {
            return acc + component.offers[0].price;
          }, 0)
        );
      }
    },
    0
  );
  return (
    <>
      <div className={styles.descriptionContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={
              compilation?.case[0]?.pictures !== undefined
                ? compilation?.case[0]?.pictures[0]?.url
                : compilation?.motherboard[0]?.pictures !== undefined
                ? compilation?.motherboard[0]?.pictures[0].url
                : imgSettings
            }
            alt="img"
            width={190}
            height={190}
            className={styles.image}
            sizes={"100%"}
          />
          <button
            className={styles.close}
            onClick={handleDeleteCompilationFromComparison}
          >
            <Image alt="close" src={close} />
          </button>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <h2>{userCompliationPrice} </h2>
            <h3>Сборка {index + 1}</h3>
          </div>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.7679 6.98684C26.3079 5.50173 24.3724 4.5953 22.3112 4.43129C20.25 4.26728 18.199 4.8565 16.5286 6.09252C14.7761 4.77011 12.5948 4.17046 10.4239 4.41434C8.25308 4.65821 6.25394 5.7275 4.82909 7.40687C3.40424 9.08624 2.65952 11.2509 2.74489 13.4651C2.83025 15.6792 3.73937 17.7783 5.28917 19.3396L13.8427 28.0312C14.5589 28.7464 15.5236 29.1472 16.5286 29.1472C17.5335 29.1472 18.4982 28.7464 19.2144 28.0312L27.7679 19.3396C29.3761 17.698 30.2788 15.4776 30.2788 13.1632C30.2788 10.8488 29.3761 8.62838 27.7679 6.98684ZM25.8258 17.4112L17.2723 26.0889C17.175 26.1886 17.0592 26.2677 16.9315 26.3218C16.8038 26.3758 16.6669 26.4036 16.5286 26.4036C16.3902 26.4036 16.2533 26.3758 16.1256 26.3218C15.998 26.2677 15.8821 26.1886 15.7848 26.0889L7.23127 17.3693C6.15108 16.2491 5.5462 14.7443 5.5462 13.1772C5.5462 11.6101 6.15108 10.1053 7.23127 8.98508C8.33201 7.88254 9.81657 7.26432 11.3634 7.26432C12.9102 7.26432 14.3948 7.88254 15.4955 8.98508C15.6236 9.11605 15.7759 9.22001 15.9438 9.29095C16.1116 9.36189 16.2916 9.39842 16.4735 9.39842C16.6553 9.39842 16.8353 9.36189 17.0032 9.29095C17.171 9.22001 17.3234 9.11605 17.4514 8.98508C18.5521 7.88254 20.0367 7.26432 21.5835 7.26432C23.1304 7.26432 24.6149 7.88254 25.7156 8.98508C26.8107 10.0906 27.4354 11.5872 27.456 13.1544C27.4766 14.7215 26.8914 16.2345 25.8258 17.3693V17.4112Z"
              fill="#FF5252"
            />
          </svg>
        </div>
        <div className={styles.buttonContainer}>
          <button>Купить</button>
          <button>
            Открыть в
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 16.1248C10.499 16.1248 8.875 14.5008 8.875 12.4998C8.875 10.4988 10.499 8.87476 12.5 8.87476C14.501 8.87476 16.125 10.4988 16.125 12.4998C16.125 14.5008 14.501 16.1248 12.5 16.1248ZM12.5 10.3248C11.3013 10.3248 10.325 11.3011 10.325 12.4998C10.325 13.6984 11.3013 14.6748 12.5 14.6748C13.6987 14.6748 14.675 13.6984 14.675 12.4998C14.675 11.3011 13.6987 10.3248 12.5 10.3248Z"
                fill="#717171"
              />
              <path
                d="M15.6031 22.3501C15.4001 22.3501 15.1971 22.3211 14.9941 22.2728C14.3947 22.1085 13.8921 21.7315 13.5731 21.1998L13.4571 21.0065C12.8867 20.0205 12.1037 20.0205 11.5334 21.0065L11.4271 21.1901C11.1081 21.7315 10.6054 22.1181 10.0061 22.2728C9.39706 22.4371 8.76873 22.3501 8.23706 22.0311L6.5744 21.0741C5.98473 20.7358 5.5594 20.1848 5.37573 19.5178C5.20173 18.8508 5.28873 18.1645 5.62706 17.5748C5.9074 17.0818 5.98473 16.6371 5.8204 16.3568C5.65606 16.0765 5.2404 15.9121 4.67006 15.9121C3.25873 15.9121 2.1084 14.7618 2.1084 13.3505V11.6491C2.1084 10.2378 3.25873 9.08747 4.67006 9.08747C5.2404 9.08747 5.65606 8.92314 5.8204 8.64281C5.98473 8.36247 5.91706 7.9178 5.62706 7.4248C5.28873 6.83514 5.20173 6.13914 5.37573 5.4818C5.54973 4.8148 5.97506 4.2638 6.5744 3.92547L8.24673 2.96847C9.33906 2.3208 10.7794 2.6978 11.4367 3.80947L11.5527 4.0028C12.1231 4.9888 12.9061 4.9888 13.4764 4.0028L13.5827 3.81914C14.2401 2.6978 15.6804 2.3208 16.7824 2.97814L18.4451 3.93514C19.0347 4.27347 19.4601 4.82447 19.6437 5.49147C19.8177 6.15847 19.7307 6.84481 19.3924 7.43447C19.1121 7.92747 19.0347 8.37214 19.1991 8.65247C19.3634 8.93281 19.7791 9.09714 20.3494 9.09714C21.7607 9.09714 22.9111 10.2475 22.9111 11.6588V13.3601C22.9111 14.7715 21.7607 15.9218 20.3494 15.9218C19.7791 15.9218 19.3634 16.0861 19.1991 16.3665C19.0347 16.6468 19.1024 17.0915 19.3924 17.5845C19.7307 18.1741 19.8274 18.8701 19.6437 19.5275C19.4697 20.1945 19.0444 20.7455 18.4451 21.0838L16.7727 22.0408C16.4054 22.2438 16.0091 22.3501 15.6031 22.3501ZM12.5001 18.7735C13.3604 18.7735 14.1627 19.3148 14.7137 20.2718L14.8201 20.4555C14.9361 20.6585 15.1294 20.8035 15.3614 20.8615C15.5934 20.9195 15.8254 20.8905 16.0187 20.7745L17.6911 19.8078C17.9424 19.6628 18.1357 19.4211 18.2131 19.1311C18.2904 18.8411 18.2517 18.5415 18.1067 18.2901C17.5557 17.3428 17.4881 16.3665 17.9134 15.6221C18.3387 14.8778 19.2184 14.4525 20.3204 14.4525C20.9391 14.4525 21.4321 13.9595 21.4321 13.3408V11.6395C21.4321 11.0305 20.9391 10.5278 20.3204 10.5278C19.2184 10.5278 18.3387 10.1025 17.9134 9.35814C17.4881 8.6138 17.5557 7.63747 18.1067 6.69014C18.2517 6.4388 18.2904 6.13914 18.2131 5.84914C18.1357 5.55914 17.9521 5.32714 17.7007 5.17247L16.0284 4.21547C15.6127 3.96414 15.0617 4.10914 14.8104 4.53447L14.7041 4.71814C14.1531 5.67514 13.3507 6.21647 12.4904 6.21647C11.6301 6.21647 10.8277 5.67514 10.2767 4.71814L10.1704 4.5248C9.92873 4.1188 9.3874 3.9738 8.97173 4.21547L7.2994 5.18214C7.04806 5.32714 6.85473 5.5688 6.7774 5.8588C6.70006 6.1488 6.73873 6.44847 6.88373 6.6998C7.43473 7.64714 7.5024 8.62347 7.07706 9.36781C6.65173 10.1121 5.77206 10.5375 4.67006 10.5375C4.0514 10.5375 3.5584 11.0305 3.5584 11.6491V13.3505C3.5584 13.9595 4.0514 14.4621 4.67006 14.4621C5.77206 14.4621 6.65173 14.8875 7.07706 15.6318C7.5024 16.3761 7.43473 17.3525 6.88373 18.2998C6.73873 18.5511 6.70006 18.8508 6.7774 19.1408C6.85473 19.4308 7.0384 19.6628 7.28973 19.8175L8.96206 20.7745C9.16506 20.9001 9.40673 20.9291 9.62906 20.8711C9.86106 20.8131 10.0544 20.6585 10.1801 20.4555L10.2864 20.2718C10.8374 19.3245 11.6397 18.7735 12.5001 18.7735Z"
                fill="#717171"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
