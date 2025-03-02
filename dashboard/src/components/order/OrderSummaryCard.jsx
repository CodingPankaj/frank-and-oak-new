import { CardTop } from "../CardTop";
import { CardTopIconConatiner } from "../CardTopIconContainer";
import { MainCardContainer } from "../MainCardCointainer";
import { Table } from "../table/Table";
import { TableTrTwo } from "../table/TableTrTwo";
import { GoPackage } from "react-icons/go";

export const OrderSummaryCard = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Order Summary">
        <CardTopIconConatiner>
          <GoPackage />
        </CardTopIconConatiner>
      </CardTop>
      <Table>
        <tbody>
          <TableTrTwo
            title="Order ID:"
            text="#ORD008"
            className="text-accent-color"
          />
          <TableTrTwo title="Total Items:" text="04" />
          <TableTrTwo
            title="Applied Coupon:"
            text="ECOMK55"
            className="rounded bg-green-500/10 px-3 py-1 text-green-500"
          />
          <TableTrTwo
            title="Delivery Fee:"
            text="₹49"
            className="text-red-500"
          />
          <TableTrTwo title="Sub Total:" text="₹5,941" />
          <TableTrTwo title="Total:" text="₹6,941" />
        </tbody>
      </Table>
    </MainCardContainer>
  );
};
