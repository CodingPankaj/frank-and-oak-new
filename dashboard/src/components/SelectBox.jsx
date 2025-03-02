import { IoChevronDownSharp } from "react-icons/io5";

export const SelectBox = ({
  children,
  className = "sort-select-box",
  ...props
}) => {
  return (
    <div className="relative flex">
      <IoChevronDownSharp className="absolute right-2 top-2/4 -translate-y-2/4 text-sm" />
      <select {...props} className={`select ${className}`}>
        {children}
      </select>
    </div>
  );
};
