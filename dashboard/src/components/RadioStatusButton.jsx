export const RadioStatusButton = ({ radioBtnStatus, setRadioBtnStatus }) => {
  return (
    <div className="product-input-container">
      <span htmlFor="category-status" className="add-product-label">
        Category Status
      </span>

      <button
        type="button"
        className={`flex items-center justify-between rounded border px-4 py-2 ${radioBtnStatus === true ? "border-accent-color/60 bg-accent-color/10" : "border-border-color"}`}
        aria-pressed={radioBtnStatus === true}
        aria-label="Set category status to Active"
        onClick={() => setRadioBtnStatus(true)}
      >
        <span className="text-[13px] font-semibold text-text-primary-color">
          Active
        </span>
        <span
          className={`relative grid size-[15px] cursor-pointer place-items-center rounded-full border ${radioBtnStatus === true ? "border-accent-color bg-accent-color" : "border-border-color"}`}
          aria-hidden="true"
        >
          <img
            src="/images/dot.svg"
            alt="dot icon"
            className={`w-full ${radioBtnStatus === true ? "visble opacity-100" : "invisible opacity-0"}`}
          />
        </span>
      </button>
      <button
        type="button"
        className={`flex items-center justify-between rounded border px-4 py-2 ${radioBtnStatus === false ? "border-accent-color/60 bg-accent-color/10" : "border-border-color"}`}
        aria-pressed={radioBtnStatus === false}
        aria-label="Set category status to In Active"
        onClick={() => setRadioBtnStatus(false)}
      >
        <span className="text-[13px] font-semibold text-text-primary-color">
          In Active
        </span>
        <span
          className={`relative grid size-[15px] cursor-pointer place-items-center rounded-full border ${radioBtnStatus === false ? "border-accent-color bg-accent-color" : "border-border-color"}`}
          aria-hidden="true"
        >
          <img
            src="/images/dot.svg"
            alt="dot icon"
            className={`w-full ${radioBtnStatus === false ? "visble opacity-100" : "invisible opacity-0"}`}
          />
        </span>
      </button>
    </div>
  );
};
