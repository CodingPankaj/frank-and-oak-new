import axios from "axios";
import { toastError } from "../utils/tostifytoast";

export const deleteSingleData = async (deleteApiUrl, cb, message = "item") => {
  const isConfirmed = window.confirm("Are you sure, you want to delete?");

  if (isConfirmed) {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${deleteApiUrl}`,
        {
          withCredentials: true,
        },
      );

      console.log(res);

      // function to call after item is deleted for example get/fetch data function
      await cb();
      toastError(`${message} deleted`);
    } catch (error) {
      console.log(error);

      toastError(`Failed to delete ${message}`);
    }
  }
};
