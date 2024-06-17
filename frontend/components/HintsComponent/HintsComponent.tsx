"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import cross from "@/assets/icons/cross.svg";
import { useDebounce } from "use-debounce";

export function HintsComponent({
  searchInput = "",
  inputIsInFocus,

  setInputIsInFocus,
}: {
  searchInput: string;
  inputIsInFocus: boolean;

  setInputIsInFocus: any;
}) {
  const [hintsArray, setHintsArray] = useState<string[]>([]);

  // const [debouncedHints, setDebouncedHints] = useState<string>("");

  const router = useRouter();
  const hintsRef = useRef<HTMLDivElement>(null);

  async function getHintsForSearch(search: string, limit = 10) {
    if (search.length === 0) return;
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/searchHints?search=${search}&limit=${limit}`
      );
      const data = await respone.json();

      setHintsArray(data);

      return data;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getHintsForSearch(searchInput);
  }, [searchInput]);

  useEffect(() => {
    if (hintsRef == null) return;
    if (!inputIsInFocus) return;

    const handler = (e: any) => {
      if (!hintsRef.current?.contains(e.target)) {
        setInputIsInFocus(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => removeEventListener("mousedown", handler);
  });

  useEffect(() => {
    () => getHintsForSearch(searchInput);
  }, [searchInput]);

  return (
    inputIsInFocus && (
      <div
        className="w-full absolute flex items-start flex-col top-[55px] bg-[white] p-[10px] z-[100] rounded-[5px] shadow-2xl"
        ref={hintsRef}
      >
        <div className="relative">
          {hintsArray.map((hint: any, index) => {
            return (
              <button
                className="w-full text-start py-[5px] hover:bg-[#b4d9ff80]"
                key={index}
                onClick={() => {
                  localStorage.setItem(
                    "searchInCatalog",
                    JSON.stringify({
                      componentType: hint.component_type__slug,
                      componentTypeSlug: hint.name,
                      search: hint.name,
                    })
                  );
                  // setHintsArray([]);

                  window.dispatchEvent(new Event("storage"));
                  router.push("/SearchPage");
                }}
              >
                {hint.name}
              </button>
            );
          })}
        </div>
      </div>
    )
  );
}
