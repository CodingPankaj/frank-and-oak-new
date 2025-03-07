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

export const SubcategoryTable = ({
  subcategoryData,
  setInputData,
  setImageUrl,
  oldSubcategoryData,
  setOldSubcategoryData,
  getSubcategory,
  setRadioBtnStatus,
}) => {
  return (
    <MainCardContainer className="lg:col-span-2">
      <CardTop heading="Sub Categories" headingStyle="text-sm" />
      <Table>
        <TableHead>
          <TableTh>
            <CheckBox name="sub-category-box" />
          </TableTh>
          <TableTh>ID</TableTh>
          <TableTh>Image</TableTh>
          <TableTh>Category</TableTh>
          <TableTh>Parent Category</TableTh>
          <TableTh>Status</TableTh>
          <TableTh>Actions</TableTh>
        </TableHead>
        <tbody>
          {subcategoryData &&
            subcategoryData.length > 0 &&
            subcategoryData.map((item, index) => (
              <CategoryList
                key={item._id}
                item={item}
                setInputData={setInputData}
                setImageUrl={setImageUrl}
                oldSubcategoryData={oldSubcategoryData}
                setOldSubcategoryData={setOldSubcategoryData}
                getSubcategory={getSubcategory}
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
  setOldSubcategoryData,
  getSubcategory,
  setRadioBtnStatus,
}) => {
  const {
    _id,
    subcategoryName,
    subcategoryImage,
    subcategoryStatus,
    subcategoryDescription,
    parentCategory,
  } = item;
  const [deleteBtnLoaderStatus, setDeleteBtnLoaderStatus] = useState(false);
  // sub category data made from item
  const catData = {
    _id,
    subcategoryName,
    subcategoryStatus,
    subcategoryDescription,
    parentCategory,
  };

  // // Delete sub category
  const handleDelete = async (id) => {
    const deleteUrl = `admin/subcategory/delete/${id}`;
    await deleteSingleData(
      deleteUrl,
      getSubcategory,
      "Sub category",
      setDeleteBtnLoaderStatus,
    );
  };

  const handleEditButtonClick = () => {
    // set category data to input form data
    setInputData(catData);

    // set category data to old category data for comparaison, if changes are made or not
    setOldSubcategoryData({ ...catData, subcategoryImage });

    // setting the old image url to show the image in ui while ediing
    setImageUrl(subcategoryImage);

    // update radio button status
    setRadioBtnStatus(subcategoryStatus);
  };

  // status color for active and in active
  const statusBgColor = statusBgColorSelectort(subcategoryStatus);

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
          <img src={subcategoryImage} alt="thumbnail" />
        </div>
      </TableTd>
      <TableTd>
        <TableTextSpan>{subcategoryName}</TableTextSpan>
      </TableTd>

      <TableTd>
        <TableTextSpan>
          {parentCategory ? parentCategory.categoryName : "N/A"}
        </TableTextSpan>
      </TableTd>

      <TableTd>
        <TableTextSpan>
          <Statusbadge color={statusBgColor}>
            {subcategoryStatus ? "Active" : "In Active"}
          </Statusbadge>
        </TableTextSpan>
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
