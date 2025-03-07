import parse from "html-react-parser";
import { useState } from "react";
import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { ProductSlider } from "./ProdcutSlider";
import { currencyFormatter } from "../../utils/currencyFormater";

export const ProductPreview = ({
  productImages,
  formData,
  selectedSizes,
  selectedColors,
  productDescription,
}) => {
  const { productName, productPrice, productSalePrice } = formData;
  const [selectedSizeBtn, setSelectedSizeBtn] = useState(null);
  const [selectedColorBtn, setSelectedColorBtn] = useState(null);

  // formating price to show as number
  const formattedProductPrice = currencyFormatter(productPrice);
  const formattedProductSalePrice = currencyFormatter(productSalePrice);

  // discount percentage
  const discount = ((productSalePrice / productPrice) * 100).toFixed(2);

  return (
    <MainCardContainer className="sticky top-[85px]">
      <CardTop heading="Preview" className="border-0" />

      <div className="p-4">
        <ProductSlider productImages={productImages} />

        <div className="py-2">
          <h3 className="text-xl font-semibold text-text-primary-color">
            {productName ? productName : "Product Title"}
          </h3>

          {/* Product Price */}
          {productSalePrice ? (
            <>
              <h3 className="mt-3 text-base font-medium">
                <span className="line-through">{formattedProductPrice}</span>
                <span className="text-red-500">-{discount}%</span>
              </h3>
              <h3 className="mt-1 text-xl font-semibold text-text-primary-color">
                {formattedProductSalePrice}
              </h3>
            </>
          ) : (
            <h3 className="mt-1 text-xl font-semibold text-text-primary-color">
              {productPrice ? formattedProductPrice : "₹8,999.00"}
            </h3>
          )}
        </div>
        <div className="py-2">
          <h4 className="mb-1 text-sm font-medium text-text-primary-color">
            Size:
          </h4>
          <div className="flex gap-2">
            {selectedSizes.length > 0 ? (
              selectedSizes.map((size, index) => (
                <SizeButton
                  key={index}
                  index={index}
                  size={size}
                  setSelectedSizeBtn={setSelectedSizeBtn}
                  selectedSizeBtn={selectedSizeBtn}
                />
              ))
            ) : (
              <button className="flex h-8 min-w-8 items-center justify-center rounded border border-border-color px-2 text-sm font-medium">
                Add Size
              </button>
            )}
          </div>
        </div>
        <div className="py-2">
          <h4 className="mb-1 text-sm font-medium text-text-primary-color">
            Color:
          </h4>
          <div className="flex gap-2">
            {selectedColors && selectedColors.length > 0 ? (
              selectedColors.map((color, index) => (
                <ColorButton
                  key={index}
                  color={color}
                  index={index}
                  selectedColorBtn={selectedColorBtn}
                  setSelectedColorBtn={setSelectedColorBtn}
                />
              ))
            ) : (
              <span className="size-5 rounded-full border-border-color-3 bg-blue-300"></span>
            )}
          </div>
        </div>
        <div className="py-2">
          <button className="mt-1 w-full rounded bg-accent-color px-4 py-2 font-medium text-white">
            Add to Cart
          </button>
        </div>
        <div className="py-2">
          <div className="text-[13px] text-text-primary-color">
            {productDescription
              ? parse(productDescription)
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit quaerat eaque nisi modi libero voluptates molestiae unde, molestias inventore dolore architecto, repudiandae tempore vitae enim ipsamanimi, minus deleniti."}
          </div>
        </div>
      </div>
    </MainCardContainer>
  );
};

const SizeButton = ({ selectedSizeBtn, setSelectedSizeBtn, index, size }) => {
  const handleClick = (index) => {
    setSelectedSizeBtn(selectedSizeBtn === index ? null : index);
  };

  return (
    <button
      onClick={() => handleClick(index)}
      className={`flex h-8 min-w-8 items-center justify-center rounded border px-2 text-sm font-medium ${selectedSizeBtn === index ? "border-accent-color bg-accent-color text-white" : "border-border-color"}`}
    >
      {size.sizeName}
    </button>
  );
};

const ColorButton = ({
  color,
  index,
  selectedColorBtn,
  setSelectedColorBtn,
}) => {
  const { _id, colorValue, colorName } = color;

  const handleClick = (index) => {
    setSelectedColorBtn(selectedColorBtn === index ? null : index);
  };

  return (
    <button
      onClick={() => handleClick(index)}
      className={`size-5 rounded-full border-border-color-3 ${selectedColorBtn === index ? "border-[3px]" : ""}`}
      style={{ background: colorValue }}
    ></button>
  );
};
