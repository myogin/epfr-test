import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
    key?: any;
  }

const RowSixGrid = ({ children, className, key }: Props) => {
  return (
    <div key={key} className={`grid ${className} grid-cols-1 gap-4 mb-5 lg:grid-cols-6 sm:grid-cols-3 md:grid-cols-3`}>
      {children}
    </div>
  )
}

export default RowSixGrid