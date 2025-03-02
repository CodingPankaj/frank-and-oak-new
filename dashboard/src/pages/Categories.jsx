import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { CategoryTable } from "../components/category/CategoryTable";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddCategoryForm } from "../components/category/AddCategoryForm";
import { fetchApiData } from "../services/fetchApiData";

export const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryApiUrl, setCategoryApIUrl] = useState("admin/category/view");
  const [imageUrl, setImageUrl] = useState("");
  const [inputData, setInputData] = useState({
    _id: "",
    categoryName: "",
    categoryDescription: "",
    categoryType: "parent-category",
  });
  const [oldCategoryData, setOldCategoryData] = useState({});

  // changes api url as per page locations
  const categoryPageLocation = useLocation()
    .pathname.split("/")
    .pop()
    .toLowerCase();

  // useEffect(() => {
  //   if (categoryPageLocation === "parent-category") {
  //     setCategoryApIUrl("admin/category/view");
  //     getCategory();
  //   } else if (categoryPageLocation === "sub-category") {
  //     setCategoryApIUrl("admin/subcategory/view");
  //     getCategory();
  //   } else {
  //     // setCategoryData(productAllCategory);
  //   }
  // }, [categoryPageLocation]);

  // get category
  const getCategory = async () => {
    const res = await fetchApiData(
      `${import.meta.env.VITE_API_BASE_URL}${categoryApiUrl}`,
    );

    setCategoryData(res.data);
  };

  useEffect(() => {
    getCategory();
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
        />
        <CategoryTable
          data={categoryData}
          inputData={inputData}
          setInputData={setInputData}
          setImageUrl={setImageUrl}
          oldCategoryData={oldCategoryData}
          setOldCategoryData={setOldCategoryData}
          getCategory={getCategory}
        />
      </div>
    </MainSection>
  );
};
