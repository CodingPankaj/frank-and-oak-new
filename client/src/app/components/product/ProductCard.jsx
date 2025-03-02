import Image from "next/image";
import { ProductCardContent } from "./ProductCardContent";
import { ProductCardColor } from "./ProductCardColor";
import { ProductCardImageSlider } from "./ProductCardImageSlider";

export const ProductCard = () => {
  return (
    <div className="group">
      <ProductCardImageSlider />
      <ProductCardContent />
      <ProductCardColor />
    </div>
  );
};
