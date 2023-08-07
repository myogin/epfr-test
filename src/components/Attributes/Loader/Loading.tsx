import Image from "next/image";
import React from "react";
import styles from "./loading.module.css";

interface Props {
  isLoading: boolean;
}
const Loading = (props: Props) => {
  if (props.isLoading) {
    return (
      <div className="absolute grid h-screen w-screen place-items-center bg-gray-soft-thin opacity-50">
        <div>
          <Image
            src="/LegacyFALogo.png"
            alt="loading"
            width={146}
            height={48}
          />
          <div className="flex items-center	 ">
            <div className={styles.spinner}></div>
            <span className="ml-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
