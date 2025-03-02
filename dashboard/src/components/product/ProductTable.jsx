import { Table } from "../table/Table";
import { TableHead } from "../table/TableHead";
import { TableTd } from "../table/TableTd";
import { TableTh } from "../table/TableTh";
import { TableTr } from "../table/TableTr";
import { ContentCard } from "../ContentCard";
import { ActionButtons } from "../ActionsButtons";
import { TableTextSpan } from "../table/TableSpan";
import { Statusbadge } from "../StatusBadge";
import { CheckBox } from "../CheckBox";
import { currencyFormatter } from "../../utils/currencyFormater";

export const ProductTable = ({ data = [] }) => {
  return (
    <Table>
      <TableHead>
        <TableTh>
          <CheckBox />
        </TableTh>
        <TableTh>Product</TableTh>
        <TableTh>Category</TableTh>
        <TableTh>Stock</TableTh>
        <TableTh>Size</TableTh>
        <TableTh>Color</TableTh>
        <TableTh>Price</TableTh>
        <TableTh>Status</TableTh>
        <TableTh>Published</TableTh>
        <TableTh>Actions</TableTh>
      </TableHead>
      <tbody>
        {data.map((item, index) => (
          <ProductList item={item} key={index} />
        ))}
      </tbody>
    </Table>
  );
};

const ProductList = ({
  item: {
    title,
    brand,
    image,
    category,
    stock,
    size,
    color,
    price,
    status,
    published,
  },
}) => {
  const publishedStatus = (status) => {
    if (status.toLowerCase() === "unpublished") return "250, 117, 22";
    if (status.toLowerCase() === "published") return "114, 92, 255";
    if (status.toLowerCase() === "draft") return "20, 184, 166";
  };

  const formattedPrice = currencyFormatter(price);
  const publishedstatusColor = publishedStatus(status);

  return (
    <TableTr>
      <TableTd>
        <CheckBox />
      </TableTd>
      <TableTd>
        <ContentCard src={image} heading={title} subHeading={brand} />
      </TableTd>
      <TableTd>
        <TableTextSpan>{category}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{stock}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{size}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{color}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan className="font-bold">{formattedPrice}</TableTextSpan>
      </TableTd>
      <TableTd>
        <Statusbadge color={publishedstatusColor}>{status}</Statusbadge>
      </TableTd>
      <TableTd>
        <TableTextSpan>{published ?? "N/A"}</TableTextSpan>
      </TableTd>
      <TableTd>
        <ActionButtons />
      </TableTd>
    </TableTr>
  );
};
