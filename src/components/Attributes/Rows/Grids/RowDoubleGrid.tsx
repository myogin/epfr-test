import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string
}

const RowDoubleGrid = ({ children,className }: Props) => {
  return (
    <div className={`grid ${className} grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2`}>
      {children}
    </div>
  );
};

export default RowDoubleGrid;
