export const CardTop = ({
  children,
  heading = "",
  className = "border-b",
  headingStyle = "text-lg",
}) => {
  return (
    <div
      className={`flex w-full flex-wrap items-center justify-between gap-4 border-border-color px-3 py-3 ${className}`}
    >
      <h4
        className={`font-medium capitalize text-text-primary-color ${headingStyle}`}
      >
        {heading}
      </h4>

      {children}
    </div>
  );
};
