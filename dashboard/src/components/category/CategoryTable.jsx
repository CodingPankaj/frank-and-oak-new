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
import { useState } from "react";
import { Statusbadge } from "../StatusBadge";
import { statusBgColorSelectort } from "../../utils/statusBgColorSelectort";

export const CategoryTable = ({
  data,
  setInputData,
  setImageUrl,
  oldCategoryData,
  setOldCategoryData,
  getCategory,
  setRadioBtnStatus,
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
          <TableTh>Status</TableTh>
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
                setRadioBtnStatus={setRadioBtnStatus}
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
  setRadioBtnStatus,
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

  const [deleteBtnLoaderStatus, setDeleteBtnLoaderStatus] = useState(false);
  // Delete category
  const handleDelete = async (id) => {
    const deleteUrl = `admin/category/delete/${id}`;
    await deleteSingleData(
      deleteUrl,
      getCategory,
      "category",
      setDeleteBtnLoaderStatus,
    );
  };

  const handleEditButtonClick = () => {
    // set category data to input form data
    setInputData(catData);

    // set category data to old category data for comparaison, if changes are made or not
    setOldCategoryData({ ...catData, categoryImage });

    // setting the old image url to show the image in ui while ediing
    setImageUrl(categoryImage);

    // change radio button status
    setRadioBtnStatus(categoryStatus);
  };

  // status color for active and in active
  const statusBgColor = statusBgColorSelectort(categoryStatus);

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
        <Statusbadge color={statusBgColor}>
          {categoryStatus ? "Active" : "In Active"}
        </Statusbadge>
      </TableTd>

      <TableTd>
        <ActionBtnContainer>
          <ActionBtnEdit onClick={handleEditButtonClick} />
          <ActionBtnDelete
            deleteButtonLoader={deleteBtnLoaderStatus}
            onClick={() => handleDelete(_id)}
          />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
