import React from 'react'

interface Props {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: any
  }

const BorderGreenLarge = (props : Props) => {
  return (
    <button className={`flex ${props.className ? "" : "justify-start"} gap-2 px-5 py-3 text-sm text-white rounded-lg bg-green-deep ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default BorderGreenLarge