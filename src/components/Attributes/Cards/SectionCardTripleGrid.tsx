import React from 'react'

interface Props {
    children?: React.ReactNode,
    className?:any
}
const SectionCardTripleGrid = (props : Props) => {
  return (
    <div className={`grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default SectionCardTripleGrid