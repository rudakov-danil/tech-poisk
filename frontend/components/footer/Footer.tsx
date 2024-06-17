import styles from "./Footer.module.css";
import Link from "next/link";

import telegramImg from "../../assets/icons/telegram.svg";
import youtubeImg from "../../assets/icons/youtube.svg";
import techPoiskLogoDark from "../../assets/icons/tech-poisk-logo-dark.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeCurrentPage } from "@/redux/services/currentPageForFooterSlice";

export function Footer() {
  const currentPage = useAppSelector((state) => {
    return state.currentPageForFooterReducer.name;
  });

  const dispatch = useAppDispatch();
  return (
    <div className={`${styles["footer"]} w-full`}>
      <div className={styles["main"]}>
        <div
          className={`flex items-center gap-[60px] max-lg:flex-col max-lg:items-start max-lg:gap-[22px] min-w-[335px] max-lg:min-w-0`}
        >
          <div className={`flex flex-col gap-[22px] `}>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/AboutCompanyPage"
              onClick={() => {
                dispatch(changeCurrentPage("AboutCompanyPage"));
              }}
            >
              <p
                className={`${
                  currentPage === "AboutCompanyPage" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                О компании
              </p>
            </Link>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/ContactsPage"
              onClick={() => {
                dispatch(changeCurrentPage("ContactsPage"));
              }}
            >
              <p
                className={`${
                  currentPage === "ContactsPage" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                Контакты
              </p>
            </Link>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/PartnersPage"
              onClick={() => {
                dispatch(changeCurrentPage("PartnersPage"));
              }}
            >
              <p
                className={`${
                  currentPage === "PartnersPage" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                Партнёрам
              </p>
            </Link>
          </div>

          <div className={`flex flex-col gap-[22px]`}>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/PersonalDataPage"
              onClick={() => {
                dispatch(changeCurrentPage("PersonalDataPage"));
              }}
            >
              <p
                className={`${
                  currentPage === "PersonalDataPage" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                Персональные данные
              </p>
            </Link>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/FeedbackPageNew"
              onClick={() => {
                dispatch(changeCurrentPage("FeedbackPageNew"));
              }}
            >
              <p
                className={`${
                  currentPage === "FeedbackPageNew" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                Обратная связь
              </p>
            </Link>
            <Link
              className={`text-[#fff] text-[18px] font-medium hover:text-[#9e9e9e]  `}
              href="/paymentAndDeliveryPage"
              onClick={() => {
                dispatch(changeCurrentPage("paymentAndDeliveryPage"));
              }}
            >
              <p
                className={`${
                  currentPage === "paymentAndDeliveryPage" && "text-[#0260E8]"
                } max-lg:text-[12px]`}
              >
                Оплата и доставка
              </p>
            </Link>
          </div>
        </div>
        <div
          className={`flex items-end max-lg:flex-col lg:justify-between lg:w-full max-w-[780px] max-ssm:items-start`}
        >
          <div
            className={`flex items-center gap-[22px]  max-lg:mb-[111px] max-ssm:mb-[0px] max-sm:mt-[10px]`}
          >
            <Image src={telegramImg} alt="" className="max-lg:w-[29px]" />
            <Image src={youtubeImg} alt="" className="max-lg:w-[29px]" />
          </div>
          <div className="flex flex-col w-full gap-[2px] flex-1 max-w-[300px] max-lg:items-end max-ssm:items-start">
            <Image
              className={`${styles["logo-image"]} max-lg:w-[102px]`}
              src={techPoiskLogoDark}
              alt=""
            />
            <p className={`text-[17px] text-[white] max-lg:text-[9px]`}>
              Покупай лучшие комплектующие за <br /> лучшую цену в кратчайший
              срок
            </p>
          </div>
        </div>
      </div>
      <div className={styles["copyright"]}>
        <p className={styles["copyright-text"]}>
          © 2023–2024 Компания TechPoisk. Все права защищены. <br />
          Администрация Сайта не несет ответственности за размещаемые
          Пользователями материалы (в т.ч. информацию и изображения), их
          содержание и качество.
        </p>
      </div>
    </div>
  );
}
