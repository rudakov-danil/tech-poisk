"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ky from "@/ky";

import logo from "../../assets/icons/logo.svg";
import sendFirst from "../../assets/icons/log-in-01.svg";
import arrorRight from "../../assets/icons/arrow-right.svg";
import telegrammIcon from "../../assets/icons/telegramm-icon.svg";
import emailIcon from "../../assets/icons/mail-01.svg";
import isOnline from "is-online";

interface IResponse {
  earlyAccessToken: string;
  name: string;
  lastName: string;
  id: number;
  email: string;
}

export default function FeedbackPage({ setShowFeedback }: any) {
  const [keyInputText, setKeyInputText] = useState("");
  const [keyInputTextError, setKeyInputTextError] = useState("");
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailIsSended, setEmailIsSended] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const handleClick = () => setChecked(!checked);

  const checkInternetConnection = async () => {
    const online = await isOnline();
    if (!online) {
      setErrorText("Проверьте подключение к интернету");
      setLoading(false);
    }
  };

  const checkToken = async (token: string) => {
    const response = await fetch(
      `https://techpoisk.com:8443/retrieveEarlyAccessMember/${token}`
    );
    const data = await response.json();
    return data;
  };

  function sendRequestWithKey() {
    checkInternetConnection();
    if (keyInputText.length !== 0) {
      checkToken(keyInputText).then((data) => {
        if (data.earlyAccessToken === keyInputText) {
          if (typeof window !== "undefined") {
            localStorage.setItem("feedbackToken", JSON.stringify(data.earlyAccessToken));
          }
          setShowFeedback(false);
        } else {
          setKeyInputTextError("Неверный ключ");
        }
      });
    } else {
      setKeyInputTextError("");
    }
  }

  useEffect(() => {
    setEmailIsSended(false);
  }, []);

  async function sendEmail() {
    if (!checked) {
      setCheckedError(true);
      return;
    } else {
      setCheckedError(false);
    }
    checkInternetConnection();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!emailPattern.test(emailText)) {
      setErrorText("Введите корректный адрес электронной почты");
      setLoading(false);
      return;
    }
    if (emailText.length !== 0) {
      try {
        setErrorText("");
        setLoading(true);
        let request: any = await fetch(
          `https://techpoisk.com:8443/earlyAccessMembers/`,
          {
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json;charset=UTF-8",
            },
            method: "POST",
            body: JSON.stringify({
              email: emailText,
            }),
          }
        );
        request = await request.json();
        if (request.email[0] === "Enter a valid email address.") {
          setErrorText("Введите корректный адрес электронной почты");
          setLoading(false);
          return;
        } else if(request.email[0] === "early access member with this email already exists.") {
          setErrorText("Ранее на эту почту уже был отправлен код доступа");
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setEmailIsSended(true);
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setLoading(false);
        if (err?.response?.status === 400) {
          setErrorText("Ранее на эту почту уже был отправлен код доступа");
          return;
        } else {
          setErrorText(
            "Возникла неизвестная ошибка. Проверьте подключение к интернету и попробуйте позже"
          );
        }
      }
    }
  }
  return (
    <>
      <div className="fixed z-[1000] bottom-0 top-0 left-0 right-0 bg-[#00000056]"></div>
      <div className="h-[85vh] max-lg:max-w-[386px] top-[20px] max-lg:my-auto flex z-[1000000] fixed lg:fixed mt-[8px] overflow-y-auto  z-10001  bg-[#2b2d30] text-white font-[400] flex-col py-[30px] mx-auto max-[320px]:pt-[50px] px-[20px] rounded-[20px] w-full max-w-[390px]">
        <Image src={logo} alt={"logo"} width={282} height={82} />
        <h1 className="text-[17px] mb-[28px]">
          Покупай лучшие комплектующие за лучшую цену в кратчайший срок
        </h1>
        <div className="mb-[50px]">
          <div className="py-[10px] px-[20px] rounded-[10px] bg-white flex justify-between items-center">
            <form
              className="width w-full mr-[10px]"
              onSubmit={(e) => {
                e.preventDefault();
                sendRequestWithKey();
              }}
            >
              <input
                className="outline-none w-[100%] text-black text-[17px]"
                placeholder="Введите ключ доступа для входа"
                type="text"
                onChange={(e) => {
                  setKeyInputText(e.target.value);
                }}
              />
            </form>

            <Image
              src={sendFirst}
              width={24}
              height={24}
              alt={"send"}
              onClick={() => {
                sendRequestWithKey();
              }}
              className="cursor-pointer fill-[gray]"
            />
          </div>
          {keyInputTextError.length !== 0 && (
            <h2
              className={`mt-[10px] text-[red] ${
                keyInputTextError.length !== 0 && styles["errorText"]
              }`}
            >
              {keyInputTextError}
            </h2>
          )}
        </div>
        <h2 className="text-[22px] mb-[20px]">Получите ключ доступа</h2>

        {!emailIsSended ? (
          <>
            <div className="py-[10px] px-[20px] rounded-[10px] mb-[10px] bg-white flex justify-between">
              <form
                className="flex w-full mr-[10px]"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  if (checked) {
                    sendEmail();
                  } else return;
                }}
              >
                <input
                  className="outline-none w-full text-black text-[17px]"
                  placeholder="Введите email"
                  type="text"
                  onChange={(e: any) => {
                    setEmailText(e.target.value);
                  }}
                />
              </form>

              {loading ? (
                <div className={styles["spinner"]} />
              ) : (
                <Image
                  src={arrorRight}
                  width={24}
                  height={24}
                  alt={"send-email-icon"}
                  onClick={() => {
                    sendEmail();
                  }}
                  className="cursor-pointer"
                />
              )}
            </div>
            {errorText && (
              <h2
                className={`mt-[10px] text-[red] mb-[20px] ${
                  errorText.length !== 0 && styles["errorText"]
                }`}
              >
                {errorText}
              </h2>
            )}
          </>
        ) : (
          <>
            {!loading && (
              <p className="text-[17px] text-left mb-[50px]">
                Ключ доступа будет отправлен на вашу почту
              </p>
            )}
          </>
        )}

        {!emailIsSended && (
          <>
            <div className="flex gap-[20px] pl-[10px] pb-[12px]">
              <input
                onChange={handleClick}
                checked={checked}
                className={styles.input}
                type="checkbox"
              />
              <div>
                {" "}
                Я принимаю{" "}
                <a className="underline" href="/files/privacy_policy.pdf">
                  политику обработки персональных данных
                </a>{" "}
              </div>
            </div>
            {checkedError ? (
              <p className={`text-[red] pb-[10px] ${styles["errorText"]}`}>
                Примите соглашение о передаче персональных данных
              </p>
            ) : (
              <></>
            )}
            <p className="text-center mb-[10px]">или напишите нам</p>
            <a
              target="_blank"
              href="https://t.me/techworld_qa"
              className="bg-[#179CDE] mb-[10px] py-[10px] px-[20px] flex gap-[10px] justify-center items-center  rounded-[10px]"
            >
              <Image src={telegrammIcon} width={24} height={24} alt={""} />
              @techworld_qa
            </a>

            <a
              href="mailto:request@techpoisk.com"
              target="_blank"
              className="bg-[#ED5454] mb-[50px] py-[10px] gap-[10px] flex justify-center items-center px-[20px] rounded-[10px]"
            >
              <Image
                src={emailIcon}
                width={24}
                height={24}
                alt="email icon"
                className="w-[24px] h-[24px]"
              />
              request@techpoisk.com
            </a>
          </>
        )}

        <a
          target="_blank"
          href="https://t.me/techpoisk"
          className="bg-[#179CDE] mb-[50px] py-[10px] px-[20px] flex gap-[10px] justify-center items-center  rounded-[10px] text-[17px]"
        >
          <Image src={telegrammIcon} width={24} height={24} alt={""} />
          Наш Telegram канал
        </a>

        <p className="text-[22px] mb-[20px]">Поучаствуйте в развитии проекта</p>

        <a
          href="https://forms.gle/L5QH7avGWrbmjrqP6"
          className="rounded-[10px] mb-[20px] bg-[#0260E8] py-[10px] px-[20px] text-center"
        >
          Пройти опрос
        </a>
        <p>
          Прохождение опроса продвинет вас в очереди на получение ключа доступа
        </p>
      </div>
    </>
  );
}
