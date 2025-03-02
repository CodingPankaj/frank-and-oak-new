import { Link } from "react-router-dom";

export const LinkBtnOne = ({ to, children }) => {
  return (
    <Link to={to} className="primary-btn">
      {children}
    </Link>
  );
};
