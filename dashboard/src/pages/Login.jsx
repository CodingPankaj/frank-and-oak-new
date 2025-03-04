import { useContext, useEffect, useState } from "react";
import { CheckBox } from "../components/CheckBox";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError } from "../utils/tostifytoast";
import { SubmitBtn } from "../components/SubmitBtn";
import { ToastContainer } from "react-toastify";

export const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitBtnLoader, setSubmitButtonLoader] = useState(false);
  const [emptyUsernameError, setEmptyUsernameError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
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
      console.log(error?.response?.data?.message || "Unauthorized access");
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameOrEmail || usernameOrEmail.trim() === "") {
      return toastError("Enter username or email");
    }

    if (!password || password.trim() === "") {
      return toastError("Enter Password");
    }

    const newFormData = {};

    const isEnteredInputEmail = usernameOrEmail.includes("@");

    if (isEnteredInputEmail) {
      newFormData.email = usernameOrEmail;
    }

    if (!isEnteredInputEmail) {
      newFormData.username = usernameOrEmail;
    }

    newFormData.password = password;

    // return;

    setSubmitButtonLoader(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/login",
        newFormData,
        { withCredentials: true },
      );
      if (res.status === 200) {
        setIsLoggedin(true);
        navigate("/");
        setSubmitButtonLoader(false);
        setEmptyUsernameError(false);
        setEmptyPasswordError(false);
      }
    } catch (error) {
      setSubmitButtonLoader(false);
      setEmptyUsernameError(false);
      setEmptyPasswordError(false);
      toastError(error?.response?.data?.message || "Failed to login");
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-accent-color/60 px-3">
      <div className="flex max-w-[500px] grow flex-col items-center rounded bg-bg-primary-color px-5 py-12 font-medium md:px-12 md:py-20">
        <h3 className="text-2xl font-semibold text-text-primary-color">
          Sign In
        </h3>
        <p className="mt-4 text-[15px] text-text-secondary-color">
          Welcome back !
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col gap-4"
        >
          {/* username email */}
          <div className="flex flex-col">
            <label
              htmlFor="login-email"
              className="text-[15px] text-text-primary-color"
            >
              Username or Email
            </label>
            <input
              type="text"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              id="login-email"
              placeholder="Username or email"
              className="mt-1 rounded border border-border-color bg-transparent p-2 px-3 text-left text-sm text-text-primary-color outline-none placeholder:text-text-secondary-color"
              style={{ borderColor: emptyUsernameError ? "#ef4444" : "" }}
            />
            {emptyUsernameError && (
              <p className="text-[11px] text-red-500">
                Username or Email is required
              </p>
            )}
          </div>

          {/* password */}
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
              style={{ borderColor: emptyPasswordError ? "#ef4444" : "" }}
            />
            {emptyPasswordError && (
              <p className="text-[11px] text-red-500">Password is required</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckBox id="login-remember" />
              <label htmlFor="login-remember" className="add-product-label">
                Remember Me
              </label>
            </div>
            <p className="add-product-label underline">Forgot your Password?</p>
          </div>

          {/* Social Login */}
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

          {/* Submit button */}
          <div className="flex text-center">
            <SubmitBtn
              label="Log in"
              submitBtnLoader={submitBtnLoader}
              className="min-h-[35px] grow justify-center text-center"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};
