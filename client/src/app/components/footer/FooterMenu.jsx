import { FooterMenuLinks } from "./FooterMenuLinks";

export const FooterMenu = ({ title, data, className }) => {
  return (
    <div className={`hidden flex-[1_1_280px] py-5 lg:block ${className}`}>
      <h4 className="mb-[22px] text-xl leading-none tracking-[-0.03em] text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {data &&
          data.map((item, index) => (
            <FooterMenuLinks key={index} label={item.label} href={item.href} />
          ))}
      </ul>
    </div>
  );
};
