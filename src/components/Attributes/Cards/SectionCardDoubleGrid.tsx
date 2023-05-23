import React from 'react'

interface Props {
    children?: React.ReactNode,
    className?: any
}
const SectionCardDoubleGrid = (props : Props) => {
  return (
    <div className={`grid grid-cols-1 gap-8 mb-10 lg:grid-cols-2 sm:grid-cols-1 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default SectionCardDoubleGrid