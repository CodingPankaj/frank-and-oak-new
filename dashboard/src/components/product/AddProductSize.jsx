import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";

export const AddProductSize = ({
  setFormData,
  selectedSizes,
  setSelectedSizes,
}) => {
  const { sizeData, getAllSizes } = useContext(MainContext);

  useEffect(() => {
    if (sizeData.length === 0) {
      getAllSizes();
    }
  }, []);

  return (
    <div className="product-input-container">
      <div className="py-2">
        <h4 className="mb-1 text-sm font-medium text-text-primary-color">
          Size:
        </h4>
        <div className="flex gap-2">
          {sizeData &&
            sizeData.length > 0 &&
            sizeData.map((item) => (
              <SizeButtons
                key={item._id}
                item={item}
                setSelectedSizes={setSelectedSizes}
                selectedSizes={selectedSizes}
                setFormData={setFormData}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const SizeButtons = ({ item, setSelectedSizes, selectedSizes }) => {
  const { _id, sizeName } = item;

  const isSizeSelected = selectedSizes.includes(_id);

  const handleClick = () => {
    setSelectedSizes((prev) => {
      if (prev.includes(_id)) {
        return prev.filter((id) => id !== _id);
      } else {
        return [...prev, _id];
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded border px-2 text-sm font-medium ${isSizeSelected ? "border-accent-color bg-accent-color text-white" : "border-border-color text-text-secondary-color"}`}
    >
      {sizeName}
    </button>
  );
};
