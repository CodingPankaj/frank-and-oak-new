"use client";
import Image from "next/image";
import { useState } from "react";

export const ProductDetailsAddToCart = () => {
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
    <div className="mt-8 border-t border-[#E6E6E6] pt-6">
      <div>
        <p className="mb-2 text-sm">Select a size</p>
        <div aria-label="Product sizes" className="flex w-full flex-wrap gap-3">
          {sizes.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(index)}
              role="radio"
              aria-checked={selectedSize === index}
              aria-label={item.sizeValue}
              className={`h-8 min-w-8 cursor-pointer border px-3 uppercase transition-all hover:bg-black hover:text-white ${selectedSize === index ? "border-black bg-black text-white" : "border-[#E6E6E6] bg-white text-black"} `}
            >
              {item.sizeValue}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-[1fr_60px] gap-3 border-t border-b border-[#E6E6E6] py-8">
          <button className="w-full cursor-pointer bg-black px-4 py-4 text-center text-lg text-white">
            Add to cart
          </button>
          <button className="flex size-[60px] cursor-pointer items-center justify-center border-2 border-black">
            <Image
              src={"/images/heart.svg"}
              height={24}
              width={24}
              className="size-6"
              alt="wishlist"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
