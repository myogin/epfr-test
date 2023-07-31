import React from 'react'


interface Props {
  children?: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties
}

const RowFourthGrid = ({ children, className, styles }: Props) => {
  return (
    <div className={`grid ${className} grid-cols-1 gap-8 mb-5 lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-4`} style={styles}>
      {children}
    </div>
  );
}

export default RowFourthGrid