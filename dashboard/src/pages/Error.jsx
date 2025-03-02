import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-accent-color/60 px-3">
      <div className="flex max-w-[500px] flex-col items-center rounded bg-bg-primary-color p-12 text-center font-medium">
        <h3 className="text-primary-color text-[48px] leading-none text-text-primary-color lg:text-[176px]">
          404
        </h3>
        <p className="text-primary-color mt-6 text-xl text-text-primary-color">
          Oops, the page you are trying to access does not exist?
        </p>
        <p className="text-primary-color mt-2 text-[15px] text-text-secondary-color">
          The requested page is not available. It might have been relocated,
          deleted, or never existed.
        </p>

        <Link
          to={"/"}
          className="mt-6 rounded bg-accent-color px-5 py-2 text-white"
        >
          Home Page
        </Link>
      </div>
    </section>
  );
};
