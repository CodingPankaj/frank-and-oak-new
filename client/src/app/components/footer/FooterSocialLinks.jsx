import Link from "next/link";

export const FooterSocialLinks = ({ className }) => {
  return (
    <div className="flex gap-2">
      <FooterSocialLinksItems
        src="/images/insta-white.svg"
        className={className}
      />
      <FooterSocialLinksItems
        src="/images/facebook-white.svg"
        className={className}
      />
      <FooterSocialLinksItems
        src="/images/twitter-white.svg"
        className={className}
      />
      <FooterSocialLinksItems
        src="/images/pinterest-white.svg"
        className={className}
      />
      <FooterSocialLinksItems
        src="/images/mail-white.svg"
        className={className}
      />
    </div>
  );
};

const FooterSocialLinksItems = ({
  href = "#",
  src,
  alt,
  className = "w-6",
}) => {
  return (
    <Link href={href}>
      <img src={src} alt={alt} className={className} />
    </Link>
  );
};
