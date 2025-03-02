import { MainSection } from "../components/MainSection";
import { MainCardContainer } from "../components/MainCardCointainer";
import { CardTop } from "../components/CardTop";
import { LinkBtnOne } from "../components/LinkBtnOne";
import { LinkBtnTwo } from "../components/LinkBtnTwo";
import { AddProductPics } from "../components/product/AddProductPics";
import { AddProductBasicInfo } from "../components/product/AddProductBasicInfo";
import { AddProductPricing } from "../components/product/AddProductPricing";
import { AddProductSpecification } from "../components/product/AddProductSpecification";
import { ProductPreview } from "../components/product/ProductPreview";

export const AddProducts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Add Product" className="border-0">
          <div className="flex items-center justify-center gap-4">
            <LinkBtnTwo>Save Draft</LinkBtnTwo>
            <LinkBtnOne>Publish</LinkBtnOne>
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <AddProductBasicInfo />
          <AddProductPics />
          <AddProductPricing />
          <AddProductSpecification />
        </form>
        <div className="lg:w-[350px]">
          <ProductPreview />
        </div>
      </div>
    </MainSection>
  );
};
