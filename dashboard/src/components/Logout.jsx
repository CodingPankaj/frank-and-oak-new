import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export const Logout = () => {
  const [logoutStatus, setLogoutStatus] = useState(true);

  const navigate = useNavigate();

  setTimeout(() => {
    setLogoutStatus(false);
  }, 10000);

  const logoutUser = async () => {
    const logout = await axios.get(
      "http://localhost:8080/api/v1/admin/logout",
      {
        withCredentials: true,
      },
    );
    if (logout.status === 200) {
      setLogoutStatus(false);
      //   navigate("/login");
    }
  };

  useEffect(() => {
    logoutUser();
  });
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-accent-color/60 px-3">
      <div className="flex min-h-[300px] max-w-[500px] grow flex-col items-center justify-center rounded bg-bg-primary-color px-5 py-12 font-medium md:px-12 md:py-20">
        {logoutStatus ? (
          <div className="flex flex-col items-center">
            <Loader
              className="size-8 md:size-10"
              loaderStyle={"fill-accent-color"}
            />
            <p className="mt-4 text-center text-[15px] text-text-secondary-color md:text-lg">
              Loggin out
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-center text-2xl font-semibold text-text-primary-color">
              User Logged out
            </h3>
            <p className="mt-4 text-center text-[15px] text-text-secondary-color">
              Sign in to Continue
            </p>
            <Link to="/login" className="primary-btn mt-5">
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
};
