import { RiDeleteBin6Line } from "react-icons/ri";

export const ActionBtnDelete = ({ ...props }) => {
  return (
    <button
      {...props}
      className="rounded bg-red-500/10 p-1 text-sm text-red-500 hover:bg-red-500 hover:text-white"
    >
      <RiDeleteBin6Line />
    </button>
  );
};
