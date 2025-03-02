import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // state for theme dark and light mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "light";
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
