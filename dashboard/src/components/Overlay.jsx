import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const Overlay = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(MainContext);
  return (
    <div
      onClick={toggleMobileMenu}
      className={`fixed left-0 top-0 h-full w-full backdrop-blur-sm ${isMobileMenuOpen ? "block" : "hidden"} bg-black/50 md:hidden`}
    ></div>
  );
};
