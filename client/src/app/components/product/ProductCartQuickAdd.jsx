"use client";
import { useState } from "react";

export const ProductCardQuickAdd = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = [
    { _id: 1, sizeName: "Extra Small", sizeValue: "XS" },
    { _id: 2, sizeName: "Small", sizeValue: "S" },
    { _id: 3, sizeName: "Medium", sizeValue: "M" },
    { _id: 4, sizeName: "Large", sizeValue: "L" },
    { _id: 5, sizeName: "Extra Large", sizeValue: "XL" },
    { _id: 6, sizeName: "Double Extra Large", sizeValue: "XXL" },
  ];

  return (
    <div className="invisible absolute bottom-0 z-[5] w-full p-[6px] opacity-0 group-hover:visible group-hover:opacity-100">
      <div className="group/inner flex min-h-[44px] w-full items-center justify-center bg-white text-sm">
        <span className="group-hover/inner:hidden">Quick add</span>
        <div
          aria-label="Product sizes"
          className="hidden w-full flex-wrap justify-center p-[6px] group-hover/inner:flex"
        >
          {sizes.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(index)}
              role="radio"
              aria-checked={selectedSize === index}
              aria-label={item.sizeValue}
              className={`h-8 w-8 cursor-pointer uppercase transition-all hover:bg-black hover:text-white ${selectedSize === index ? "bg-black text-white" : "bg-white text-black"} `}
              style={{ width: "calc((100% - 0px) / 5)" }}
            >
              {item.sizeValue}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
