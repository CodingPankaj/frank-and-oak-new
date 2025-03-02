import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { CardTopIconConatiner } from "../CardTopIconContainer";
import { Table } from "../table/Table";
import { TableTrTwo } from "../table/TableTrTwo";
import { MdLocalShipping } from "react-icons/md";

export const DeliveryAddressCard = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Delivery Address">
        <CardTopIconConatiner>
          <MdLocalShipping />
        </CardTopIconConatiner>
      </CardTop>
      <Table>
        <tbody>
          <TableTrTwo title="Flat/Building Name:" text="QR A/2" />
          <TableTrTwo title="Address:" text="Railway Colony" />
          <TableTrTwo title="City:" text="Rourkela" />
          <TableTrTwo title="District:" text="Sundargarh" />
          <TableTrTwo title="State:" text="Odisha" />
          <TableTrTwo title="Pin Code:" text="769013" />
        </tbody>
      </Table>
    </MainCardContainer>
  );
};
