export const TableTextSpan = ({ className = "font-medium ", children }) => {
  return (
    <span className={`text-right text-xs text-text-primary-color ${className}`}>
      {children}
    </span>
  );
};
