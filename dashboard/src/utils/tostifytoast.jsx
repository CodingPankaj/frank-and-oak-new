import { toast } from "react-toastify";

// Toast Succeess
export const toastSuccess = (message = "Add message here") =>
  toast.success(message);

// Toast Error
export const toastError = (message = "Add message here") =>
  toast.error(message);

// Toast Warning
export const toastWarn = (message = "Add message here") => toast.warn(message);
