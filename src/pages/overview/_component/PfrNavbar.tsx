import { useFilterDataEpfr } from "@/store/epfrPage/filterDataEpfr";
import React from "react";
import Search2LineIcon from "remixicon-react/Search2LineIcon";

interface Props {
  val?: any;
  index?: number;
  active?: any;
}

const PfrNavbar = () => {
  let menu = [
    {
      id: 1,
      name: "Draft Process",
      icon: "",
      type: 1,
    },
    {
      id: 2,
      name: "Sign Process",
      icon: "",
      type: 1,
    },
    {
      id: 3,
      name: "Completed",
      icon: "",
      type: 1,
    },
    {
      id: 4,
      name: "",
      icon: <Search2LineIcon />,
      type: 2,
    },
  ];

  return (
    <div className="flex flex-row items-center w-full mt-4 text-sm border-b text-gray-light border-gray-soft-light">
      {menu.map((val, index) => (
        <RowNavbar item={val} key={index} />
      ))}
    </div>
  );
};

function RowNavbar({ item }: any) {
  const { subMenuActive, setSubmenu } = useFilterDataEpfr();

  const showFilter = () => {
    setSubmenu(item.id);
  };

  let setSectionActive = false;

  let checkSectionFirstLoad = subMenuActive == 0 ? 1 : subMenuActive;

  if (checkSectionFirstLoad == item.id) {
    setSectionActive = true;
  }

  return (
    <>
      <div
        className={`pr-4 pb-4 ${
          setSectionActive ? "border-b-4 border-green-deep text-green-deep" : ""
        }`}
      >
        <button onClick={showFilter}>{item.name}</button>
      </div>
      {item.type > 1 ? (
        <div className="flex-auto pb-4">
          <div className="flex items-center justify-start float-right gap-4">
            <input
              type="text"
              className="p-0 border-none"
              placeholder="Search pfr data"
            />
            <Search2LineIcon />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PfrNavbar;
