"use client";
import { Header } from "@/components/header/Header";
import "./globals.css";
import "./reset.css";
import { metadata } from "./metadata";

import { Inter } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import FeedbackPage from "./feedbackPage/page";
import Metrika from "./yandexMetrika/handleYandexMetrika";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReduxProvider from "@/redux/provider";
import { HeaderNavigationMobile } from "@/components/HeaderNavigationMobile/HeaderNavigationMobile";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCatalogPopUpActive, setIsCatalogPopUpActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState<boolean | string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const feedbackToken = localStorage.getItem("feedbackToken");
      setShowFeedback(feedbackToken ? !!!feedbackToken : true);
    }
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="verify-admitad" content="772f42b098" />
      </head>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          {/* <body className="flex flex-col items-center bg-[#252526]"> */}
          <body
            className="flex flex-col items-center 
          "
          >
            {/* overflow-hidden */}
            <Metrika />

           {showFeedback ? (
              <FeedbackPage setShowFeedback={setShowFeedback} />
            ) : (
              <></>
            )}
            <Header
              isCatalogPopUpActive={isCatalogPopUpActive}
              setIsCatalogPopUpActive={setIsCatalogPopUpActive}
            />
            <main className="max-w-[1300px] justify-between relative min-h-[calc(100vh-238px)] flex-auto w-full flex flex-col align-baseline px-[15px]">
              {children}

              <HeaderNavigationMobile
                isCatalogPopUpActive={isCatalogPopUpActive}
                setIsCatalogPopUpActive={setIsCatalogPopUpActive}
              />
            </main>
            <Footer />
          </body>
        </QueryClientProvider>
      </ReduxProvider>
    </html>
  );
}
