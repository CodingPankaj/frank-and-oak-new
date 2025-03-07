import { MainContainer } from "@/app/components/MainContainer";
import { ProductCard } from "@/app/components/product/ProductCard";

export default function Page() {
  return (
    <section>
      <MainContainer className="py-8 lg:py-12">
        <h3 className="mb-8 text-[22px] lg:mb-10 lg:text-[32px]">
          All Products
        </h3>
        <div className="grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </MainContainer>
    </section>
  );
}
