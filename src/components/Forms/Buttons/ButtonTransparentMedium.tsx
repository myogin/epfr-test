import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const ButtonTransparentMedium = (prop: Props) => {
  return (
    <button
      className="flex px-4 py-3 text-sm rounded-lg text-gray-light bg-gray-soft-light"
      onClick={prop.onClick}
    >
      {prop.children}
    </button>
  );
};

export default ButtonTransparentMedium;
