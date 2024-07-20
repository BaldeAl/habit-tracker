import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications: React.FC = () => {
  return <ToastContainer />;
};

export const notify = (message: string) => {
  toast(message, {
    className: "bg-green-500 text-white",
    progressClassName: "bg-blue-500",
  });
};

export default Notifications;
