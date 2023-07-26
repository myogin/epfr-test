import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  pfrType?: number;
}

const RowSingleORDouble = ({ children, className, pfrType }: Props) => {
  if (pfrType == 2) {
    return (
      <div
        className={`grid ${className} grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2`}
      >
        {children}
      </div>
    );
  }
  return <div className={`grid ${className} grid-cols-1 mb-5`}>{children}</div>;
};
export default RowSingleORDouble;
