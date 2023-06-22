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
}

const Checkbox = (props: Props) => {
  return (
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
      <span className={`${props.lableStyle}`}>{props.label}</span>
    </div>
  );
};

export default Checkbox;
