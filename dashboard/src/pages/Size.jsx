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

export const Size = () => {
  const [loading, setLoading] = useState(false);
  const [allSizes, setAllSizes] = useState([]);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [emptyFieldError, SetEmptyFieldError] = useState(false);

  const [formData, setFormData] = useState({
    sizeName: "",
    sizeStatus: true,
  });

  useEffect(() => {
    const newFormData = { ...formData };
    newFormData.sizeStatus = radioBtnStatus;
    setFormData(newFormData);
  }, [radioBtnStatus]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Get all sizes from database
  const getAllSizes = async () => {
    const res = await fetchApiData(`${apiBaseUrl}admin/size/view`);
    setAllSizes(res.data);
  };

  // One tiime call of all sizes
  useEffect(() => {
    getAllSizes();
  }, []);

  // Get data from input fields
  const getInputValue = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  // Form Submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { sizeName, sizeStatus } = formData;
    // Empty Size Name
    if (!sizeName) {
      SetEmptyFieldError(true);
      return toastError("Size Name Cannot Be Empty");
    }

    // // Duplicate Size Name
    // const duplicateSizeName = allSizes.some(
    //   (item) => item.sizeName === sizeName,
    // );

    // if (duplicateSizeName && id === "") {
    //   return toastWarn();
    // }

    setLoading(true);
    // Add Size Name to Database
    try {
      const res = await axios.post(`${apiBaseUrl}admin/size/add`, formData, {
        withCredentials: true,
      });

      getAllSizes();
      setFormData((prevData) => ({ ...prevData, sizeName: "" }));
      setRadioBtnStatus(true);
      toastSuccess("Size Added");
      SetEmptyFieldError(false);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error.message);
      toastError((message = error.message));
      setLoading(false);
    }
  };

  // Delete Size
  const handleSizeDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure, you want to delete?");

    if (isConfirmed) {
      try {
        const res = await axios.delete(`${apiBaseUrl}admin/size/delete/${id}`, {
          withCredentials: true,
        });
        getAllSizes();
        toastError();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const [bulkDeleteItemId, setBulkDeleteItemId] = useState([]);

  // Bulk Delete
  const handleBulkDelete = async () => {
    try {
      const res = await axios.delete(`${apiBaseUrl}admin/size/delete`, {
        data: bulkDeleteItemId,
      });
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
              <div className="product-input-container">
                <label htmlFor="size-name" className="add-product-label">
                  Size Name
                </label>
                <input
                  type="text"
                  id="size-name"
                  name="sizeName"
                  placeholder="Enter Size Name"
                  className="product-input"
                  style={{ borderColor: emptyFieldError ? "#ef4444" : "" }}
                  onChange={getInputValue}
                  value={formData.sizeName}
                />
                {emptyFieldError && (
                  <p className="text-[11px] text-red-500">Enter size name</p>
                )}
              </div>

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
                id: _id,
              }))
            }
          />
          <ActionBtnDelete onClick={() => handleSizeDelete(_id)} />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
