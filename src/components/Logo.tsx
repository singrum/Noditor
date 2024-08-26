import React from "react";
import { BsCircleHalf } from "react-icons/bs";
export default function Logo() {
  return (
    <div className="font-semibold flex gap-2 items-center text-xl">
      <BsCircleHalf className="rotate-45" />
      <div>Noditor</div>
    </div>
  );
}
