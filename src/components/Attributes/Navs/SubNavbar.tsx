import { useFilterDataSubMenu } from "@/store/shared/filterDataSubMenu";
import React from "react";
import Search2LineIcon from "remixicon-react/Search2LineIcon";

interface Props {
  val?: any;
  index?: number;
  active?: any;
  menu?: any;
  typeMenu?: any;
}

const SubNavbar = (props: Props) => {
  let menus = props.menu;

  return (
    <div className="flex flex-row items-center w-full mt-4 text-sm border-b text-gray-light border-gray-soft-light">
      {menus.map((val: any, index: any) => (
        <RowNavbar typeMenu={props.typeMenu} item={val} key={index} />
      ))}
    </div>
  );
};

function RowNavbar({ typeMenu, item }: any) {
  const {
    epfrSubMenu,
    submissionSubMenu,
    providerSubMenu,
    userSubMenu,
    residencyStatus,
    currency,
    nationality,
    language,
    title,
    sex,
    race,
    maritalStatus,
    relationshipStatus,
    educationLevel,
    employmentStatus,
    cisFund,
    cisProfile,
    ilpFund,
    ilpProfile,
    setSubmenu,
  } = useFilterDataSubMenu();

  const showFilter = () => {
    setSubmenu(typeMenu, item.id);
  };

  let subMenuActive: number = 0;
  switch (typeMenu) {
    case "epfrSubMenu":
      subMenuActive = epfrSubMenu;
      break;
    case "submissionSubMenu":
      subMenuActive = submissionSubMenu;
      break;
    case "providerSubMenu":
      subMenuActive = providerSubMenu;
      break;
    case "userSubMenu":
      subMenuActive = userSubMenu;
      break;
    case "residencyStatus":
      subMenuActive = residencyStatus;
      break;
    case "currency":
      subMenuActive = currency;
      break;
    case "nationality":
      subMenuActive = nationality;
      break;
    case "language":
      subMenuActive = language;
      break;
    case "title":
      subMenuActive = title;
      break;
    case "sex":
      subMenuActive = sex;
      break;
    case "race":
      subMenuActive = race;
      break;
    case "maritalStatus":
      subMenuActive = maritalStatus;
      break;
    case "relationshipStatus":
      subMenuActive = relationshipStatus;
      break;
    case "educationLevel":
      subMenuActive = educationLevel;
      break;
    case "employmentStatus":
      subMenuActive = employmentStatus;
      break;
    case "cisFund":
      subMenuActive = cisFund;
      break;
    case "cisProfile":
      subMenuActive = cisProfile;
      break;
    case "ilpFund":
      subMenuActive = ilpFund;
      break;
    case "ilpProfile":
      subMenuActive = ilpProfile;
      break;
    default:
      subMenuActive = epfrSubMenu;
      break;
  }

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

export default SubNavbar;
