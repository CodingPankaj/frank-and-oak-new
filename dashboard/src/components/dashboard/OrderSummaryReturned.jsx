import { FaArrowUpLong } from "react-icons/fa6";
import { TbJumpRope } from "react-icons/tb";

export const OrderSummaryReturned = () => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary-color">
        <span className="flex size-6 items-center justify-center rounded bg-cyan-500/10">
          <TbJumpRope className="text-lg text-cyan-500" />
        </span>
        Returned
      </div>
      <div className="text flex items-center gap-2 font-semibold text-text-primary-color">
        <span className="flex items-center gap-[2px] text-xs text-green-500">
          <FaArrowUpLong /> 0.75%
        </span>
        <span>91</span>
      </div>
    </li>
  );
};
