import { FaArrowUpLong } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdTrendingUp } from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import { MainCardContainer } from "../MainCardCointainer";
import { CardTop } from "../CardTop";

export const RevenueCard = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Revenue Overview">
        <SelectBox id="revenue-sort">
          <SelectBoxOptions value="Today" label="Today" />
          <SelectBoxOptions value="1 Month" label="1 Month" />
          <SelectBoxOptions value="6 Months" label="6 Months" />
          <SelectBoxOptions value="1 Year" label="1 Year" />
        </SelectBox>
      </CardTop>

      <div className="flex flex-wrap gap-2 p-3 md:gap-5">
        <h4 className="flex grow flex-col gap-1 rounded border border-dashed border-border-color bg-bg-color-3 p-4 text-center text-xs font-medium text-text-primary-color">
          Total Orders
          <span className="text-xl font-semibold">684</span>
        </h4>
        <h4 className="flex grow flex-col gap-1 rounded border border-dashed border-border-color bg-bg-color-3 p-4 text-center text-xs font-medium text-text-primary-color">
          Total Sales
          <span className="text-xl font-semibold">574</span>
        </h4>
        <h4 className="flex grow flex-col gap-1 rounded border border-dashed border-border-color bg-bg-color-3 p-4 text-center text-xs font-medium text-text-primary-color">
          Profit Per Sale:
          <span className="flex items-center justify-center text-xl font-semibold text-green-500">
            <FaArrowUpLong className="text-base" /> +6.84%
          </span>
        </h4>
      </div>
      <div className="h-full p-3">
        <OrdersAndSalesChart />
      </div>
    </MainCardContainer>
  );
};

const revenueData = [
  { month: "Jan", orders: 55, sales: 32 },
  { month: "Feb", orders: 48, sales: 29 },
  { month: "Mar", orders: 65, sales: 41 },
  { month: "Apr", orders: 72, sales: 46 },
  { month: "May", orders: 80, sales: 50 },
  { month: "Jun", orders: 77, sales: 46 },
  { month: "Jul", orders: 81, sales: 48 },
  { month: "Aug", orders: 60, sales: 38 },
  { month: "Sep", orders: 52, sales: 33 },
  { month: "Oct", orders: 75, sales: 50 },
  { month: "Nov", orders: 95, sales: 67 },
  { month: "Dec", orders: 110, sales: 78 },
];

const OrdersAndSalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={revenueData} margin={{ left: -22 }}>
        <CartesianGrid
          strokeDasharray="5 2"
          vertical={false}
          stroke="#666666"
        />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 150]} ticks={[0, 50, 100, 150]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" barSize={25} fill="#725CFF" />
        <Line
          type="monotone"
          strokeWidth={4}
          dataKey="sales"
          stroke="#fa7516"
          dot={{ r: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
