import React from 'react'

interface Props {
  children?: React.ReactNode,
  className?: any
}

const HeadingPrimarySection = (props: Props) => {
  return (
    <div className={`flex flex-row items-center justify-between ${props.className}`}>
      {props.children}
    </div>
  );
}

export default HeadingPrimarySection