import axios from "axios";
import { toastError } from "../utils/tostifytoast";

export const deleteSingleData = async (
  deleteApiUrl,
  cb,
  message = "item",
  setDeleteBtnStatus,
) => {
  const isConfirmed = window.confirm("Are you sure, you want to delete?");

  if (isConfirmed) {
    setDeleteBtnStatus(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${deleteApiUrl}`,
        {
          withCredentials: true,
        },
      );

      // function to call after item is deleted for example get/fetch data function
      await cb();
      setDeleteBtnStatus(false);
      toastError(`${message} deleted`);
    } catch (error) {
      setDeleteBtnStatus(false);
      toastError(`Failed to delete ${message}`);
    }
  }
};
