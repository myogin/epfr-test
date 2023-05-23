import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const RowSingle = ({ children, className }: Props) => {
  return (
    <div className={`flex items-center justify-start gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default RowSingle;
