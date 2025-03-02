import { TableTd } from "../table/TableTd";
import { TableTr } from "../table/TableTr";
import { TableTextSpan } from "../table/TableSpan";
import { Table } from "../table/Table";
import { TableTh } from "../table/TableTh";
import { CheckBox } from "../CheckBox";
import { TableHead } from "../table/TableHead";
import { MainCardContainer } from "../MainCardCointainer";
import { CardTop } from "../CardTop";
import { ActionBtnEdit } from "../ActionBtnEdit";
import { ActionBtnDelete } from "../ActionBtnDelete";
import { ActionBtnContainer } from "../ActionBtnContainer";
import { deleteSingleData } from "../../services/deleteSingleData";

export const CategoryTable = ({
  data,
  setInputData,
  setImageUrl,
  oldCategoryData,
  setOldCategoryData,
  getCategory,
}) => {
  return (
    <MainCardContainer className="lg:col-span-2">
      <CardTop heading="Categories" headingStyle="text-sm" />
      <Table>
        <TableHead>
          <TableTh>
            <CheckBox name="category-box" />
          </TableTh>
          <TableTh>ID</TableTh>
          <TableTh>Image</TableTh>
          <TableTh>Categoy</TableTh>
          <TableTh>Type</TableTh>
          <TableTh>Slug</TableTh>
          <TableTh>Actions</TableTh>
        </TableHead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <CategoryList
                key={index}
                item={item}
                setInputData={setInputData}
                setImageUrl={setImageUrl}
                oldCategoryData={oldCategoryData}
                setOldCategoryData={setOldCategoryData}
                getCategory={getCategory}
              />
            ))}
        </tbody>
      </Table>
    </MainCardContainer>
  );
};

const CategoryList = ({
  item,
  setInputData,
  setImageUrl,
  setOldCategoryData,
  getCategory,
}) => {
  const {
    _id,
    categoryName,
    categoryImage,
    categoryStatus,
    categoryDescription,
    categoryType,
  } = item;

  // category data made from item
  const catData = {
    _id,
    categoryName,
    categoryStatus,
    categoryDescription,
    categoryType,
  };

  // Delete Size
  const handleDelete = async (id) => {
    const deleteUrl = `admin/category/delete/${id}`;
    await deleteSingleData(deleteUrl, getCategory, "category");
  };

  const handleEditButtonClick = () => {
    // set category data to input form data
    setInputData(catData);

    // set category data to old category data for comparaison, if changes are made or not
    setOldCategoryData({ ...catData, categoryImage });

    // setting the old image url to show the image in ui while ediing
    setImageUrl(categoryImage);
  };

  return (
    <TableTr>
      <TableTd>
        <CheckBox name="category-box" />
      </TableTd>
      <TableTd>
        <TableTextSpan>{_id}</TableTextSpan>
      </TableTd>
      <TableTd>
        <div className="size-10 overflow-hidden rounded">
          <img src={categoryImage} alt="thumbnail" />
        </div>
      </TableTd>
      <TableTd>
        <TableTextSpan>{categoryName}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>
          {categoryType ? "Subcategory" : "Parent Category"}
        </TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{categoryStatus ? "Active" : "In Active"}</TableTextSpan>
      </TableTd>

      <TableTd>
        <ActionBtnContainer>
          <ActionBtnEdit onClick={handleEditButtonClick} />
          <ActionBtnDelete onClick={() => handleDelete(_id)} />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
