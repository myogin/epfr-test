import React, { ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
const DashboardCard = ({ children }: Props) => {
  return <div className="p-8">{children}</div>;
};

export default DashboardCard;
