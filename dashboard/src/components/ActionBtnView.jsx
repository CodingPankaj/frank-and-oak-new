import { IoEye } from "react-icons/io5";

export const ActionBtnView = ({ ...props }) => {
  return (
    <button
      {...props}
      to={"/orders/order-details"}
      className="rounded bg-cyan-500/10 p-1 text-sm text-cyan-500 hover:bg-cyan-500 hover:text-white"
    >
      <IoEye />
    </button>
  );
};
