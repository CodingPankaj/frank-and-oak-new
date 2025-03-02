import { PrimaryButton } from "@/app/components/Button";
import Image from "next/image";

export const Banner = () => {
  return (
    <>
      <div className="relative flex h-[61vh] w-full items-center md:h-[83.1vh]">
        <Image
          src={"/images/banner.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="banner"
          className="absolute left-0 top-0 z-[-1] hidden h-full w-full object-cover md:block"
        />
        <Image
          src={"/images/mobile-banner.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="banner"
          className="absolute left-0 top-0 z-[-1] h-full w-full object-cover md:hidden"
        />
        <div className="w-full px-5 md:p-[80px]">
          <div className="flex flex-col gap-4 md:gap-5">
            <h3 className="text-center text-[49px] leading-[1.3] tracking-[-0.03em] text-white md:text-[80px]">
              Basic but <span className="font-circularItalic">never</span>{" "}
              boring
            </h3>

            <div className="mt-4 flex justify-center gap-5 md:mt-3 md:gap-10">
              <PrimaryButton label="Women" className="max-w-[172px] flex-1" />
              <PrimaryButton label="Men" className="max-w-[172px] flex-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black px-5 py-[14px]">
        <div className="flex flex-wrap items-center justify-center gap-[14px_24px] lg:gap-[88px]">
          <ValueItemList
            src={"/images/truck.png"}
            alt="Free Shipping"
            title="Free Shipping over $99"
          />
          <ValueItemList
            src={"/images/returns.png"}
            alt="Free Return"
            title="Free Returns"
          />
          <ValueItemList
            src={"/images/franks-club-icon.png"}
            alt="Earn Points"
            title="Earn Points"
          />
          <ValueItemList
            src={"/images/sezzle.png"}
            alt="Buy Now, Pay Later"
            title="Buy Now, Pay Later"
          />
        </div>
      </div>
    </>
  );
};

const ValueItemList = ({ src, alt, title }) => {
  return (
    <div className="flex w-2/6 grow items-center gap-2 md:w-auto md:grow-0 md:gap-[14px]">
      <img src={src} width={20} height={20} alt={alt} />
      <p className="text-xs text-white md:text-sm">{title}</p>
    </div>
  );
};
