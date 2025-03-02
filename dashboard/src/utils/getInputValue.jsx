export const getInputValue = (event, setFormData) => {
  const { name, value } = event.target;

  // spread previous form data in object and set new values
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
