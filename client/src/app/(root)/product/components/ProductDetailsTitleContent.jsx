import Link from "next/link";

export const ProductDetailsTitleContent = () => {
  return (
    <div className="flex flex-col items-start">
      <p className="mb-3 -ml-1 text-sm">
        <Link href="#" className="mx-1 underline">
          Home
        </Link>
        /
        <Link href="#" className="mx-1 underline">
          Products
        </Link>
        /
        <Link href="#" className="mx-1 underline">
          New In
        </Link>
      </p>
      <span className="mb-4 bg-black px-[5px] py-1 text-[10px] text-white">
        NEW
      </span>
      <h3 className="mb-5 text-2xl">The Gingham Tie Front Blouse in Black</h3>
      <h3 className="mb-2 text-base">₹4,599.00</h3>
      <p className="text-[11px] tracking-[0.04em]">
        4 interest-free payment of ₹5,999 with.{" "}
        <span className="underline">Learn More</span>
      </p>
    </div>
  );
};
