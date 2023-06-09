import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any;
  type?: string;
}

const ButtonGreenMedium = (props: Props) => {
  return (
    <>
      {props.type === "submit" ? (
        <button
          type="submit"
          className={`flex ${
            props.className ? "" : "justify-start"
          } gap-2 px-4 py-3 text-sm text-white rounded-lg bg-green-deep ${
            props.className
          }`}
        >
          {props.children}
        </button>
      ) : (
        <button
          className={`flex ${
            props.className ? "" : "justify-start"
          } gap-2 px-4 py-3 text-sm text-white rounded-lg bg-green-deep ${
            props.className
          }`}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </>
  );
};

export default ButtonGreenMedium;
