import { FooterColOne } from "./FooterColOne";
import { FooterMenu } from "./FooterMenu";
import { FooterMobileLastCol } from "./FooterMobileLastCol";
import { FooterMobileMenu } from "./FooterMobileMenu";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterValueCard } from "./FooterValueCard";
import {
  footerMenuAboutUs,
  footerMenuDiscover,
  footerMenuCustomerCare,
} from "@/data/footerMenu";

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="flex flex-wrap justify-between px-4 md:px-8">
        <FooterValueCard
          src="/images/truck.png"
          alt="Free shipping"
          title="Free Shipping"
          text="On orders over $99."
        />
        <FooterValueCard
          src="/images/returns.png"
          alt="Free Return"
          title="Free Returns"
          text="On all orders."
        />
        <FooterValueCard
          src="/images/franks-club-icon.png"
          alt="Frank's Club"
          title="Frank's Club"
          text="Earn points and get rewards."
        />
        <FooterValueCard
          src="/images/sezzle.png"
          alt="Buy Now, Pay Later"
          title="Buy Now, Pay Later"
          text="Select Klarna at checkout."
        />
      </div>
      <div className="px-8 pb-[32px] pt-[14px] lg:px-[72px] lg:pb-[72px] lg:pt-[52px]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <FooterColOne />
          <FooterMenu title="About Us" data={footerMenuAboutUs} />
          <FooterMenu title="Discover" data={footerMenuDiscover} />
          <FooterMenu title="Customer Care" data={footerMenuCustomerCare} />
          <FooterNewsletter />
          <FooterMobileMenu />
          <FooterMobileLastCol />
        </div>
        <div className="mt-[64px] lg:mt-[84px]">
          <p className="mb-4 text-center text-[10.5px] tracking-[0.04em] text-white lg:mb-0 lg:text-left lg:text-xs">
            © Frank And Oak 2025 , All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
