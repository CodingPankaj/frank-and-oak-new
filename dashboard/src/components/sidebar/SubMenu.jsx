import { NavLink } from "react-router-dom";

export const SubMenu = ({ item: { label, path }, handleMenuClickInMobile }) => {
  return (
    <li className="group flex">
      <NavLink
        onClick={handleMenuClickInMobile}
        to={path}
        className={({ isActive }) =>
          `ml-4 border-l-2 px-5 py-2 text-sm font-medium ${isActive ? "border-accent-color text-text-primary-color" : "border-border-color text-text-secondary-color"}`
        }
      >
        {label}
      </NavLink>
    </li>
  );
};
