export const MainCardContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`flex items-start justify-between gap-1 rounded bg-bg-primary-color shadow-md ${className}`}
    >
      <div className="flex w-full flex-col gap-1 text-text-secondary-color">
        {children}
      </div>
    </div>
  );
};
