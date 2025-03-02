export const SelectBoxOptions = ({ label, value, className = "" }) => {
  return (
    <option value={value} className={`option ${className}`}>
      {label}
    </option>
  );
};
