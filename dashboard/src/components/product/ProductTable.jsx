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
import { useEffect, useState } from "react";
import { fetchApiData } from "../../services/fetchApiData";
import { deleteSingleData } from "../../services/deleteSingleData";
import { ActionBtnDelete } from "../ActionBtnDelete";

export const ProductTable = () => {
  const [productData, setProductData] = useState([]);

  // functions to get color data
  const getAllProducts = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/product/view`,
    );

    setProductData(res.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableTh>
          <CheckBox />
        </TableTh>
        <TableTh>Product</TableTh>
        <TableTh>Category</TableTh>
        <TableTh>Sub Category</TableTh>
        <TableTh>Size</TableTh>
        <TableTh>Color</TableTh>
        <TableTh>Price</TableTh>
        <TableTh>Sale Price</TableTh>
        <TableTh>Status</TableTh>
        <TableTh>Actions</TableTh>
      </TableHead>
      <tbody>
        {productData &&
          productData.length > 0 &&
          productData.map((product) => (
            <ProductList
              product={product}
              key={product._id}
              getAllProducts={getAllProducts}
            />
          ))}
      </tbody>
    </Table>
  );
};

const ProductList = ({ product, getAllProducts }) => {
  const {
    _id,
    productName,
    productParentCategory,
    productSubcategory,
    productImages,
    productSizes,
    productColors,
    productPrice,
    productSalePrice,
  } = product;

  const publishedStatus = (status) => {
    if (status.toLowerCase() === "unpublished") return "250, 117, 22";
    if (status.toLowerCase() === "published") return "114, 92, 255";
    if (status.toLowerCase() === "draft") return "20, 184, 166";
  };

  // Delete category
  const handleDelete = async (id) => {
    const deleteUrl = `admin/product/delete/${id}`;
    await deleteSingleData(deleteUrl, getAllProducts, "product");
  };

  const formattedPrice = currencyFormatter(productPrice);
  const formattedSalePrice = productSalePrice
    ? currencyFormatter(productSalePrice)
    : "N/A";
  // const publishedstatusColor = publishedStatus(status);

  return (
    <TableTr>
      <TableTd>
        <CheckBox />
      </TableTd>
      <TableTd>
        <ContentCard
          src={productImages[0]}
          heading={productName}
          subHeading={"Frank And Oak"}
        />
      </TableTd>
      <TableTd>
        <TableTextSpan>{productParentCategory.categoryName}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{productSubcategory.subcategoryName}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>
          {productSizes &&
            productSizes.length > 1 &&
            productSizes.map((item) => (
              <span key={item._id} className="mr-2">
                {item.sizeName}
              </span>
            ))}
        </TableTextSpan>
      </TableTd>
      <TableTd>
        <div className="flex gap-2">
          {productColors &&
            productColors.length > 1 &&
            productColors.map((item) => (
              <div
                key={item._id}
                className={`size-3 rounded-full`}
                style={{ backgroundColor: item.colorValue }}
              ></div>
            ))}
        </div>
      </TableTd>
      <TableTd>
        <TableTextSpan className="font-bold">{formattedPrice}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan className="font-bold">
          {formattedSalePrice ? formattedSalePrice : "N/A"}
        </TableTextSpan>
      </TableTd>
      <TableTd>
        {/* <Statusbadge color={publishedstatusColor}>{}</Statusbadge> */}
      </TableTd>
      <TableTd>
        <TableTextSpan>{}</TableTextSpan>
      </TableTd>
      <TableTd>
        <ActionBtnDelete onClick={() => handleDelete(_id)} />
      </TableTd>
    </TableTr>
  );
};
