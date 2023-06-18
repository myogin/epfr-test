import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any;
}

const ButtonBorder = (prop: Props) => {
  return (
    <button
      className={`flex ${
        prop.className ? "" : "justify-start"
      } gap-2 px-3 py-2 text-sm ${
        prop.className ? "" : "text-gray-light border border-gray-soft-strong"
      } rounded-lg ${prop.className}`}
      onClick={prop.onClick}
    >
      {prop.children}
    </button>
  );
};

export default ButtonBorder;
