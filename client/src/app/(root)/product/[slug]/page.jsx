import { MainContainer } from "@/app/components/MainContainer";
import Link from "next/link";
import { ProductDetailsAddToCart } from "../components/ProductDetailsAddToCart";
import { ProductDetailsTitleContent } from "../components/ProductDetailsTitleContent";
import { ProductDetailImages } from "../components/ProductDetailImages";
import Image from "next/image";

export default function Page() {
  return (
    <section>
      <MainContainer className="py-5">
        <div className="grid grid-cols-[1fr_580px] gap-[10px]">
          <ProductDetailImages />
          <ProductDetailsRight />
        </div>
      </MainContainer>
    </section>
  );
}

const ProductDetailsRight = () => {
  return (
    <div className="px-14 py-14">
      <ProductDetailsTitleContent />
      <ProductDetailsAddToCart />
      <ProductDetailsOverview />
    </div>
  );
};

const ProductDetailsOverview = () => {
  return (
    <div className="border-b border-[#E6E6E6] py-6">
      <div className="flex items-center gap-4 bg-[#d1e8c3] p-3">
        <div>
          <Image
            src="/images/frank-club-black.svg"
            width={28}
            height={28}
            alt="Heart"
          />
        </div>
        <div>
          <p className="font-circularBold text-base">Frank's Club</p>
          <p className="text-sm">
            <Link href={"#"} className="underline">
              Sign up or login
            </Link>{" "}
            to earn 99 points from this item.
          </p>
        </div>
      </div>
      <div>
        <div>
          <Image
            src="/images/truck-black.png"
            width={20}
            height={20}
            alt="shipping truck"
          />
          <p>Free Shipping over $99</p>
        </div>
      </div>
    </div>
  );
};
