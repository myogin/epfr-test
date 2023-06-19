import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  className?: string;
}

const ButtonBox = (prop: Props) => {
  return (
    <button
      className={`lg:px-2 lg:py-2 md:px-1 md:py-1 text-xs rounded-md border ${prop.className} border-gray-soft-strong w-fit`}
      onClick={prop.onClick}
    >
      {prop.children}
    </button>
  );
};

export default ButtonBox;
