import { FaFacebookF, FaGoogle } from "react-icons/fa";

export const SocialLogin = () => {
  return (
    <div className="px-5 md:px-12">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-6 md:py-8">
        <span className="h-[1px] w-full bg-[#ebeced]"></span>
        <p className="text-center text-sm">Social login</p>
        <span className="h-[1px] w-full bg-[#ebeced]"></span>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
        <button className="grid min-h-[44px] grid-cols-[36px_1fr_36px] items-center border-2 border-black text-sm">
          <span className="grid min-w-9 place-items-center text-base">
            <FaFacebookF />
          </span>
          <span>Sign in with Facebook</span>
        </button>
        <button className="grid min-h-[44px] grid-cols-[36px_1fr_36px] items-center border-2 border-black text-sm">
          <span className="grid min-w-9 place-items-center text-base">
            <FaGoogle />
          </span>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};
