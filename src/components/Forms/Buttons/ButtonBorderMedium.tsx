import React from 'react'

interface Props {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: any
  }

const ButtonBorderMedium = (prop: Props) => {
  return (
    <button className={`flex ${prop.className ? "" : "justify-start"} gap-2 px-4 py-3 text-sm ${prop.className ? "" : "text-gray-light border border-gray-soft-strong"} border rounded-lg ${prop.className}`} onClick={prop.onClick}>
      {prop.children}
    </button>
  );
};

export default ButtonBorderMedium