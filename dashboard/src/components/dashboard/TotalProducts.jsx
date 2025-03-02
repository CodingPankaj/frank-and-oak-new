import { GoPackage } from "react-icons/go";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

export const TotalProducts = () => {
  return (
    <div className="flex items-start justify-between gap-1 rounded bg-bg-primary-color p-3 shadow-md">
      <div className="flex flex-col gap-1 text-text-secondary-color">
        <h4 className="text-sm font-medium">Total Products</h4>
        <h3 className="text-[28px] font-medium text-text-primary-color">857</h3>
        <p className="flex items-center gap-2 text-xs font-medium text-text-secondary-color">
          <span className="flex items-center gap-1 text-red-500">
            <MdTrendingDown /> +6.81%
          </span>
          This Month
        </p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-2xl text-white">
        <GoPackage />
      </div>
    </div>
  );
};
