import { RiDeleteBin6Line } from "react-icons/ri";
import { Loader } from "./Loader";

export const ActionBtnDelete = ({ deleteButtonLoader = false, ...props }) => {
  return (
    <button
      disabled={deleteButtonLoader}
      {...props}
      className={`relative rounded bg-red-500/10 p-1 text-sm text-red-500 ${deleteButtonLoader ? "" : "hover:bg-red-500 hover:text-white"}`}
    >
      <RiDeleteBin6Line />

      {deleteButtonLoader ? (
        <Loader
          loaderStyle={"fill-red-500 text-white"}
          className="absolute left-2/4 top-2/4 z-10 size-3 -translate-x-2/4 -translate-y-2/4"
        />
      ) : (
        ""
      )}
    </button>
  );
};
