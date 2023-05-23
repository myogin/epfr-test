import React from 'react'

interface Props {
    children?: React.ReactNode,
    className?: string
}

const SectionCardSingleGrid = (props : Props) => {
  return (
    <div className={`grid grid-cols-1 mb-10 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default SectionCardSingleGrid