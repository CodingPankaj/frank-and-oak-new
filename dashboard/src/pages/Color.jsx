import { CardTop } from "../components/CardTop";
import { LinkBtnOne } from "../components/LinkBtnOne";
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
import { ActionButtons } from "../components/ActionsButtons";
import { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { SubmitBtn } from "../components/SubmitBtn";
import axios from "axios";
import { toastError, toastSuccess } from "../utils/tostifytoast";
import { fetchApiData } from "../services/fetchApiData";

export const Color = () => {
  // store all color
  const [allColors, setAllColors] = useState([]);

  // form data
  const [formData, setFormData] = useState({
    colorName: "",
    colorValue: "",
  });

  // empty data for form to empty input field
  const emptyData = {
    colorName: "",
    colorValue: "",
  };

  // input filed error for showing error message
  const [inputFieldNameError, setInputFieldNameError] = useState(false);
  const [inputFieldValueError, setInputFieldValueError] = useState(false);

  // submit button loading and disable submit button
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);

  // get all colors
  const getAllColors = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/color/view`,
    );
    setAllColors(res.data);
    console.log(res);
  };

  useEffect(() => {
    getAllColors();
  }, []);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { colorName, colorValue } = formData;
    try {
      if (!colorName) {
        setInputFieldNameError(true);
        return toastError("Color Name Cannot Be Empty");
      }

      if (!colorValue) {
        setInputFieldValueError(true);
        return toastError("Color Value Cannot Be Empty");
      }

      setSubmitBtnLoader(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/color/add`,
        formData,
        { withCredentials: true },
      );

      console.log(res);
      toastSuccess("New Color Added");
      getAllColors();
      setSubmitBtnLoader(false);
      setInputFieldValueError(false);
      setInputFieldNameError(false);
      setFormData(emptyData);
    } catch (error) {
      toastError("Failed to add color");
      setSubmitBtnLoader(false);
      console.log(error);
    }
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

              {/* Submit Button */}
              <div className="mb-4 mt-4 flex items-center justify-center gap-4">
                <SubmitBtn label="Add Size" submitBtnLoader={submitBtnLoader} />
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
              <TableTh>Color Visual</TableTh>
              <TableTh>Action</TableTh>
            </TableHead>
            <tbody>
              {allColors &&
                allColors.length > 0 &&
                allColors.map((item, index) => (
                  <SizeList key={index} item={item} />
                ))}
            </tbody>
          </Table>
        </MainCardContainer>
      </div>
    </MainSection>
  );
};

const SizeList = ({ item: { _id, colorName, colorValue } }) => {
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
        <ActionButtons />
      </TableTd>
    </TableTr>
  );
};
