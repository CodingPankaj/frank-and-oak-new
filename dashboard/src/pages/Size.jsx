import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { Table } from "../components/table/Table";
import { TableHead } from "../components/table/TableHead";
import { TableTh } from "../components/table/TableTh";
import { CheckBox } from "../components/CheckBox";
import { TableTr } from "../components/table/TableTr";
import { TableTd } from "../components/table/TableTd";
import { TableTextSpan } from "../components/table/TableSpan";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ActionBtnContainer } from "../components/ActionBtnContainer";
import { ActionBtnEdit } from "../components/ActionBtnEdit";
import { ActionBtnDelete } from "../components/ActionBtnDelete";
import { NoDataFound } from "../components/NoDataFound";
import { Loader } from "../components/Loader";
import { RadioStatusButton } from "../components/RadioStatusButton";
import { toastError, toastSuccess, toastWarn } from "../utils/tostifytoast";
import { InputField } from "../components/InputField";
import { getInputValue } from "../utils/getInputValue";
import { deleteSingleData } from "../services/deleteSingleData";
import { MainContext } from "../context/MainContext";

export const Size = () => {
  const { sizeData, getAllSizes } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [inputFieldNameError, setInputFieldNameError] = useState(false);
  const [oldFormData, setOldFormData] = useState({});
  const [formData, setFormData] = useState({
    _id: "",
    sizeName: "",
  });

  // empty form data
  const emptyFormData = {
    _id: "",
    sizeName: "",
  };

  // One time call of all sizes if its length is 0
  useEffect(() => {
    if (sizeData.length === 0) {
      getAllSizes();
    }
  }, []);

  // Get data from input fields
  const handleChange = (e) => {
    getInputValue(e, setFormData);
  };

  // Form Submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { sizeName, _id } = formData;
    // Empty Size Name
    if (!sizeName) {
      setInputFieldNameError(true);
      return toastError("Size Name Cannot Be Empty");
    }

    // Duplicate Size Name
    const duplicateSizeName = sizeData.some(
      (item) => item.sizeName === sizeName,
    );

    if (duplicateSizeName && _id === "") {
      return toastWarn("Duplicate size name");
    }

    const newFormData = {};

    // _id is present
    if (_id) {
      // check if old size name has changed
      if (oldFormData.sizeName !== sizeName) {
        newFormData.sizeName = sizeName;
      }

      // check if old size status has changed
      if (oldFormData.sizeStatus !== radioBtnStatus) {
        newFormData.sizeStatus = radioBtnStatus;
      }

      // check if no changes are made by checking if new form data is empty
      if (Object.keys(newFormData).length === 0) {
        return toastError("Make any changes to update size");
      }

      // add _id to new form data
      newFormData._id = _id;
    }

    if (!_id) {
      newFormData.sizeName = sizeName;
      newFormData.sizeStatus = radioBtnStatus;
    }

    // change url and api method
    const endpoint = _id ? "admin/size/update" : "admin/size/add";
    const apiMethod = _id ? "patch" : "post";

    // setting button loader and disabling button
    setLoading(true);
    // Add Size Name to Database
    try {
      const res = await axios[apiMethod](
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        newFormData,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        // get all sizes
        getAllSizes();

        // Empty input fields
        setFormData(emptyFormData);

        // set radio button ture
        setRadioBtnStatus(true);

        // set input fields error to false
        setInputFieldNameError(false);

        // set button loading false
        setLoading(false);

        // show toast notification
        toastSuccess(_id ? "Size updated" : "Size added");
      }
      return;
    } catch (error) {
      toastError(_id ? "Failed to update size" : "Failed to add size");
      setLoading(false);
    }
  };

  // Delete Size
  const handleSizeDelete = async (id) => {
    const deleteUrl = `admin/size/delete/${id}`;
    await deleteSingleData(deleteUrl, getAllSizes);
  };

  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Size">
          <div className="flex items-center justify-center gap-5">
            <SearchInput />
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <MainCardContainer>
          <CardTop heading="Add Size" headingStyle="text-sm" />
          <form onSubmit={handleFormSubmit}>
            <div className="pb-3 pt-2">
              {/* Size Name */}

              <InputField
                label="Size Name"
                type="text"
                id="size-name"
                name="sizeName"
                onChange={handleChange}
                value={formData.sizeName}
                setInputFieldError={inputFieldNameError}
                placeholder="Enter Size Name"
              />

              {/* Size Status */}
              <RadioStatusButton
                radioBtnStatus={radioBtnStatus}
                setRadioBtnStatus={setRadioBtnStatus}
              />

              {/* submit button */}
              <div className="mb-4 mt-4 flex items-center justify-center gap-4">
                <button className="primary-btn" disabled={loading}>
                  Add Size
                  {loading && (
                    <Loader
                      className={"size-[14px]"}
                      loaderStyle={"fill-white"}
                    />
                  )}
                </button>
              </div>
            </div>
          </form>
        </MainCardContainer>

        {/* Size right container */}
        <MainCardContainer>
          <CardTop heading="All Sizes" headingStyle="text-sm">
            <div>
              <button className="primary-btn">Delete</button>
            </div>
          </CardTop>
          {sizeData.length >= 1 ? (
            <Table>
              <TableHead>
                <TableTh>
                  <CheckBox name="category-box" />
                </TableTh>
                <TableTh>SL No.</TableTh>
                <TableTh>Size</TableTh>
                <TableTh>Status</TableTh>
                <TableTh>Action</TableTh>
              </TableHead>
              <tbody>
                {sizeData.map((size, index) => (
                  <SizeList
                    key={size._id}
                    size={size}
                    slNo={index}
                    handleSizeDelete={handleSizeDelete}
                    setFormData={setFormData}
                    setRadioBtnStatus={setRadioBtnStatus}
                    setOldFormData={setOldFormData}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <NoDataFound message="Add New Size" />
          )}
        </MainCardContainer>
      </div>
    </MainSection>
  );
};

const SizeList = ({
  size: { _id, sizeName, sizeStatus },
  slNo,
  handleSizeDelete,
  setFormData,
  setRadioBtnStatus,
  setOldFormData,
}) => {
  const sizedata = {
    sizeName,
    sizeStatus,
    _id,
  };

  const handleSizeEdit = () => {
    // set sizedata to  form data to edit size
    setFormData(sizedata);
    // set sizedata to old form data to compare change
    setOldFormData(sizedata);
    // set radio button status
    setRadioBtnStatus(sizeStatus);
  };

  return (
    <TableTr>
      <TableTd>
        <CheckBox name="category-box" />
      </TableTd>
      <TableTd>
        <TableTextSpan>{slNo + 1}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{sizeName}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{sizeStatus ? "Active" : "In Active"}</TableTextSpan>
      </TableTd>
      <TableTd>
        <ActionBtnContainer>
          <ActionBtnEdit onClick={handleSizeEdit} />
          <ActionBtnDelete onClick={() => handleSizeDelete(_id)} />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
