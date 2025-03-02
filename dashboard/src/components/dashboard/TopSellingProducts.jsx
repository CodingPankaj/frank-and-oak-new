import topSellingProducts from "../../api/topSellingProducts.json";
import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";

export const TopSellingProducts = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Top Selling Products" />
      <div className="w-full">
        <ul className="flex flex-col gap-3 p-3">
          {topSellingProducts.map((item, index) => (
            <TopSellingProductList key={index} item={item} />
          ))}
        </ul>
      </div>
    </MainCardContainer>
  );
};

const TopSellingProductList = ({
  item: { productName, image, price, totalSales, category },
}) => {
  return (
    <li className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <figure className="size-10">
          <img src={image} className="w-full rounded object-cover" />
        </figure>
        <div>
          <h5 className="text-sm font-semibold text-text-primary-color">
            {productName}
          </h5>
          <span className="text-xs font-medium text-text-secondary-color">
            {category}
          </span>
        </div>
      </div>
      <div>
        <h5 className="text-right text-sm font-semibold text-text-primary-color">
          {price * 84.67}
        </h5>
        <span className="text-right text-xs font-medium text-text-secondary-color">
          {totalSales} Sales
        </span>
      </div>
    </li>
  );
};
