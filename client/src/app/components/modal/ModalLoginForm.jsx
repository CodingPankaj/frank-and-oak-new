import Link from "next/link";

export const ModalLoginForm = () => {
  return (
    <div className="px-5 pt-8 md:px-12">
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Email Address"
          name="login-email-address"
          className="login-form-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="login-password"
          className="login-form-input"
        />
        <Link href={"#"} className="text-sm underline">
          Forgot Password?
        </Link>
        <button className="mt-4 h-[50px] bg-black text-lg text-white">
          Log In
        </button>
      </form>
    </div>
  );
};
