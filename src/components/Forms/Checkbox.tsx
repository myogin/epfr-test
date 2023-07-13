import React from "react";

interface Props {
  isChecked?: boolean;
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
}

const Checkbox = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-start gap-4">
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={props.onChange}
          value={props.value}
          data-id={props.dataId}
          name={props.name}
          ref={props.innerRef}
          className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
        />
        <div className={`${props.lableStyle}`}>{props.label}</div>
      </div>
      {props.needValidation && !props.logic ? (
        <div className="flex items-start">
          <div className="w-full text-xs text-left text-red">
            {props.textError ? props.textError : "Required field"}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Checkbox;
