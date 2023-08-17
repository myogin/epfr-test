import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: any;
  type?: string;
  disabled?: boolean;
}

const ButtonGreenMedium = (props: Props) => {
  return (
    <>
      {props.disabled ? (
        <>
          <button
            disabled={props.disabled}
            className={`flex ${
              props.className ? "" : "justify-start"
            } gap-2 px-4 py-3 text-sm text-white rounded-lg bg-gray-soft-strong ${
              props.className
            }`}
            onClick={props.onClick}
          >
            {props.children}
          </button>
        </>
      ) : (
        <>
          {props.type === "submit" ? (
            <button
              type="submit"
              className={`flex ${
                props.className ? "" : "justify-start"
              } gap-2 px-4 py-3 text-sm text-white rounded-lg bg-green-deep hover:bg-[#20a364]${
                props.className
              }`}
            >
              {props.children}
            </button>
          ) : (
            <button
              className={`flex ${
                props.className ? "" : "justify-start"
              } gap-2 px-4 py-3 text-sm text-white rounded-lg bg-green-deep hover:bg-[#20a364] ${
                props.className
              }`}
              onClick={props.onClick}
            >
              {props.children}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ButtonGreenMedium;
