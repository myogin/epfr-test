import Image from "next/image";
import React from "react";
import styles from "./loading.module.css";

const LoadingInBox = () => {
  return (
    <div className=" grid h-auto w-full place-items-center">
      <div>
        <Image src="/LegacyFALogo.png" alt="loading" width={146} height={48} />
        <div className="flex items-center	 ">
          <div className={styles.spinner}></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingInBox;
