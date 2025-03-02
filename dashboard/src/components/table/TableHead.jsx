export const TableHead = ({ children }) => {
  return (
    <thead>
      <tr className="text-left text-sm font-semibold text-text-primary-color">
        {children}
      </tr>
    </thead>
  );
};
