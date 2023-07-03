import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
  }

const RowSixGrid = ({ children, className}: Props) => {
  return (
    <div className={`grid ${className} grid-cols-1 gap-4 mb-5 lg:grid-cols-6 sm:grid-cols-3 md:grid-cols-3`}>
      {children}
    </div>
  )
}

export default RowSixGrid