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
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionBtnContainer } from "../components/ActionBtnContainer";
import { ActionBtnEdit } from "../components/ActionBtnEdit";
import { ActionBtnDelete } from "../components/ActionBtnDelete";
import { NoDataFound } from "../components/NoDataFound";
import { Loader } from "../components/Loader";
import { RadioStatusButton } from "../components/RadioStatusButton";
import { fetchApiData } from "../services/fetchApiData";
import { toastError, toastSuccess, toastWarn } from "../utils/tostifytoast";
import { InputField } from "../components/InputField";
import { getInputValue } from "../utils/getInputValue";
import { deleteSingleData } from "../services/deleteSingleData";

export const Size = () => {
  const [loading, setLoading] = useState(false);
  const [allSizes, setAllSizes] = useState([]);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [inputFieldNameError, setInputFieldNameError] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    sizeName: "",
    sizeStatus: true,
  });

  // empty form data
  const emptyFormData = {
    _id: "",
    sizeName: "",
    sizeStatus: true,
  };

  useEffect(() => {
    const newFormData = { ...formData };
    newFormData.sizeStatus = radioBtnStatus;
    setFormData(newFormData);
  }, [radioBtnStatus]);

  // Get all sizes from database
  const getAllSizes = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/size/view`,
    );
    setAllSizes(res.data);
  };

  // One tiime call of all sizes
  useEffect(() => {
    getAllSizes();
  }, []);

  // Get data from input fields
  const handleChange = (e) => {
    getInputValue(e, setFormData);
  };

  // Form Submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { sizeName, sizeStatus, _id } = formData;
    // Empty Size Name
    if (!sizeName) {
      setInputFieldNameError(true);
      return toastError("Size Name Cannot Be Empty");
    }

    // Duplicate Size Name
    const duplicateSizeName = allSizes.some(
      (item) => item.sizeName === sizeName,
    );

    if (duplicateSizeName && _id === "") {
      return toastWarn("Duplicate size name");
    }

    setLoading(true);
    // Add Size Name to Database
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}admin/size/add`,
        formData,
        {
          withCredentials: true,
        },
      );

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
      toastSuccess("Size Added");
      return;
    } catch (error) {
      console.log(error?.message);
      toastError("Failed to add size");
      setLoading(false);
    }
  };

  // Delete Size
  const handleSizeDelete = async (id) => {
    const deleteUrl = `${import.meta.env.VITE_API_BASE_URL}admin/size/delete/${id}`;
    await deleteSingleData(deleteUrl, getAllSizes);
  };

  const [bulkDeleteItemId, setBulkDeleteItemId] = useState([]);

  // Bulk Delete
  const handleBulkDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}admin/size/delete`,
        {
          data: bulkDeleteItemId,
        },
      );
      setBulkDeleteItemId([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   console.log(bulkDeleteItemId);
  // }, [bulkDeleteItemId]);

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
              <button className="primary-btn" onClick={handleBulkDelete}>
                Delete
              </button>
            </div>
          </CardTop>
          {allSizes.length >= 1 ? (
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
                {allSizes.map((size, index) => (
                  <SizeList
                    key={size._id}
                    size={size}
                    slNo={index}
                    handleSizeDelete={handleSizeDelete}
                    setFormData={setFormData}
                    setBulkDeleteItemId={setBulkDeleteItemId}
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
  setBulkDeleteItemId,
}) => {
  return (
    <TableTr>
      <TableTd>
        <CheckBox
          name="category-box"
          onChange={() => {
            setBulkDeleteItemId((prev) => [...prev, _id]);
          }}
        />
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
          <ActionBtnEdit
            onClick={() =>
              setFormData((prevData) => ({
                ...prevData,
                sizeName: sizeName,
                sizeStatus: sizeStatus,
                _id,
              }))
            }
          />
          <ActionBtnDelete onClick={() => handleSizeDelete(_id)} />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
