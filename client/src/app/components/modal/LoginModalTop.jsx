import Image from "next/image";

export const LoginModalTop = ({ isLogin }) => {
  return (
    <div className="bg-[#fafafa] px-5 pt-12 pb-8 md:px-12">
      <p className="text-center text-xl md:text-[26px]">
        {isLogin ? "Welcome back!" : "Create your account"}
      </p>
      <p className="text-center text-sm md:text-base">
        {isLogin
          ? "Log in to enjoy your perks"
          : "Sign up and enjoy member benefits."}
      </p>
      <LoginModalTopMiddle />
    </div>
  );
};

const LoginModalTopMiddle = () => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 md:mt-8 md:gap-3">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="images/frank-and-oak-club.svg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Frank's club"
          className="w-full max-w-6 min-w-5"
        />
        <p className="mt-[10px] mb-1 text-center text-sm">Frank's Club</p>
        <p className="text-center text-sm">Earn points, get rewards</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="images/heart-filled.svg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Wishlist"
          className="w-full max-w-6 min-w-5"
        />
        <p className="mt-[10px] mb-1 text-center text-sm">Wishlist</p>
        <p className="text-center text-sm">Save your favourites</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="images/access-tag.svg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Early access"
          className="w-full max-w-6 min-w-5"
        />
        <p className="mt-[10px] mb-1 text-center text-sm">Early access</p>
        <p className="text-center text-sm">Exclusive sale perks</p>
      </div>
    </div>
  );
};
