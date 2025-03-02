import { MenuItems } from "./MenuItems";
import { sideNav } from "../../data/sideNav";
import { useState } from "react";

export const SidebarMenu = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  return (
    <nav className="scrollbar-hidden h-full grow overflow-y-scroll px-3">
      <ul className="flex flex-col items-start gap-4 overflow-hidden">
        {sideNav.map((item, index) => (
          <MenuItems
            item={item}
            key={index}
            openMenuIndex={openMenuIndex}
            setOpenMenuIndex={setOpenMenuIndex}
            index={index}
          />
        ))}
      </ul>
    </nav>
  );
};
