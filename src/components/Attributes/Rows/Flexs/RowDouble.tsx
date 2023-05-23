import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const RowDouble = ({ children,className }: Props) => {
  return <div className={`flex items-center justify-between gap-4 ${className}`}>{children}</div>;
};

export default RowDouble;
