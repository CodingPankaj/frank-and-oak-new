import Image from "next/image";

export const ProductCardContent = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 px-2 py-[14px] md:gap-[10px] md:px-[10px]">
      <div>
        <span className="bg-black px-[5px] py-1 text-[10px] text-white">
          NEW
        </span>
        <h3 className="mt-2 text-[13px] leading-[1.33] md:text-sm">
          The Compact Sweater Pant in Taupe
        </h3>
        <h3 className="mt-[10px] text-[13px] leading-[1.33] md:text-sm">
          ₹129
        </h3>
      </div>
      <div>
        <Image
          src={"images/heart.svg"}
          height={16}
          width={16}
          className="size-[14px] md:size-4"
          alt="wishlist"
        />
      </div>
    </div>
  );
};
