export const MainSection = ({ children, className = "" }) => {
  return (
    <section className={`flex flex-col gap-5 px-3 py-6 md:px-5 ${className}`}>
      {children}
    </section>
  );
};
