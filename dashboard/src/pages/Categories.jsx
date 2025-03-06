import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { CategoryTable } from "../components/category/CategoryTable";
import { useContext, useEffect, useState } from "react";
import { AddCategoryForm } from "../components/category/AddCategoryForm";
import { fetchApiData } from "../services/fetchApiData";
import { MainContext } from "../context/MainContext";

export const Categories = () => {
  const { categoryData, setCategoryData } = useContext(MainContext);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [inputData, setInputData] = useState({
    _id: "",
    categoryName: "",
    categoryDescription: "",
    categoryType: "parent-category",
  });
  const [oldCategoryData, setOldCategoryData] = useState({});

  // get category
  const getCategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}admin/category/view`,
    );

    setCategoryData(res.data);
  };

  useEffect(() => {
    if (categoryData.length === 0) {
      getCategory();
    }
  }, []);

  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Categories">
          <div className="flex items-center justify-center gap-5">
            <SearchInput />
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AddCategoryForm
          getCategory={getCategory}
          categoryData={categoryData}
          inputData={inputData}
          setInputData={setInputData}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          oldCategoryData={oldCategoryData}
          setOldCategoryData={setOldCategoryData}
          radioBtnStatus={radioBtnStatus}
          setRadioBtnStatus={setRadioBtnStatus}
        />
        <CategoryTable
          data={categoryData}
          inputData={inputData}
          setInputData={setInputData}
          setImageUrl={setImageUrl}
          oldCategoryData={oldCategoryData}
          setOldCategoryData={setOldCategoryData}
          getCategory={getCategory}
          radioBtnStatus={radioBtnStatus}
          setRadioBtnStatus={setRadioBtnStatus}
        />
      </div>
    </MainSection>
  );
};
