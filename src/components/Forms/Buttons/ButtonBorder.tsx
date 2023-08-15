import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any;
  isDisable?: boolean;
}

const ButtonBorder = (prop: Props) => {
  return (
    <button
      className={`flex ${
        prop.className ? "" : "justify-start"
      } gap-2 px-3 py-2 text-sm ${
        prop.className ? "" : "text-gray-light border border-gray-soft-strong"
      } rounded-lg ${prop.className} ${
        prop.isDisable ? "" : "hover:bg-[#f3f3f3]"
      } `}
      onClick={prop.onClick}
      disabled={prop.isDisable}
    >
      {prop.children}
    </button>
  );
};

export default ButtonBorder;
