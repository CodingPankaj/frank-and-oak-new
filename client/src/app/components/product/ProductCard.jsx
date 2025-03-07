import { ProductCardContent } from "./ProductCardContent";
import { ProductCardColor } from "./ProductCardColor";
import { ProductCardImageSlider } from "./ProductCardImageSlider";

export const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <ProductCardImageSlider product={product} />
      <ProductCardContent product={product} />
      <ProductCardColor product={product} />
    </div>
  );
};
