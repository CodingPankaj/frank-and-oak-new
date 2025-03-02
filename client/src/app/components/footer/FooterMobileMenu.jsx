import { AccordionTwo } from "../accordion/AccordionTwo";
import { FooterMenuLinks } from "./FooterMenuLinks";
import {
  footerMenuAboutUs,
  footerMenuDiscover,
  footerMenuCustomerCare,
} from "@/data/footerMenu";

export const FooterMobileMenu = () => {
  return (
    <div className="mt-5 lg:hidden">
      <FooterMobileMenuItems title="About Us" data={footerMenuAboutUs} />
      <FooterMobileMenuItems title="Discover" data={footerMenuDiscover} />
      <FooterMobileMenuItems
        title="Customer Care"
        data={footerMenuCustomerCare}
        className="border-y"
      />
    </div>
  );
};

const FooterMobileMenuItems = ({
  title = "Title",
  data,
  className = "border-t",
}) => {
  return (
    <AccordionTwo
      title={title}
      className={`${className} border-white py-[22px]`}
    >
      <ul className="mt-7 flex flex-col gap-3">
        {data &&
          data.map((item, index) => (
            <FooterMenuLinks
              key={index}
              label={item.label}
              href={item.href}
              className="text-base"
            />
          ))}
      </ul>
    </AccordionTwo>
  );
};
