import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { OrderSummaryCancelled } from "./OrderSummaryCancelled";
import { OrderSummaryDelivered } from "./OrderSummaryDelivered";
import { OrderSummaryPending } from "./OrderSummaryPending";
import { OrderSummaryPieChart } from "./OrderSummaryPieChart";
import { OrderSummaryReturned } from "./OrderSummaryReturned";

export const DashboardOrderSummary = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Order Summary" />
      <OrderSummaryPieChart />
      <div className="p-3">
        <ul className="flex flex-col gap-4">
          <OrderSummaryDelivered />
          <OrderSummaryPending />
          <OrderSummaryCancelled />
          <OrderSummaryReturned />
        </ul>
      </div>
    </MainCardContainer>
  );
};
