export const TableTr = ({ className = "border-t", children }) => {
  return <tr className={`${className} border-border-color`}>{children}</tr>;
};
