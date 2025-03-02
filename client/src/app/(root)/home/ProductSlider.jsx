import { MainContainer } from "@/app/components/MainContainer";
import { ProductCard } from "@/app/components/product/ProductCard";

export const ProductSlider = () => {
  return (
    <section>
      <MainContainer className="py-10 lg:py-16">
        <h3 className="mb-8 text-[22px] lg:mb-16 lg:text-[32px]">
          Featured Categories
        </h3>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </MainContainer>
    </section>
  );
};
