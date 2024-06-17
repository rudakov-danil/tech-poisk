import Link from "next/link";
import styles from "./CatalogPopUpColumn.module.css";

interface CatalogPopUpColumnProps {
  array: string[];
  title: string;
  slug: string;
  setIsCatalogPopUpActive: any;
  setInLocalStorage: any;
}

export function CatalogPopUpColumn({
  array,
  title,
  slug,
  setInLocalStorage,
  setIsCatalogPopUpActive,
}: CatalogPopUpColumnProps) {
  return (
    <div className={styles["catalog-pop-up-column"]}>
      {array.map((item, index) => {
        return (
          <Link
            className={styles["link"]}
            href={`/SearchPage`}
            key={index}
            onClick={() => {
              localStorage.setItem(
                "searchInCatalog",
                JSON.stringify({
                  componentType: title,
                  componentTypeSlug: slug,
                  search: item,
                })
              );
              window.dispatchEvent(new Event("storage"));
              setIsCatalogPopUpActive(false);
              // setInLocalStorage(title, item, slug);
            }}
          >
            <p className={styles["link-text"]}>{item.split("_").join(" ")}</p>
          </Link>
        );
      })}
    </div>
  );
}
