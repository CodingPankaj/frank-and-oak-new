import { Banner } from "./home/Banner";
import { FeaturedCategoy } from "./home/FeaturedCategory";
import { ProductSlider } from "./home/ProductSlider";

export default function Home() {
  return (
    <>
      <section>
        <div>
          <Banner />
          <FeaturedCategoy />
          <ProductSlider />
        </div>
      </section>
    </>
  );
}
