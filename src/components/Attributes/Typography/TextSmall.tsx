import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const TextSmall = ({ children, className }: Props) => {
  return (
    <div className={`items-center w-full px-0 py-2 text-sm font-bold ${className}`}>
      {children}
    </div>
  );
};

export default TextSmall;
