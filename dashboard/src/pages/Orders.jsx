import recentOrders from "../api/recentOrders.json";
import { MainCardContainer } from "../components/MainCardCointainer";
import { OrderTable } from "../components/order/OrderTable";
import { useEffect, useState } from "react";
import { MainSection } from "../components/MainSection";
import { SelectBoxOptions } from "../components/SelectBoxOptions";
import { SelectBox } from "../components/SelectBox";
import { useLocation } from "react-router-dom";
import { CardTop } from "../components/CardTop";

export const Orders = () => {
  const [orderData, setOrderData] = useState(recentOrders);
  const [paymentFIlterData, setPaymentFilterData] = useState(orderData);
  const [filterValue, setFilterValue] = useState("all");

  const orderPageLocation = useLocation()
    .pathname.split("/")
    .pop()
    .toLowerCase();

  const renderData = (location) => {
    if (location === "all") {
      setOrderData(recentOrders);
    } else {
      setOrderData(
        recentOrders.filter(
          (item) => item.orderStatus.toLowerCase() === location,
        ),
      );
    }
  };

  useEffect(() => {
    setPaymentFilterData(orderData);
  }, [orderData]);

  useEffect(() => {
    renderData(orderPageLocation);
    setFilterValue("all");
  }, [orderPageLocation]);

  const handlePaymentStatusChange = (status) => {
    setFilterValue(status);
    if (status === "all") {
      setPaymentFilterData(orderData);
    } else {
      setPaymentFilterData(
        orderData.filter((item) => item.paymentStatus.toLowerCase() === status),
      );
    }
  };

  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading={`${orderPageLocation} Orders`}>
          <div className="flex flex-wrap gap-4">
            <SelectBox
              value={filterValue}
              onChange={(e) => handlePaymentStatusChange(e.target.value)}
              name="payment-status"
            >
              <SelectBoxOptions value="all" label="All" />
              <SelectBoxOptions value="paid" label="Paid" />
              <SelectBoxOptions value="unpaid" label="UnPaid" />
              <SelectBoxOptions value="failed" label="Failed" />
              <SelectBoxOptions value="refunded" label="Refunded" />
            </SelectBox>
          </div>
        </CardTop>
        {paymentFIlterData.length === 0 ? (
          <div className="py-20 text-center capitalize">
            No {filterValue} Orders Found
          </div>
        ) : (
          <OrderTable data={paymentFIlterData} />
        )}
      </MainCardContainer>
    </MainSection>
  );
};
