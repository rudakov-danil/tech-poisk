"use client";

import { useAppDispatch } from "@/redux/hooks";
import { changeCurrentPage } from "@/redux/services/currentPageForFooterSlice";
import Link from "next/link";

import React, { useEffect } from "react";

export function NavigationComponent({ currentPage }: { currentPage: string }) {
  const dispatch = useAppDispatch();

  function getNameOfPage() {
    switch (currentPage) {
      case "AboutCompanyPage":
        // localStorage.setItem("currentPageForFooter", "AboutCompanyPage");

        return "О компании";
      case "ContactsPage":
        // localStorage.setItem("currentPageForFooter", "ContactsPage")
        return "Контакты";
      case "PartnersPage":
        // localStorage.setItem("currentPageForFooter", "PartnersPage")
        return "Партнёры";
      case "PersonalDataPage":
        // localStorage.setItem("currentPageForFooter", "PersonalDataPage");

        return "Персональные данные";
      case "FeedbackPageNew":
        // localStorage.setItem("currentPageForFooter", "FeedbackPageNew")
        return "Обратная связь";
      case "paymentAndDeliveryPage":
        // localStorage.setItem("currentPageForFooter", "paymentAndDeliveryPage");

        return "Оплата и доставка";
    }
  }

  return (
    <>
      <div className="flex flex-col py-[6px] bg-[#EBEDFF] items-start gap-[20px] shadow-lg rounded-[5px] min-w-[197px] max-lg:hidden">
        <Link href="/AboutCompanyPage" className={`w-full px-[13px] relative`}>
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left ${
              currentPage === "AboutCompanyPage" && "text-[#0260E8]"
            }`}
            onClick={() => dispatch(changeCurrentPage("AboutCompanyPage"))}
          >
            О компании
          </button>
          {currentPage === "AboutCompanyPage" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
        <Link href="/ContactsPage" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "ContactsPage" && "text-[#0260E8]"
            }`}
            onClick={() => dispatch(changeCurrentPage("ContactsPage"))}
          >
            Контакты
          </button>
          {currentPage === "ContactsPage" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
        <Link href="/PartnersPage" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "PartnersPage" && "text-[#0260E8]"
            }`}
            onClick={() => dispatch(changeCurrentPage("PartnersPage"))}
          >
            Партнёрам
          </button>
          {currentPage === "PartnersPage" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
        <Link href="/PersonalDataPage" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "PersonalDataPage" && "text-[#0260E8]"
            }`}
            onClick={() => dispatch(changeCurrentPage("PersonalDataPage"))}
          >
            Персональные данные
          </button>
          {currentPage === "PersonalDataPage" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
        <Link href="/FeedbackPageNew" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "FeedbackPageNew" && "text-[#0260E8]"
            }`}
            onClick={() => dispatch(changeCurrentPage("FeedbackPageNew"))}
          >
            Обратная связь
          </button>
          {currentPage === "FeedbackPageNew" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
        <Link
          href="/paymentAndDeliveryPage"
          className="w-full px-[13px] relative"
        >
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left ${
              currentPage === "paymentAndDeliveryPage" && "text-[#0260E8]"
            }`}
            onClick={() =>
              dispatch(changeCurrentPage("paymentAndDeliveryPage"))
            }
          >
            Оплата и доставка
          </button>
          {currentPage === "paymentAndDeliveryPage" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )}
        </Link>
      </div>

      <p className="w-full border-solid border-b-[2px] border-[#D9D9D9] pb-[1px] text-[22px] lg:hidden">
        {getNameOfPage()}
      </p>
    </>
  );
}
