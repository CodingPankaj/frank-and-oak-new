import { CardTop } from "../components/CardTop";
import { MainCardContainer } from "../components/MainCardCointainer";
import { MainSection } from "../components/MainSection";
import { SearchInput } from "../components/SearchInput";
import { HiPlus } from "react-icons/hi";
import { ProductTable } from "../components/product/ProductTable";
import { LinkBtnOne } from "../components/LinkBtnOne";
import productsData from "../api/productsData.json";

export const Products = () => {
  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="All Products">
          <div className="flex items-center justify-center gap-5">
            <SearchInput />
            <LinkBtnOne>
              <HiPlus />
              Add Product
            </LinkBtnOne>
          </div>
        </CardTop>
        <ProductTable data={productsData} />
      </MainCardContainer>
    </MainSection>
  );
};
