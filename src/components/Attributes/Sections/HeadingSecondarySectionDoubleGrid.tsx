import React from 'react'

interface Props {
    children?: React.ReactNode,
    className?: any
}

const HeadingSecondarySectionDoubleGrid = (props : Props) => {
  return (
    <div className={`flex flex-row items-center justify-between mb-10 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default HeadingSecondarySectionDoubleGrid