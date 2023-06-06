import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any,
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  datas?: Array<any>;
  className?: string;
  dataType?: string;
}

const Select = (props: Props) => {

  // function selectedChange(event: ChangeEvent<HTMLSelectElement>): void {
  //   let selectedValue : any = event.target.value;
  //   prop.handleChange(selectedValue);
  // }

  return (
    <div className={`w-full ${props.className} space-y-3`}>
      {props.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {props.label}
        </label>
      ) : (
        ""
      )}

      <select
        data-groupdata={props.dataType}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
        onChange={props.handleChange}
      >
        {props.datas?.length &&
          props.datas.map((val, index) => (
            <option
              key={index}
              value={val.id}
            >
              {val.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
