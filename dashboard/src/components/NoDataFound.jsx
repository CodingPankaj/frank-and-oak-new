export const NoDataFound = ({ message = "No Data Found" }) => {
  return (
    <div className="py-20 text-center capitalize">
      <h3 className="text-center text-sm">{message}</h3>
    </div>
  );
};
