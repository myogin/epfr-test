import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const RowTripleGrid = ({ children, className }: Props) => {
  return (
    <div className={`grid ${className} grid-cols-1 gap-8 ${className ? "" : "mb-5"} lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3`}>
      {children}
    </div>
  );
};

export default RowTripleGrid;
