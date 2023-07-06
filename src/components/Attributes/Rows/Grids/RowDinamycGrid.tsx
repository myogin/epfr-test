import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
  }

const RowDinamycGrid = ({ children, className }: Props) => {
  return (
    <div className={`grid ${className} grid-cols-1 gap-8 mb-5`}>
      {children}
    </div>
  )
}

export default RowDinamycGrid