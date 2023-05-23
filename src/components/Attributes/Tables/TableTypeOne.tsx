
import { useDetailDataEpfr } from "@/store/epfrPage/detailData";
import React from "react";
import More2LineIcon from "remixicon-react/More2LineIcon";
import SmallBadges from "../Badges/SmallBadges";

const TableTypeOne = () => {
  
  let dataEpfr = [
    {
      id: 1,
      name: "Ellen Wilson",
      type: "Single",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 2,
      name: "Margo Madison",
      type: "Single",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 3,
      name: "Rahul Monaz",
      type: "Multiple",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 4,
      name: "Steven Ray",
      type: "Multiple",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 5,
      name: "Agnes Stone",
      type: "Single",
      status: "Dfraft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 6,
      name: "Ellen Wilson",
      type: "Single",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 7,
      name: "Margo Madison",
      type: "Single",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 8,
      name: "Rahul Monaz",
      type: "Multiple",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 9,
      name: "Steven Ray",
      type: "Multiple",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
    {
      id: 10,
      name: "Agnes Stone",
      type: "Single",
      status: "Draft",
      createdAt: "1 Jan 2023",
    },
  ];

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between py-6 mx-8 text-sm opacity-50 text-gray-light">
        <div className="basis-1/3">Name</div>
        <div className="basis-1/5">Type</div>
        <div className="basis-1/5">Progress</div>
        <div className="basis-1/5">Created At</div>
        <div className="basis-1/12"></div>
      </div>
      {dataEpfr.map((val, index) => (
        <RowData item={val} key={index} />
      ))}
    </div>
  );
};

function RowData({ item }: any) {
  let showDetailData = useDetailDataEpfr((state) => state.showDetailData);

  const showDetail = () => {
    console.log("test masuk gak");
    showDetailData(item.id);
  };

  return (
    <div
      className="flex flex-row justify-between py-6 mx-8 text-sm border-b hover:px-8 hover:mx-0 hover:border-green-deep hover:bg-green-soft text-gray-light border-gray-soft-light"
      key={item.index}
    >
      <div className="basis-1/3">{item.name}</div>
      <div className="basis-1/5">{item.type}</div>
      <div className="basis-1/5">
        <SmallBadges
          className="bg-blue-soft text-blue-deep"
          data={item.status}
        />
      </div>
      <div className="basis-1/5">{item.createdAt}</div>
      <div className="text-right basis-1/12">
      <button onClick={showDetail}>
            <More2LineIcon />
          </button>
      </div>
    </div>
  );
}

export default TableTypeOne;
