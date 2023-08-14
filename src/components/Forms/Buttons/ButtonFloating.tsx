import React from "react";

import SaveLineIcon from "remixicon-react/SaveLineIcon";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string
}

const ButtonFloating = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      title={props.title}
      className="fixed z-50 flex items-center justify-center text-white duration-300 rounded-full w-14 h-14 bg-blue-deep bottom-10 right-8 drop-shadow-lg hover:bg-blue-midnight hover:drop-shadow-2xl hover:animate-bounce"
    >
      <SaveLineIcon size={25} />
    </button>
  );
};

export default ButtonFloating;
