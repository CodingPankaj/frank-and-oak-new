import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { CategoryTable } from "../components/category/CategoryTable";
import { useLocation } from "react-router-dom";
import productAllCategory from "../api/productAllCategory.json";
import { useEffect, useState } from "react";
import { AddCategoryForm } from "../components/category/AddCategoryForm";

import axios from "axios";

export const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const categoryPageLocation = useLocation()
    .pathname.split("/")
    .pop()
    .toLowerCase();

  useEffect(() => {
    if (categoryPageLocation === "parent-category") {
      setCategoryData(
        productAllCategory.filter(
          (item) => item.type.toLowerCase() === "parent category",
        ),
      );
    } else if (categoryPageLocation === "sub-category") {
      setCategoryData(
        productAllCategory.filter(
          (item) => item.type.toLowerCase() === "sub category",
        ),
      );
    } else {
      setCategoryData(productAllCategory);
    }
  }, [categoryPageLocation]);

  const getCategory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}admin/category/view`,
        { withCredentials: true },
      );
      setCategoryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
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
        />
        <CategoryTable data={categoryData} />
      </div>
    </MainSection>
  );
};
