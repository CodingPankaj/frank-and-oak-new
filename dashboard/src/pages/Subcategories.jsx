import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { useEffect, useState } from "react";
import { fetchApiData } from "../services/fetchApiData";
import { AddSubcategoryForm } from "../components/category/AddSubcategoryForm";
import { SubcategoryTable } from "../components/category/SubcategoryTable";

export const Subcategories = () => {
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [allcategoryData, setAllCategoryData] = useState([]);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [inputData, setInputData] = useState({
    _id: "",
    subcategoryName: "",
    subcategoryDescription: "",
    parentCategory: "select-parent-category",
  });
  const [oldSubcategoryData, setOldSubcategoryData] = useState({});

  // get category
  const getSubcategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/subcategory/view`,
    );

    setSubcategoryData(res.data);
  };

  // get all parent category
  const getCategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/category/view`,
    );

    setAllCategoryData(res.data);
  };

  useEffect(() => {
    getSubcategory();
    getCategory();
  }, []);

  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Sub Categories">
          <div className="flex items-center justify-center gap-5">
            <SearchInput />
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AddSubcategoryForm
          subcategoryData={subcategoryData}
          allcategoryData={allcategoryData}
          inputData={inputData}
          setInputData={setInputData}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          oldSubcategoryData={oldSubcategoryData}
          setOldSubcategoryData={setOldSubcategoryData}
          getSubcategory={getSubcategory}
          radioBtnStatus={radioBtnStatus}
          setRadioBtnStatus={setRadioBtnStatus}
        />

        <SubcategoryTable
          subcategoryData={subcategoryData}
          inputData={inputData}
          setInputData={setInputData}
          setImageUrl={setImageUrl}
          oldSubcategoryData={oldSubcategoryData}
          setOldSubcategoryData={setOldSubcategoryData}
          getSubcategory={getSubcategory}
          radioBtnStatus={radioBtnStatus}
          setRadioBtnStatus={setRadioBtnStatus}
        />
      </div>
    </MainSection>
  );
};
