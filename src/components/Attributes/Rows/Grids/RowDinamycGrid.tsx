import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
  }

const RowDinamycGrid = (props: Props) => {
  return (
    <div className={`grid ${props.className} grid-cols-1 gap-8 mb-5`}>
      {props.children}
    </div>
  )
}

export default RowDinamycGrid