import Link from "next/link";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

export const HeaderTop = () => {
  return (
    <div className="bg-black px-[10px] lg:px-8">
      <div className="flex items-center justify-between py-[7px]">
        <button className="flex text-[13px] text-white opacity-50 transition-opacity duration-150 ease-in-out hover:opacity-100">
          <LiaAngleLeftSolid />
        </button>
        <p className="text-center font-circularBold text-sm text-white">
          NEW markdowns! Shop The Winter Sale today.{" "}
          <Link href={"/"} className="font-circularStd font-normal underline">
            Shop Women
          </Link>{" "}
          <Link href={"/"} className="font-circularStd font-normal underline">
            Shop Men
          </Link>
        </p>
        <button className="flex text-[13px] text-white opacity-50 transition-opacity duration-150 ease-in-out hover:opacity-100">
          <LiaAngleRightSolid />
        </button>
      </div>
    </div>
  );
};
