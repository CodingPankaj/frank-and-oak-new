import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export const SubmitBtn = ({ label = "Submit", submitBtnLoader = false }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(submitBtnLoader);
  }, [submitBtnLoader]);

  return (
    <button type="submit" className="primary-btn" disabled={loading}>
      {label}
      {loading && (
        <Loader className={"size-[14px]"} loaderStyle={"fill-white"} />
      )}
    </button>
  );
};
