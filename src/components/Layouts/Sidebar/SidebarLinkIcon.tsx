import Link from "next/link";
import React from "react";

interface Props {
  val?: any;
  active?: any;
}

const SidebarLinkIcon = (prop: Props) => {
  return (
    <Link
      href={prop.val.url}
      className={`flex w-full justify-start gap-4 p-3 hover:cursor-pointer items-center${
        prop.active ? "bg-white text-blue-midnight rounded-md" : ""
      }`}
    >
      {prop.active ? prop.val.logo_active : prop.val.logo}
    </Link>
  );
};

export default SidebarLinkIcon;
