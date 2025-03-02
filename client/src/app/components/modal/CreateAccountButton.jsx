import Link from "next/link";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export const CreateAccountButton = ({ isLogin, setIsLogin }) => {
  return (
    <div className="px-5 md:px-12">
      {isLogin ? (
        <>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-6 pb-5 md:pt-8">
            <span className="h-[1px] w-full bg-[#ebeced]"></span>
            <p className="text-center text-sm">Create an account</p>
            <span className="h-[1px] w-full bg-[#ebeced]"></span>
          </div>
          <p className="flex flex-wrap justify-center gap-1 text-center text-sm">
            Don't have an account?
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="flex cursor-pointer items-center gap-1 underline"
            >
              Sign up <LiaLongArrowAltRightSolid />
            </button>
          </p>{" "}
        </>
      ) : (
        <p className="mt-10 gap-1 border-t border-[#ebeced] pt-5 text-[10px]">
          By joining, you agree to Frank And Oak’s{" "}
          <Link href="#" className="underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>{" "}
          and to receive Frank And Oak’s electronic communications.
        </p>
      )}
    </div>
  );
};
