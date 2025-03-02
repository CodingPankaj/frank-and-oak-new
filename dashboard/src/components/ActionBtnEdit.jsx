import { BiEditAlt } from "react-icons/bi";

export const ActionBtnEdit = ({ ...props }) => {
  return (
    <button
      {...props}
      className="rounded bg-accent-color/10 p-1 text-sm text-accent-color hover:bg-accent-color hover:text-white"
    >
      <BiEditAlt />
    </button>
  );
};
