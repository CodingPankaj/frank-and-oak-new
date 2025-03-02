export const currencyFormatter = (price) => {
  const num = Number(price);

  if (isNaN(num)) return "N/A";

  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};
