"use client";
import { useEffect, useRef, useState } from "react";

export const OtpVerification = () => {
  const otpLength = 5;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    // fill last
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next field if current field is filled
    if (value && index < otpLength - 1 && inputRefs.current[index]) {
      inputRefs.current[index + 1].focus();
    }

    // console.log(value[0]);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    console.log(otp.join(""));
  };

  useEffect(() => {
    console.log(otp);
  }, [otp]);
  return (
    <div className="flex flex-col items-center justify-center px-5 py-8">
      <p className="mb-6 text-sm">
        Enter the {otpLength}-digit OTP sent to your registered email.
      </p>
      <div className="flex flex-nowrap justify-between gap-3 md:justify-center">
        {otp.map((value, index) => (
          <input
            type="text"
            key={index}
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onClick={(e) => handleClick(index)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="size-10 border text-center"
          />
        ))}
      </div>
      <button
        onClick={handleOtpSubmit}
        className="mt-4 w-full bg-black px-8 py-2 text-center text-base text-white md:w-fit"
      >
        Verify Otp
      </button>
    </div>
  );
};
