"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import cx from "classnames";
import settingImg from "../../../../../assets/icons/settingImg.svg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Image from "next/image";
interface IItem {
  componentId: number;
  height: number;
  id: number;
  url: string;
  width: number;
}
export const SelectImage = ({ pictures }: any) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const images = pictures.map((item: IItem) => ({
    original: item.url,
    thumbnail: item.url,
  }));

  if (pictures?.length === 0) {
    return <p>Нет картинок</p>;
  }

  return (
    <div className={styles.container}>
      <ImageGallery
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showFullscreenButton={isWideScreen}
        showNav={!isWideScreen}
        showThumbnails={isWideScreen}
        lazyLoad={true}
      />
    </div>
  );
};
