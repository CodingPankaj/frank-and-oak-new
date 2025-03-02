export const MainContainer = ({ children, className = "" }) => {
  return <div className={`px-[10px] lg:px-8 ${className}`}>{children}</div>;
};
