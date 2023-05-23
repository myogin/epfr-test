import React, { ReactNode } from "react";

interface Props {
  message?: string;
  type?: number;
}

const Notification = (props: Props) => {
  let style: string = "";

  switch (props.type) {
    case 1:
      style = "bg-pink-light border-red text-gray-light";
      break;
    case 2:
      style = "bg-blue-midnight text-white border-gray-light";
      break;
    default:
      style = "bg-blue-midnight text-white border-gray-light";
      break;
  }
  return (
    <div className={`px-8 py-3 text-sm font-normal border rounded-md ${style}`}>
      {props.message}
    </div>
  );
};

export default Notification;
