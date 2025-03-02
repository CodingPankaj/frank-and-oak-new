export const Statusbadge = ({ color, children }) => {
  return (
    <div
      className="w-fit rounded px-2 py-1 text-center text-xs"
      style={{
        backgroundColor: `rgba(${color},0.10)`,
        color: `rgb(${color})`,
      }}
    >
      {children}
    </div>
  );
};
