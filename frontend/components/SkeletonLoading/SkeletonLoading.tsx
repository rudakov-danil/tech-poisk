import React from "react";

interface IProps {
  width: number | string;
  height: number | string;
}
export default function SkeletonLoading({ width = 10, height = 10 }: IProps) {
  return (
    <div
      style={{ width, height }}
      className="animate-pulse rounded-[10px] bg-[#72727273]"
    />
  );
}
