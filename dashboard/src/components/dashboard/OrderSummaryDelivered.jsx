import { FaArrowUpLong } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";

export const OrderSummaryDelivered = () => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary-color">
        <span className="flex size-6 items-center justify-center rounded bg-accent-color/10">
          <GoPackage className="text-lg text-accent-color" />
        </span>
        Delivered
      </div>
      <div className="text flex items-center gap-2 font-semibold text-text-primary-color">
        <span className="flex items-center gap-[2px] text-xs text-green-500">
          <FaArrowUpLong /> 0.75%
        </span>
        <span>1,754</span>
      </div>
    </li>
  );
};
