import { useContext } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MainContext } from "../context/MainContext";

export const DarkMode = () => {
  const { toggleDarkMode, theme } = useContext(MainContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-2xl text-text-secondary-color"
    >
      {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
};
