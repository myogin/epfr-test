import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any
}

const ButtonGreenMedium = (prop: Props) => {
  return (
    <button className={`flex ${prop.className ? "" : "justify-start"} gap-2 px-4 py-3 text-sm text-white rounded-lg bg-green-deep ${prop.className}`} onClick={prop.onClick}>
      {prop.children}
    </button>
  );
};

export default ButtonGreenMedium;
