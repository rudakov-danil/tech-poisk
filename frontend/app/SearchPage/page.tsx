"use client";

export const dynamic = "force-dynamic";

import { SearchComponents } from "@/components/searchComponents/SearchComponents";
import { Suspense, useEffect } from "react";

export default function page() {
  return (
    <Suspense>
      <SearchComponents isModalWindow={false} />
    </Suspense>
  );
}
