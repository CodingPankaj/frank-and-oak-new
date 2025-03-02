import { FooterSocialLinks } from "./FooterSocialLinks";

export const FooterMobileLastCol = () => {
  return (
    <div className="mt-10 lg:hidden">
      <h4 className="mb-[22px] text-lg leading-none tracking-[0.03em] text-white">
        Stay Connected
      </h4>
      <FooterSocialLinks className="w-7" />
      <div className="mt-10 flex items-center gap-5">
        <img src="/images/certified.svg" alt="Certified" className="w-10" />
        <p className="text-[10px] leading-[1.3] tracking-[0.03em] text-white">
          This means we meet the highest standards of social and environmental
          performance, public transparency, and legal accountability in the
          industry.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <img
          src="/images/frank-oak-white.svg"
          alt="Logo"
          className="h-[70px]"
        />
      </div>
    </div>
  );
};
