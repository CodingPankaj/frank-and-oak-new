"use client";
import { useState } from "react";
import Link from "next/link";

export const ProductCardColor = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    {
      _id: "color_1",
      colorName: "green",
      colorValue: "#111",
    },
    {
      _id: "color_2",
      colorName: "red",
      colorValue: "#FF0000",
    },
    {
      _id: "color_3",
      colorName: "blue",
      colorValue: "#0000FF",
    },
    {
      _id: "color_4",
      colorName: "yellow",
      colorValue: "#FFFF00",
    },
    {
      _id: "color_5",
      colorName: "black",
      colorValue: "#000000",
    },
    {
      _id: "color_6",
      colorName: "orange",
      colorValue: "#FFA500",
    },
  ];

  return (
    <div className="relative px-2 md:px-[10px]">
      <div
        className="invisible flex items-center gap-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 md:gap-[10px]"
        role="radiogroup"
        aria-label="Product Colors"
      >
        {colors.map((item, index) => (
          <button
            key={item._id}
            onClick={() => setSelectedColor(index)}
            role="radio"
            aria-checked={selectedColor === index}
            aria-label={item.colorName}
            className={`grid size-[14px] cursor-pointer place-items-center rounded-full bg-white ${
              selectedColor === index ? "border border-black" : ""
            }`}
          >
            <span
              className={`rounded-full ${
                selectedColor === index ? "size-2" : "size-[14px]"
              }`}
              style={{ backgroundColor: item.colorValue }}
            ></span>
          </button>
        ))}
        <Link href="#" className="text-[13px] text-[#666666]">
          +{colors.length - 5}
        </Link>
      </div>
      <p className="absolute top-2/4 -translate-y-2/4 text-[13px] text-[#666666] transition-all group-hover:invisible group-hover:opacity-0">
        {colors.length} {colors.length === 1 ? "color" : "colors"}
      </p>
    </div>
  );
};
