import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { ProductSlider } from "./ProdcutSlider";

export const ProductPreview = () => {
  return (
    <MainCardContainer className="sticky top-[85px]">
      <CardTop heading="Preview" className="border-0" />

      <div className="p-4">
        <ProductSlider />

        <div className="py-2">
          <h3 className="text-xl font-semibold text-text-primary-color">
            The Satin Tank Top in Light Grey
          </h3>
          <h3 className="mt-3 text-base font-medium">
            <span className="line-through">₹8999.00</span>{" "}
            <span className="text-red-500">-37%</span>
          </h3>
          <h3 className="mt-1 text-xl font-semibold text-text-primary-color">
            ₹4599.00
          </h3>
        </div>
        <div className="py-2">
          <h4 className="mb-1 text-sm font-medium text-text-primary-color">
            Size:
          </h4>
          <div className="flex gap-2">
            <button className="flex size-8 items-center justify-center rounded border border-accent-color bg-accent-color text-sm font-medium text-white">
              S
            </button>
            <button className="flex size-8 items-center justify-center rounded border border-border-color text-sm font-medium">
              M
            </button>
            <button className="flex size-8 items-center justify-center rounded border border-border-color text-sm font-medium">
              L
            </button>
            <button className="flex size-8 items-center justify-center rounded border border-border-color text-sm font-medium">
              XL
            </button>
          </div>
        </div>
        <div className="py-2">
          <h4 className="mb-1 text-sm font-medium text-text-primary-color">
            Color:
          </h4>
          <div className="flex gap-2">
            <span className="size-5 rounded-full border-2 border-border-color-3 bg-gray-500"></span>
            <span className="size-5 rounded-full border-border-color-3 bg-red-500"></span>
            <span className="size-5 rounded-full border-border-color-3 bg-green-400"></span>
            <span className="size-5 rounded-full border-border-color-3 bg-blue-300"></span>
          </div>
        </div>
        <div className="py-2">
          <button className="mt-1 w-full rounded bg-accent-color px-4 py-2 font-medium text-white">
            Add to Cart
          </button>
        </div>
        <div className="py-2">
          <p className="text-[13px] text-text-primary-color">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit
            quaerat eaque nisi modi libero voluptates molestiae unde, molestias
            inventore dolore architecto, repudiandae tempore vitae enim ipsam
            animi, minus deleniti.
          </p>
        </div>
      </div>
    </MainCardContainer>
  );
};
