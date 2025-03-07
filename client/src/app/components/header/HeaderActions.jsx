import Image from "next/image";
import { HeaderMyAccount } from "../HeaderMyAccount";

export const HeaderActions = () => {
  return (
    <div className="ml-auto flex h-full items-center gap-3 lg:gap-6">
      <ul className="ml-auto flex h-full items-center gap-3 lg:gap-6">
        <li>
          <button className="min-w-[22px]">
            <Image
              src={"/images/search.svg"}
              height={22}
              width={22}
              className="size-[22px]"
              alt="search"
            />
          </button>
        </li>
        <li className="group relative">
          <button className="min-w-[22px] cursor-pointer">
            <Image
              src={"/images/user.svg"}
              height={22}
              width={22}
              className="size-[22px]"
              alt="user"
            />
          </button>
          <HeaderMyAccount />
        </li>

        <li>
          <button className="min-w-[22px]">
            <Image
              src={"/images/heart.svg"}
              height={22}
              width={22}
              className="size-[22px]"
              alt="wishlist"
            />
          </button>
        </li>
        <li>
          <button className="relative min-w-[22px]">
            <Image
              src={"/images/cart.svg"}
              height={22}
              width={22}
              className="size-[22px]"
              alt="cart"
            />
            <span className="absolute top-[3px] left-2/4 flex size-[20px] -translate-x-2/4 items-center justify-center text-[10px] lg:top-1 lg:text-[11px]">
              0
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};
