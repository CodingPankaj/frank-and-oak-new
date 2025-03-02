export const FooterValueCard = ({ src, alt, title, text }) => {
  return (
    <div className="flex w-2/4 grow flex-col py-4 text-white md:w-2/12 lg:py-16">
      <img src={src} alt={alt} className="mx-auto mb-5 h-8 lg:mb-6" />
      <p className="mb-3 text-center text-base lg:text-xl">{title}</p>
      <p className="text-center text-xs lg:text-sm">{text}</p>
    </div>
  );
};
