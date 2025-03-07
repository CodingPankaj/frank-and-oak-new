import DOMPurify from "dompurify";

export const getInputValue = (event, setFormData) => {
  const { name, value } = event.target;

  // sanitizing value to avoid xxs attack
  const sanitizedValue = DOMPurify.sanitize(value);

  // setting form data
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: sanitizedValue,
  }));
};
