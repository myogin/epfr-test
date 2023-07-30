import React from 'react'

interface Props {
    children?: React.ReactNode;
    className?: string;
    key?:any
  }

const RowDinamycGrid = (props: Props) => {
  return (
    <div key={props.key} className={`grid ${props.className} grid-cols-1 gap-8 mb-5`}>
      {props.children}
    </div>
  )
}

export default RowDinamycGrid