import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";

export const AddProductColor = ({ selectedColors, setSelectedColors }) => {
  const { colorData, getAllColors } = useContext(MainContext);

  useEffect(() => {
    if (colorData.length === 0) {
      getAllColors();
    }
  }, []);

  return (
    <div className="product-input-container">
      <div className="py-2">
        <h4 className="mb-1 text-sm font-medium text-text-primary-color">
          Color:
        </h4>
        <div className="flex gap-2">
          {colorData &&
            colorData.length > 0 &&
            colorData.map((color) => (
              <ColorButtons
                key={color._id}
                color={color}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const ColorButtons = ({ item, setSelectedColors, selectedColors, color }) => {
  // const { _id, colorValue } = item;

  // const isSizeSelected = selectedColors.includes(_id);

  // const handleClick = () => {
  //   setSelectedColors((prev) => {
  //     if (prev.includes(_id)) {
  //       return prev.filter((id) => id !== _id);
  //     } else {
  //       return [...prev, _id];
  //     }
  //   });
  // };

  ///
  const { _id, colorValue, colorName } = color;

  const isColorSelected = selectedColors.some((color) => color._id === _id);

  const handleClick = () => {
    setSelectedColors((prev) => {
      if (prev.some((color) => color._id === _id)) {
        return prev.filter((color) => color._id !== _id);
      } else {
        return [...prev, { _id, colorName, colorValue }];
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`size-5 rounded-full border-border-color-3 ${isColorSelected ? "border-[3px]" : ""}`}
      style={{ background: colorValue }}
    ></button>
  );
};
