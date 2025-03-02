import Image from "next/image";
import { Navbar } from "./Navbar";
import { HeaderTop } from "./HeaderTop";
import { HeaderActions } from "./HeaderActions";
import Link from "next/link";
import { LoginModal } from "../modal/LoginModal";

export const Header = () => {
  return (
    <>
      <HeaderTop />
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div className="flex h-[44px] items-center gap-4 px-[10px] md:px-10 lg:h-[46px] lg:gap-8 lg:px-8">
          <button className="relative flex h-4 w-5 min-w-5 items-center justify-center lg:hidden">
            <span className="h-[2px] w-full bg-black before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-black after:absolute after:top-0 after:left-0 after:h-[2px] after:w-full after:bg-black"></span>
          </button>
          <figure className="min-w-[116px]">
            <Link href={"/"}>
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={120}
                height={14}
                className="w-[116px] lg:w-[120px]"
              />
            </Link>
          </figure>
          <Navbar />
          <HeaderActions />
        </div>
        {/* <LoginModal /> */}
      </header>
    </>
  );
};
