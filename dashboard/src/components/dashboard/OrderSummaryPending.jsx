import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

export const OrderSummaryPending = () => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary-color">
        <span className="flex size-6 items-center justify-center rounded bg-green-500/10">
          <MdOutlinePendingActions className="text-lg text-green-500" />
        </span>
        Pending
      </div>
      <div className="text flex items-center gap-2 font-semibold text-text-primary-color">
        <span className="flex items-center gap-[2px] text-xs text-red-500">
          <FaArrowDownLong /> 1.37%
        </span>
        <span>1,251</span>
      </div>
    </li>
  );
};
