import { CardTop } from "../CardTop";
import recentOrders from "../../api/recentOrders.json";
import { MainCardContainer } from "../MainCardCointainer";
import { OrderTable } from "../order/OrderTable";

export const RecentOrders = () => {
  const displaData = recentOrders.slice(0, 7);
  return (
    <MainCardContainer>
      <CardTop heading="Recent Orders" />
      <OrderTable data={displaData} />
    </MainCardContainer>
  );
};
