import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any
}

const ButtonRedMedium = (prop: Props) => {
  return (
    <button className={`flex px-4 py-3 text-sm text-white rounded-lg bg-red ${prop.className}`} onClick={prop.onClick}>
      {prop.children}
    </button>
  );
};

export default ButtonRedMedium;
