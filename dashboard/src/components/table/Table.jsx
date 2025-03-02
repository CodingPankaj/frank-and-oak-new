export const Table = ({ children }) => {
  return (
    <div className="scrollbar grid w-full grid-cols-1 overflow-x-auto whitespace-nowrap bg-bg-primary-color">
      <table className="min-w-full table-fixed">{children}</table>
    </div>
  );
};
