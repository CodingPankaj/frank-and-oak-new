import Link from "next/link";

export const PrimaryButton = ({ href = "/", label = "Button", className }) => {
  return (
    <Link
      href={href}
      className={`bg-white p-[14px] text-center text-lg leading-[18px] text-black ${className}`}
    >
      {label}
    </Link>
  );
};
