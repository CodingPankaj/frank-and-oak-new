import { Link } from "react-router-dom";
import { ActionButtons } from "../ActionsButtons";
import { ContentCard } from "../ContentCard";
import { TableTr } from "../table/TableTr";
import { TableTd } from "../table/TableTd";
import { Statusbadge } from "../StatusBadge";
import { TableTextSpan } from "../table/TableSpan";
import { currencyFormatter } from "../../utils/currencyFormater";

export const OrderTable = ({ data }) => {
  return (
    <div className="scrollbar grid w-full grid-cols-1 overflow-x-auto whitespace-nowrap bg-bg-primary-color">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="text-left text-sm font-semibold text-text-primary-color">
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Payment Status</th>
            <th className="px-4 py-2">Order Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <RecentOrdersList item={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecentOrdersList = ({
  item: {
    orderID,
    customerName,
    customerEmail,
    orderDate,
    totalAmount,
    paymentStatus,
    orderStatus,
    profilePic,
  },
}) => {
  const paymentStatusColorGen = () => {
    if (paymentStatus.toLowerCase() === "paid") return "34, 197, 94";
    if (paymentStatus.toLowerCase() === "unpaid") return "250, 117, 22";
    if (paymentStatus.toLowerCase() === "failed") return "239, 68, 68";
    if (paymentStatus.toLowerCase() === "refunded") return "20, 184, 166";
  };

  const orderStatusColorGen = () => {
    if (orderStatus.toLowerCase() === "pending") return "250, 117, 22";
    if (orderStatus.toLowerCase() === "processing") return "20, 184, 166";
    if (orderStatus.toLowerCase() === "shipped") return "114, 92, 255";
    if (orderStatus.toLowerCase() === "delivered") return "34, 197, 94";
    if (orderStatus.toLowerCase() === "cancelled") return "239, 68, 68";
    if (orderStatus.toLowerCase() === "returned") return "20, 184, 166";
  };

  const formattedPrice = currencyFormatter(totalAmount);
  const paymentStatusColor = paymentStatusColorGen();
  const orderStatusColor = orderStatusColorGen();

  return (
    <TableTr>
      <TableTd>
        <Link className="text-xs text-accent-color">{orderID}</Link>
      </TableTd>
      <TableTd>
        <ContentCard
          src={profilePic}
          heading={customerName}
          subHeading={customerEmail}
        />
      </TableTd>
      <TableTd>
        <TableTextSpan>{orderDate}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan className="font-bold">{formattedPrice}</TableTextSpan>
      </TableTd>
      <TableTd>
        <Statusbadge color={paymentStatusColor}>{paymentStatus}</Statusbadge>
      </TableTd>
      <TableTd>
        <Statusbadge color={orderStatusColor}>{orderStatus}</Statusbadge>
      </TableTd>
      <TableTd>
        <ActionButtons />
      </TableTd>
    </TableTr>
  );
};
