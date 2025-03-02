import { useEffect, useState } from "react";

export const InputField = ({
  label = "Field Name",
  setInputFieldError = false,
  errorMessage = "",
  ...props
}) => {
  const [emptyFieldError, setEmptyFieldError] = useState(setInputFieldError);
  const [dynamicErrorMessage, setDynamicErrorMessage] = useState("");

  // sync field error
  useEffect(() => {
    setEmptyFieldError(setInputFieldError);
  }, [setInputFieldError]);

  // track message and if its empty then it wil show default message
  useEffect(() => {
    setDynamicErrorMessage(errorMessage || `${label} cannot be empty`);
  }, [errorMessage]);

  return (
    <div className="product-input-container">
      <span className="add-product-label">{label}</span>
      <input
        {...props}
        className="product-input"
        style={{ borderColor: emptyFieldError ? "#ef4444" : "" }}
      />
      {emptyFieldError && (
        <p className="text-[11px] text-red-500">{dynamicErrorMessage}</p>
      )}
    </div>
  );
};
