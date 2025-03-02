import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { CardTopIconConatiner } from "../CardTopIconContainer";
import { Table } from "../table/Table";
import { TableTrTwo } from "../table/TableTrTwo";
import { FaAddressCard } from "react-icons/fa";

export const CustomerDetailsCard = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Customer Details">
        <CardTopIconConatiner>
          <FaAddressCard />
        </CardTopIconConatiner>
      </CardTop>
      <Table>
        <tbody>
          <TableTrTwo title="Full Name:" text="Pankaj Sharma" />
          <TableTrTwo
            title="Email:"
            text="itsspankajhsarma@gmail"
            className="text-accent-color"
          />
          <TableTrTwo title="Phone:" text="+917539022342" />
          <TableTrTwo title="Billing Address:" text="QR A/2, Rourkela" />
          <TableTrTwo title="Delivery Address:" text="QR A/2, Rourkela" />
          <TableTrTwo title="Pin Code:" text="769013" />
        </tbody>
      </Table>
    </MainCardContainer>
  );
};
