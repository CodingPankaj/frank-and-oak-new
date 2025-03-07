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
import { InputField } from "../components/InputField";
import { SubmitBtn } from "../components/SubmitBtn";
import axios from "axios";
import { toastError, toastSuccess } from "../utils/tostifytoast";
import { fetchApiData } from "../services/fetchApiData";
import { getInputValue } from "../utils/getInputValue";
import { RadioStatusButton } from "../components/RadioStatusButton";
import { ActionBtnContainer } from "../components/ActionBtnContainer";
import { ActionBtnEdit } from "../components/ActionBtnEdit";
import { ActionBtnDelete } from "../components/ActionBtnDelete";
import { deleteSingleData } from "../services/deleteSingleData";
import { MainContext } from "../context/MainContext";
import { Statusbadge } from "../components/StatusBadge";
import { statusBgColorSelectort } from "../utils/statusBgColorSelectort";

export const Color = () => {
  // store all color
  const { colorData, getAllColors } = useContext(MainContext);
  const [deleteBtnLoaderStatus, setDeleteBtnLoaderStatus] = useState(false);

  // form data
  const [formData, setFormData] = useState({
    _id: "",
    colorName: "",
    colorValue: "",
  });

  const [oldColorData, setOldColorData] = useState({});

  // empty data for form to empty input field
  const emptyData = {
    _id: "",
    colorName: "",
    colorValue: "",
  };

  // input filed error for showing error message
  const [inputFieldNameError, setInputFieldNameError] = useState(false);
  const [inputFieldValueError, setInputFieldValueError] = useState(false);
  // active in active radio button status
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);

  // submit button loading and disable submit button
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);

  // get all colors function
  useEffect(() => {
    if (colorData.length === 0) {
      getAllColors();
    }
  }, []);

  // handle change
  const handleChange = (e) => {
    getInputValue(e, setFormData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { _id, colorName, colorValue, colorStatus } = formData;

    // check if color name is empty
    if (!colorName) {
      setInputFieldNameError(true);
      return toastError("Color name cannot be empty");
    }

    // check if color value is empty
    if (!colorValue) {
      setInputFieldValueError(true);
      return toastError("Color value cannot be empty");
    }

    const newFormData = {};

    if (_id) {
      if (oldColorData.colorName !== colorName) {
        newFormData.colorName = colorName;
      }

      if (oldColorData.colorValue !== colorValue) {
        newFormData.colorValue = colorValue;
      }

      if (oldColorData.colorStatus !== radioBtnStatus) {
        newFormData.colorStatus = radioBtnStatus;
      }

      if (Object.keys(newFormData).length === 0) {
        return toastError("Make any changes to update color");
      }

      newFormData._id = _id;
    }

    if (!_id) {
      newFormData.colorName = colorName;
      newFormData.colorValue = colorValue;
      newFormData.colorStatus = radioBtnStatus;
    }

    // change url and api method
    const endpoint = _id ? "admin/color/update" : "admin/color/add";
    const apiMethod = _id ? "patch" : "post";

    // set submit button status true
    setSubmitBtnLoader(true);

    try {
      // send form data to api
      const res = await axios[apiMethod](
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        newFormData,
        { withCredentials: true },
      );

      if (res.status === 200) {
        getAllColors();
        setSubmitBtnLoader(false);
        setInputFieldValueError(false);
        setInputFieldNameError(false);
        setFormData(emptyData);
        setRadioBtnStatus(true);
        toastSuccess("New color added");
      }
    } catch (error) {
      toastError("Failed to add color");
      setSubmitBtnLoader(false);
    }
  };

  // handle delete color
  const handleColorDelete = async (id) => {
    const deleteUrl = `admin/color/delete/${id}`;
    await deleteSingleData(
      deleteUrl,
      getAllColors,
      "color",
      setDeleteBtnLoaderStatus,
    );
  };

  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Color">
          <div className="flex items-center justify-center gap-5">
            <SearchInput />
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <MainCardContainer>
          <CardTop heading="Add Color" headingStyle="text-sm" />
          <form onSubmit={handleFormSubmit}>
            <div className="pb-3 pt-2">
              {/* Color name */}
              <InputField
                label="Color Name"
                type="text"
                id="color-name"
                name="colorName"
                onChange={handleChange}
                value={formData.colorName}
                setInputFieldError={inputFieldNameError}
                placeholder="Enter Color Name"
              />

              {/* Color value */}
              <InputField
                label="Color Value"
                type="text"
                id="color-value"
                name="colorValue"
                onChange={handleChange}
                value={formData.colorValue}
                setInputFieldError={inputFieldValueError}
                placeholder="Enter Color Value"
              />

              {/* Color Status */}
              <RadioStatusButton
                radioBtnStatus={radioBtnStatus}
                setRadioBtnStatus={setRadioBtnStatus}
              />

              {/* Submit Button */}
              <div className="mb-4 mt-4 flex items-center justify-center gap-4">
                <SubmitBtn
                  label="Add Color"
                  submitBtnLoader={submitBtnLoader}
                />
              </div>
            </div>
          </form>
        </MainCardContainer>

        {/* Right side */}
        <MainCardContainer>
          <CardTop heading="All Color" headingStyle="text-sm" />
          <Table>
            <TableHead>
              <TableTh>
                <CheckBox name="color-box" />
              </TableTh>
              <TableTh>ID</TableTh>
              <TableTh>Color Name</TableTh>
              <TableTh>Color Value</TableTh>
              <TableTh>Preview</TableTh>
              <TableTh>Status</TableTh>
              <TableTh>Action</TableTh>
            </TableHead>
            <tbody>
              {colorData &&
                colorData.length > 0 &&
                colorData.map((item, index) => (
                  <ColorList
                    key={index}
                    item={item}
                    handleColorDelete={handleColorDelete}
                    setOldColorData={setOldColorData}
                    setFormData={setFormData}
                    setRadioBtnStatus={setRadioBtnStatus}
                    deleteBtnLoaderStatus={deleteBtnLoaderStatus}
                  />
                ))}
            </tbody>
          </Table>
        </MainCardContainer>
      </div>
    </MainSection>
  );
};

const ColorList = ({
  item,
  handleColorDelete,
  setFormData,
  setOldColorData,
  setRadioBtnStatus,
  deleteBtnLoaderStatus,
}) => {
  const { _id, colorName, colorValue, colorStatus } = item;

  const colorData = {
    _id,
    colorName,
    colorValue,
  };

  const handleColorEdit = () => {
    setFormData(colorData);
    setOldColorData(colorData);
    setRadioBtnStatus(colorStatus);
  };

  // status color for active and in active
  const statusBgColor = statusBgColorSelectort(colorStatus);

  return (
    <TableTr>
      <TableTd>
        <CheckBox name="category-box" />
      </TableTd>
      <TableTd>
        <TableTextSpan>{_id}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{colorName}</TableTextSpan>
      </TableTd>
      <TableTd>
        <TableTextSpan>{colorValue}</TableTextSpan>
      </TableTd>
      <TableTd>
        <div
          className="mx-auto size-3 rounded-full"
          style={{ background: colorValue }}
        ></div>
      </TableTd>
      <TableTd>
        <Statusbadge color={statusBgColor}>
          {colorStatus ? "Active" : "In Active"}
        </Statusbadge>
      </TableTd>
      <TableTd>
        <ActionBtnContainer>
          <ActionBtnEdit onClick={handleColorEdit} />
          <ActionBtnDelete
            deleteButtonLoader={deleteBtnLoaderStatus}
            onClick={() => handleColorDelete(_id)}
          />
        </ActionBtnContainer>
      </TableTd>
    </TableTr>
  );
};
