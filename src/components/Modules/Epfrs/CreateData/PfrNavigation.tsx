import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React from "react";

const PfrNavigation = () => {
  let menuNavigation = [
    {
      id: 1,
      name: "Personal Information",
    },
    {
      id: 2,
      name: "Existing Portfolio",
    },
    {
      id: 3,
      name: "Cash Flow",
    },
    {
      id: 4,
      name: "Balance Sheet",
    },
    {
      id: 5,
      name: "Risk Profile",
    },
    {
      id: 6,
      name: "Customer Knowledge Assesment",
    },
    {
      id: 7,
      name: "Priorities & Need Analysis",
    },
    {
      id: 8,
      name: "Affordability",
    },
    {
      id: 9,
      name: "Analysis & Recommendation",
    },
    {
      id: 10,
      name: "Switching / Replacement",
    },
    {
      id: 11,
      name: "Client’s Acknowledgment",
    },
    {
      id: 12,
      name: "Representative Declaration",
    },
  ];

  return (
    <aside
      className={`fixed top-0 z-10 w-56 min-h-screen ml-24 px-6 py-16 bg-blue-midnight text-sm`}
    >
      <div className="space-y-8">
        {menuNavigation.map((val, index) => (
          <RowMenu item={val} key={index} />
        ))}
      </div>
    </aside>
  );
};

function RowMenu({ item }: any) {
  let {showDetailData, sectionCreateEpfrId} = useNavigationSection();

  const showDetail = () => {
    showDetailData(item.id);
  };

  let setSectionActive = false;

  let checkSectionFirstLoad = sectionCreateEpfrId == 0 ? 1 : sectionCreateEpfrId;

  if(checkSectionFirstLoad == 91 || checkSectionFirstLoad == 92) {
    checkSectionFirstLoad = 9;
  }

  if(checkSectionFirstLoad == item.id) {
    setSectionActive = true
  }

  return (
    <div
      className={`flex flex-row items-center justify-start gap-2 ${setSectionActive ? 'opacity-100' : 'opacity-60'} text-white cursor-pointer`}
      onClick={showDetail}
    >
      <span className="w-6 h-6 px-2 py-1 text-xs text-center bg-white rounded-md text-blue-midnight">
        {item.id}
      </span>
      <span>{item.name}</span>
    </div>
  );
}

export default PfrNavigation;
