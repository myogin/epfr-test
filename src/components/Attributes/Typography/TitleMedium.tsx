import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const TitleMedium = ({ children }: Props) => {
  return <div className="text-2xl font-medium text-gray-light">{children}</div>;
};

export default TitleMedium;
