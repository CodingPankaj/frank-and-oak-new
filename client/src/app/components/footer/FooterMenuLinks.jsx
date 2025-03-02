import Link from "next/link";

export const FooterMenuLinks = ({
  href = "#",
  label = "Link",
  className = "text-sm",
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`${className} leading-[18px] tracking-[-0.03em] text-white`}
      >
        {label}
      </Link>
    </li>
  );
};
