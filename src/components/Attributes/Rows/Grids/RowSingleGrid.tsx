import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const RowSingleGrid = ({ children,className }: Props) => {
    return (
        <div className={`grid ${className} grid-cols-1 mb-5`}>
          {children}
        </div>
      );
};

export default RowSingleGrid;
