import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { OtpVerification } from "./OtpVerification";

export const ModalSignupForm = ({
  setIsLogin,
  otpVerification,
  setOtpVerification,
}) => {
  return otpVerification ? (
    <OtpVerification />
  ) : (
    <div className="px-5 pt-8 md:px-12">
      <p className="mb-5 flex flex-wrap justify-center gap-1 border-b border-[#ebeced] pb-5 text-center text-sm">
        Already have an account?
        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className="flex cursor-pointer items-center gap-1 underline"
        >
          Log in <LiaLongArrowAltRightSolid />
        </button>
      </p>
      <form className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="First Name"
            name="signup-first-name"
            className="login-form-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="signup-last-name"
            className="login-form-input"
          />
        </div>
        <input
          type="text"
          placeholder="Email Address"
          name="signup-email-address"
          className="login-form-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="login-password"
          className="login-form-input"
        />
        <div className="flex items-center gap-3 text-[13px] text-black">
          I shop for
          <div className="radio-input-container">
            <input
              type="radio"
              name="signup-gender"
              id="signup-women"
              className="radio-input-black"
            />
            <label htmlFor="signup-women" className="radio-input-label-black">
              Women
            </label>
          </div>
          <div className="radio-input-container">
            <input
              type="radio"
              name="signup-gender"
              id="signup-men"
              className="radio-input-black"
            />
            <label htmlFor="signup-men" className="radio-input-label-black">
              Men
            </label>
          </div>
          <div className="radio-input-container">
            <input
              type="radio"
              name="signup-gender"
              id="signup-all"
              className="radio-input-black"
            />
            <label htmlFor="signup-all" className="radio-input-label-black">
              All
            </label>
          </div>
        </div>
        <div className="flex gap-5">
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className="text-sm">
            Yes, sign me up to the Frank And Oak newsletter to never miss out on
            product launches and exclusive promotions.
          </label>
        </div>
        <button
          onClick={() => setOtpVerification(!otpVerification)}
          className="mt-4 h-[50px] bg-black text-lg text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
