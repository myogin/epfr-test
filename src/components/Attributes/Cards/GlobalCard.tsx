import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const GlobalCard = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};

export default GlobalCard;
