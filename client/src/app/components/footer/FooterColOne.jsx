import { FooterSocialLinks } from "./FooterSocialLinks";

export const FooterColOne = () => {
  return (
    <div className="hidden flex-[1_1_280px] flex-col gap-5 py-5 lg:flex">
      <div>
        <img src="/images/frank-oak-white.svg" />
      </div>
      <FooterSocialLinks />
      <div>
        <img src="/images/certified.svg" alt="" className="w-10" />
      </div>
    </div>
  );
};
