import React from "react";

interface Props {
  isChecked?: boolean;
  isDisabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  lableStyle?: string;
  value?: any;
  dataId?: number;
  name?: any;
  innerRef?: (e: any) => void;
  needValidation?: boolean;
  logic?: boolean;
  textError?: string;
  class?: string;
}

const Checkbox = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-start gap-4">
        <input
          type="checkbox"
          disabled={props.isDisabled}
          checked={props.isChecked}
          onChange={props.onChange}
          value={props.value}
          data-id={props.dataId}
          name={props.name}
          ref={props.innerRef}
          className={`p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1 `}
        />
        {props.label ? (
          <div
            className={`${props.lableStyle} ${
              props.isDisabled && "text-gray-soft-strong"
            }`}
          >
            {props.label}
          </div>
        ) : null}
      </div>
      {props.needValidation && !props.logic ? (
        <div className="flex items-start">
          <div className="w-full text-xs text-left text-red">
            {props.textError ? props.textError : "Required"}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Checkbox;
