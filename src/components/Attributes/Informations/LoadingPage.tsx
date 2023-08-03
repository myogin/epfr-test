import React from "react";
import LogoLfaSmall from "../../../../public/LegacyFALogo.png";
import Image from "next/image";
const LoadingPage = () => {
  return (
    <div className="px-3 text-center">
      <Image src={LogoLfaSmall} alt="loading" />
      Loading...
    </div>
  );
};

export default LoadingPage;
