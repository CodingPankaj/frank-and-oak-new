import { Table } from "../table/Table";
import { TableHead } from "../table/TableHead";
import { TableTh } from "../table/TableTh";
import { TableTr } from "../table/TableTr";
import { TableTd } from "../table/TableTd";
import { ContentCard } from "../ContentCard";
import { MainCardContainer } from "../MainCardCointainer";
import { CardTop } from "../CardTop";
import { CardTopIconConatiner } from "../CardTopIconContainer";
import { IoMdListBox } from "react-icons/io";
import { TableTextSpan } from "../table/TableSpan";

export const ItemSummaryCard = () => {
  return (
    <MainCardContainer>
      <CardTop heading={`Item Summary`}>
        <CardTopIconConatiner>
          <IoMdListBox />
        </CardTopIconConatiner>
      </CardTop>

      <Table>
        <TableHead>
          <TableTh>Item</TableTh>
          <TableTh>Category</TableTh>
          <TableTh>Size</TableTh>
          <TableTh>Color</TableTh>
          <TableTh>Quantity</TableTh>
          <TableTh>Total Price</TableTh>
        </TableHead>
        <tbody>
          <OrderDetailsItemSummaryRow />
          <OrderDetailsItemSummaryRow />
          <OrderDetailsItemSummaryRow />
          <OrderDetailsItemSummaryRow />
          <OrderDetailsItemSummaryRow />
        </tbody>
      </Table>
    </MainCardContainer>
  );
};

const OrderDetailsItemSummaryRow = () => {
  return (
    <TableTr>
      <TableTd>
        <ContentCard
          src="/images/1.jpg"
          heading="Alarm Clock"
          subHeading="Dolce & Gabbana"
        />
      </TableTd>
      <TableTd>
        <TableTextSpan>Electronics</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>N/A</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>Blue</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>1</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan className="font-bold">₹1900.00</TableTextSpan>
      </TableTd>
    </TableTr>
  );
};
