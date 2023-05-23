import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  datas?: Array<any>;
  className?: string
}

const Select = (prop: Props) => {

  // function selectedChange(event: ChangeEvent<HTMLSelectElement>): void {
  //   let selectedValue : any = event.target.value;
  //   prop.handleChange(selectedValue);
  // }

  return (
    <div className={`w-full ${prop.className} space-y-3`}>
      {prop.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {prop.label}
        </label>
      ) : (
        ""
      )}

      <select
        placeholder={prop.placeholder}
        value={prop.value}
        className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
        onChange={prop.handleChange}
      >
        {prop.datas?.length &&
          prop.datas.map((val, index) => (
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
