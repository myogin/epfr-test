import React from "react";

interface Props {
  children?: React.ReactNode;
  type?: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const ButtonTransparentMedium = (props: Props) => {
  return (
    <>
      {props.type === "submit" ? (
        <button
          type="submit"
          className="flex px-4 py-3 text-sm rounded-lg text-gray-light bg-gray-soft-light"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      ) : (
        <button
          className="flex px-4 py-3 text-sm rounded-lg text-gray-light bg-gray-soft-light"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </>
  );
};

export default ButtonTransparentMedium;
