import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const TextThin = ({ children, className }: Props) => {
  return (
    <div className={`items-center w-full px-0 py-2 text-sm font-normal ${className}`}>
      {children}
    </div>
  );
};

export default TextThin;
