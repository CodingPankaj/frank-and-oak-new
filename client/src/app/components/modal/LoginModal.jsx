"use client";
import { ModalLoginForm } from "./ModalLoginForm";
import { SocialLogin } from "./SocialLogin";
import { CreateAccountButton } from "./CreateAccountButton";
import { LoginModalTop } from "./LoginModalTop";
import { useState } from "react";
import { ModalSignupForm } from "./ModalSignupForm";

export const LoginModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [otpVerification, setOtpVerification] = useState(false);
  return (
    <div className="fixed top-2/4 left-2/4 w-full max-w-[640px] -translate-x-2/4 -translate-y-2/4 bg-white pb-[72px]">
      <button className="absolute top-0 right-0 flex size-[50px] cursor-pointer items-center justify-center text-lg">
        <img src="/images/cross.svg" alt="" className="w-[18px]" />
      </button>
      <LoginModalTop isLogin={isLogin} />

      {isLogin ? (
        <ModalLoginForm />
      ) : (
        <ModalSignupForm
          setIsLogin={setIsLogin}
          otpVerification={otpVerification}
          setOtpVerification={setOtpVerification}
        />
      )}

      {!otpVerification && <SocialLogin />}

      <CreateAccountButton setIsLogin={setIsLogin} isLogin={isLogin} />
    </div>
  );
};
