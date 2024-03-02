import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useCustomToast = () => {
  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  const showWarningToast = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return { showErrorToast, showSuccessToast };
};
export default useCustomToast;
