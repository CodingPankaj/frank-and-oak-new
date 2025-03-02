import Link from "next/link";

export const HeaderMyAccount = () => {
  return (
    <div className="invisible absolute top-[37px] right-0 w-[320px] max-w-[320px] rounded-b-[5px] bg-[#fafafa] transition-all duration-300 group-hover:visible">
      <div className="bg-light-gray px-6 py-3">
        <h4 className="text-lg">My account</h4>
      </div>
      <div className="bg-olive-dark-green flex flex-col px-6 py-3 text-lg text-white">
        <ul className="">
          <li className="flex justify-between border-b border-[#6D7766] py-2">
            <h4 className="text-[#D2E8C4]">
              Hi, <span className="text-white">Pankaj</span>!
            </h4>
            <img src="images/frank-club-lime.svg" alt="frank club" />
          </li>
          <li className="flex justify-between border-b border-[#6D7766] py-2">
            Points: <span>20</span>
          </li>
          <li className="flex justify-between border-b border-[#6D7766] py-2">
            Tier:
            <span>Community</span>
          </li>
        </ul>
        <Link
          href={"#"}
          className="mt-5 mb-3 w-full border-[2px] border-[#D2E8C4] py-3 text-center text-sm text-[#d1e8c3] hover:bg-[#D2E8C4] hover:text-[#262821]"
        >
          View your dashboard
        </Link>
      </div>
      <div className="px-6 py-3">
        <ul className="font-base mt-2 flex flex-col gap-3">
          <li>
            <Link className="hover:underline" href="#">
              Wishlist
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#">
              Orders & returns
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#">
              Address book
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#">
              Account settings
            </Link>
          </li>
        </ul>
        <button className="border-light-gray mt-5 w-full border-t pt-3 text-center text-sm text-[#666666] underline">
          Logout
        </button>
      </div>
    </div>
  );
};
