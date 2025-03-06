import { createContext, useEffect, useState } from "react";
import { fetchApiData } from "../services/fetchApiData";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // state for theme dark and light mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "dark";
  });

  // state for side bar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // state to store logged in user
  const [isLoggedin, setIsLoggedin] = useState(null);

  // function to toggle side bar
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // function to toggle Mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // function to toggle dark mode
  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // add theme to preffered mode to loacl storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // states to hold data
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);

  // function to get size data
  const getAllSizes = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/size/view`,
    );
    setSizeData(res.data);
  };

  // functions to get color data
  const getAllColors = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/color/view`,
    );
    setColorData(res.data);
  };

  // functions to get category data
  const getCategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/category/view`,
    );
    setCategoryData(res.data);
  };

  // functions to get category data
  const getSubcategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/subcategory/view`,
    );
    setSubcategoryData(res.data);
  };

  return (
    <MainContext.Provider
      value={{
        isSidebarExpanded,
        toggleSidebar,
        isMobileMenuOpen,
        toggleMobileMenu,
        theme,
        toggleDarkMode,
        isLoggedin,
        setIsLoggedin,
        sizeData,
        setSizeData,
        getAllSizes,
        colorData,
        setColorData,
        getAllColors,
        categoryData,
        setCategoryData,
        getCategory,
        subcategoryData,
        setSubcategoryData,
        getSubcategory,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
