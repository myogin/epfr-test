import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: any
}

const TitleSmall = (prop: Props) => {
  return <div className={`text-base font-bold text-gray-light ${prop.className}`}>{prop.children}</div>;
};

export default TitleSmall;
