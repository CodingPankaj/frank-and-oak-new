import { useState } from "react";

export const Multiselect = () => {
  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Multi-Select Dropdown with Pills
      </h1>
      <MultiSelectDropdown options={options} />
    </div>
  );
};

export const MultiSelectDropdown = ({ options }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div>
      <div className="relative flex flex-col">
        {/* <input
          type="text"
          name="multiselect-drop"
          className="product-input w-full"
        /> */}
        <select
          name="multiselect"
          id="multiselect"
          onFocus={() => setIsFocus(!isFocus)}
          onBlur={() => setIsFocus(false)}
        ></select>
        <div
          className={`absolute left-0 top-full h-[400px] w-full bg-red-200 ${isFocus ? "visible opacity-100" : "hidden opacity-0"} transition-all duration-200`}
        ></div>
      </div>
    </div>
  );
};
