import Image from "next/image";
import React from "react";
import LogoLfa from "../../../../public/LegacyLogo.png";
import LogoLfaSmall from "../../../../public/LegacyLogoSmall.png";

interface Props {
  sidebarIcon?: boolean;
}

const SidebarLogo = (prop : Props) => {
  return (
    <div className="font-bold">
      <Image src={prop.sidebarIcon ? LogoLfaSmall : LogoLfa} alt="logo" />
    </div>
  );
};

export default SidebarLogo;
