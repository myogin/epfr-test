import React from "react";

interface Props {
  value?: string | number | undefined | null;
  placeholder?: string | number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  datas?: Array<any>;
}

const SelectFilter = (prop: Props) => {
  return (
    <div>
      <select
        value={prop.value ? prop.value : undefined}
        name=""
        id=""
        className="px-4 py-2 text-sm bg-white border rounded-lg w-28 border-gray-soft-strong cursor-pointer"
        onChange={prop.handleChange}
      >
        {prop.datas?.length &&
          prop.datas.map((val, index) => (
            <option key={index} value={val.id}>
              {val.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectFilter;
