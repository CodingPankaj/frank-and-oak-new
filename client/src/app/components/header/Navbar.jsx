import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="hidden h-full lg:block">
      <ul className="flex h-full">
        <NavLinks label="Women" path="/" />
        <NavLinks label="Men" path="/" />
        <NavLinks label="Sale" path="/" className="text-cirmson" />
        <NavLinks label="About us" path="/" />
      </ul>
    </nav>
  );
};

const NavLinks = ({ label = "nav", path = "/", className = "" }) => {
  return (
    <li className="relative h-full">
      <Link
        href={path}
        className={`flex h-full items-center px-6 text-base ${className}`}
      >
        <span>{label}</span>
      </Link>
    </li>
  );
};
