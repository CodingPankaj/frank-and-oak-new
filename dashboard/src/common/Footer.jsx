import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";

export const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return (
    <footer className="mt-auto flex items-center justify-center border-t border-border-color bg-bg-primary-color px-3 py-3 md:py-5">
      <p className="w-fit items-center gap-1 text-center text-sm text-text-secondary-color">
        Copyright © {currentYear}{" "}
        <span className="text-text-color-3">Dashboard</span>
        . Designed with <IoMdHeart className="inline text-base text-red-500" />{" "}
        by{" "}
        <Link
          to={"https://github.com/codingpankaj"}
          className="text-accent-color"
          target="_blank"
        >
          Pankaj Sharma
        </Link>{" "}
        All rights reserved.
      </p>
    </footer>
  );
};
