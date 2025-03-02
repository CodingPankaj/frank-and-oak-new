import { FaArrowUpLong } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const OrderSummaryItem = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary-color">
        <span className="flex size-6 items-center justify-center rounded bg-red-500/10">
          <IoMdCloseCircleOutline className="text-lg text-red-500" />
        </span>
        Cancelled
      </div>
      <div className="text flex items-center gap-2 font-semibold text-text-primary-color">
        <span className="flex items-center gap-[2px] text-xs text-green-500">
          <FaArrowUpLong /> 0.75%
        </span>
        <span>152</span>
      </div>
    </div>
  );
};
