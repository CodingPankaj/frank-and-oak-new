import { useContext, useEffect, useState } from "react";
import { CheckBox } from "../components/CheckBox";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedin } = useContext(MainContext);

  const navigate = useNavigate();

  // authenticate with access token
  const authenticateUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/auth",

        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        setIsLoggedin(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      if (res.status === 200) {
        setIsLoggedin(true);
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-accent-color/60 px-3">
      <div className="flex max-w-[500px] grow flex-col items-center rounded bg-bg-primary-color px-5 py-12 font-medium md:px-12 md:py-20">
        <h3 className="text-2xl font-semibold text-text-primary-color">
          SIgn In
        </h3>
        <p className="mt-4 text-[15px] text-text-secondary-color">
          Welcome back !
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col gap-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="login-email"
              className="text-[15px] text-text-primary-color"
            >
              Username or Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="login-email"
              placeholder="Enter Email"
              className="mt-1 rounded border border-border-color bg-transparent p-2 px-3 text-left text-sm text-text-primary-color outline-none placeholder:text-text-secondary-color"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="login-password"
              className="text-[15px] text-text-primary-color"
            >
              Password
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              id="login-password"
              placeholder="Enter Password"
              className="mt-1 rounded border border-border-color bg-transparent p-2 px-3 text-left text-sm text-text-primary-color outline-none placeholder:text-text-secondary-color"
            />
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckBox id="login-remember" />
              <label htmlFor="login-remember" className="add-product-label">
                Remember Me
              </label>
            </div>
            <p className="add-product-label underline">Forgot your Password?</p>
          </div>

          <div className="my-6">
            <div className="mb-6 grid grid-cols-[1fr_auto_1fr] gap-2">
              <span className="my-auto h-[1px] w-full bg-text-primary-color"></span>
              <p className="text-sm text-text-primary-color">Or Sign In with</p>
              <span className="my-auto h-[1px] w-full bg-text-primary-color"></span>
            </div>
            <div className="flex justify-center gap-3">
              <button className="flex size-10 items-center justify-center rounded bg-[#4285F4] text-lg text-white">
                <span>
                  <FaGoogle />
                </span>
              </button>
              <button className="flex size-10 items-center justify-center rounded bg-[#1877F2] text-lg text-white">
                <span>
                  <FaFacebookF />
                </span>
              </button>
              <button className="flex size-10 items-center justify-center rounded bg-[#1DA1F2] text-lg text-white">
                <span>
                  <FaXTwitter />
                </span>
              </button>
              <button className="flex size-10 items-center justify-center rounded bg-black text-lg text-white">
                <span>
                  <FaApple />
                </span>
              </button>
            </div>
          </div>

          <div className="flex text-center">
            <button
              to={"/"}
              className="w-full rounded bg-accent-color px-4 py-2 font-medium text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
