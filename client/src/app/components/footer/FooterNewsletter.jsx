export const FooterNewsletter = () => {
  return (
    <div className="grow border-t border-white py-5 lg:flex-[0_0_320px] lg:border-0">
      <h4 className="mb-[22px] text-xl leading-none tracking-[-0.03em] text-white">
        Stay in touch
      </h4>
      <p className="mb-7 text-xs text-white">
        Join our newsletter and stay in the know about new collections, outfit
        inspiration, sales, and more.
      </p>
      <NewsletterForm />
    </div>
  );
};

const NewsletterForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-[#7d8281] bg-[#1f2322] p-3 text-sm text-white outline-none placeholder:text-white"
      />
      <input
        type="text"
        placeholder="First Name"
        className="w-full border border-[#7d8281] bg-[#1f2322] p-3 text-sm text-white outline-none placeholder:text-white"
      />
      <div className="flex items-center gap-3 text-[13px] text-white">
        I shop for
        <div className="newsletter-raido-container">
          <input
            type="radio"
            name="gender"
            id="newsletter-women"
            className="newsletter-radio"
          />
          <label htmlFor="newsletter-women" className="newsletter-label">
            Women
          </label>
        </div>
        <div className="newsletter-raido-container">
          <input
            type="radio"
            name="gender"
            id="newsletter-men"
            className="newsletter-radio"
          />
          <label htmlFor="newsletter-men" className="newsletter-label">
            Men
          </label>
        </div>
        <div className="newsletter-raido-container">
          <input
            type="radio"
            name="gender"
            id="newsletter-all"
            className="newsletter-radio"
          />
          <label htmlFor="newsletter-all" className="newsletter-label">
            All
          </label>
        </div>
      </div>
      <button className="mt-1 h-[46px] w-full border-2 border-white px-5 text-sm text-white transition-all duration-300 hover:shadow-[4px_5px_0_0_#b5c1be]">
        Subscribe
      </button>
    </form>
  );
};
