import { useContext, useState } from "react";

import { MdOutlineChevronRight } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { SubMenu } from "./SubMenu";
import { MainContext } from "../../context/MainContext";

export const MenuItems = ({
  item: { icon, label, path, children },
  openMenuIndex,
  setOpenMenuIndex,
  index,
}) => {
  const { toggleMobileMenu, isSidebarExpanded } = useContext(MainContext);

  const handleMenuClickInMobile = () => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  };

  const location = useLocation();
  const isActive = location.pathname.includes(path);
  const sideMenu = openMenuIndex === index;

  return (
    <li className="w-full">
      {children ? (
        <h3
          onClick={() =>
            setOpenMenuIndex(openMenuIndex === index ? null : index)
          }
          className={`flex items-center gap-1 text-nowrap text-[14.5px] text-text-primary-color ${isActive ? "bg-accent-color text-white" : "bg-transparent"} w-full cursor-pointer overflow-hidden rounded px-1 py-1 transition-all duration-300 hover:bg-accent-color hover:text-white`}
        >
          <span className="flex min-w-[32px] items-center justify-center rounded p-1 text-xl">
            {icon}
          </span>
          <span className="leading-0 flex w-full grow items-center justify-between gap-2 pr-2">
            {label}

            <MdOutlineChevronRight
              className={`text-sm ${sideMenu ? "rotate-90" : ""}`}
            />
          </span>
        </h3>
      ) : (
        <NavLink
          onClick={handleMenuClickInMobile}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-1 text-nowrap text-[14.5px] text-text-primary-color ${isActive ? "bg-accent-color text-white" : "bg-transparent"} w-full overflow-hidden rounded px-1 py-1 transition-all duration-300 hover:bg-accent-color hover:text-white`
          }
        >
          <span className="flex min-w-[32px] items-center justify-center rounded p-1 text-xl">
            {icon}
          </span>
          <span className="leading-0 flex w-full grow items-center justify-between gap-2 pr-2">
            {label}
          </span>
        </NavLink>
      )}
      <div
        className={` ${isSidebarExpanded ? "grid" : "hidden"} ${sideMenu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all duration-300 group-hover:grid`}
      >
        <div className="row-span-2 overflow-hidden">
          <ul className="mt-4 flex flex-col">
            {children &&
              children.map((item, index) => (
                <SubMenu
                  key={index}
                  item={item}
                  handleMenuClickInMobile={handleMenuClickInMobile}
                />
              ))}
          </ul>
        </div>
      </div>
    </li>
  );
};
