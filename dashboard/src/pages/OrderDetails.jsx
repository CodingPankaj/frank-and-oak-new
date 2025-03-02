import { MainSection } from "../components/MainSection";
import { BillingAddressCard } from "../components/order/BillingAddressCard";
import { CustomerDetailsCard } from "../components/order/CustomerDetailsCard";
import { DeliveryAddressCard } from "../components/order/DeliveryAddressCard";
import { ItemSummaryCard } from "../components/order/ItemSummaryCard";
import { OrderSummaryCard } from "../components/order/OrderSummaryCard";
import { OrderTrackingcard } from "../components/order/OrderTrackingcard";

export const OrderDetails = () => {
  return (
    <MainSection>
      <div className="grid gap-5 xl:grid-cols-[1fr_35%]">
        <div className="grid grid-cols-1 gap-5">
          <div className="grid gap-5 xl:grid-cols-2">
            <OrderSummaryCard />
            <CustomerDetailsCard />
            <BillingAddressCard />
            <DeliveryAddressCard />
          </div>
          <ItemSummaryCard />
        </div>
        <OrderTrackingcard />
      </div>
    </MainSection>
  );
};
