import React from "react";
import ArchiveLineIcon from "remixicon-react/ArchiveLineIcon";
import DashboardLineIcon from "remixicon-react/DashboardLineIcon";
import File3LineIcon from "remixicon-react/File3LineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import Building2LineIcon from "remixicon-react/Building2LineIcon";
import FileTextLineIcon from "remixicon-react/FileTextLineIcon";
import WalletLineIcon from "remixicon-react/WalletLineIcon";
import User2LineIcon from "remixicon-react/User2LineIcon";
import FolderUserLineIcon from "remixicon-react/FolderUserLineIcon";

// Fill
import ArchiveFillIcon from "remixicon-react/ArchiveFillIcon";
import DashboardFillIcon from "remixicon-react/DashboardFillIcon";
import File3FillIcon from "remixicon-react/File3FillIcon";
import UserFillIcon from "remixicon-react/UserFillIcon";
import Building2FillIcon from "remixicon-react/Building2FillIcon";
import FileTextFillIcon from "remixicon-react/FileTextFillIcon";
import WalletFillIcon from "remixicon-react/WalletFillIcon";
import User2FillIcon from "remixicon-react/User2FillIcon";
import FolderUserFillIcon from "remixicon-react/FolderUserFillIcon";

import SidebarLink from "./SidebarLink";
import SidebarLinkIcon from "./SidebarLinkIcon";
import SoundModuleLineIcon from "remixicon-react/SoundModuleLineIcon";
import SoundModuleFillIcon from "remixicon-react/SoundModuleFillIcon";

interface Props {
  router?: any;
  sidebarIcon?: boolean;
}

const SidebarTopMenu = (prop: Props) => {
  let groupRouter = prop.router.pathname;

  let epfrSingle = "/epfrs/create/single";
  let epfrJoin = "/epfrs/create/join";
  let submissionCreate = "/submissions/create";
  let submissionShow = "/submissions/show";
  let clientShow = "/clients/show";
  let userShow = "/users/show";
  let userAdd = "/users/add";
  let userEdit = "/users/edit";

  if (prop.router.pathname == epfrSingle || prop.router.pathname == epfrJoin) {
    groupRouter = "/epfrs";
  }

  if (
    prop.router.pathname == submissionCreate ||
    prop.router.pathname == submissionShow
  ) {
    groupRouter = "/submissions";
  }

  if (prop.router.pathname == clientShow) {
    groupRouter = "/clients";
  }

  if (
    prop.router.pathname == userShow ||
    prop.router.pathname == userEdit ||
    prop.router.pathname == userAdd
  ) {
    groupRouter = "/users";
  }

  let topMenu = [
    {
      url: "/overview",
      name: "Overview",
      logo: <DashboardLineIcon />,
      logo_active: <DashboardFillIcon />,
    },
    {
      url: "/epfr",
      name: "EPFR",
      logo: <File3LineIcon />,
      logo_active: <File3FillIcon />,
    },
    // {
    //   url: "/submissions",
    //   name: "Submission",
    //   logo: <FileTextLineIcon />,
    //   logo_active: <FileTextFillIcon />,
    // },
    // {
    //   url: "/clients",
    //   name: "Client",
    //   logo: <UserLineIcon />,
    //   logo_active: <UserFillIcon />,
    // },
    // {
    //   url: "/products",
    //   name: "Product",
    //   logo: <ArchiveLineIcon />,
    //   logo_active: <ArchiveFillIcon />,
    // },
    // {
    //   url: "/providers",
    //   name: "Provider",
    //   logo: <Building2LineIcon />,
    //   logo_active: <Building2FillIcon />,
    // },
    // {
    //   url: "/payrolls",
    //   name: "Payroll",
    //   logo: <WalletLineIcon />,
    //   logo_active: <WalletFillIcon />,
    // },
    // {
    //   url: "/users",
    //   name: "User Account",
    //   logo: <FolderUserLineIcon />,
    //   logo_active: <FolderUserFillIcon />,
    // },
    // {
    //   url: "/salesassociates",
    //   name: "Sales Associates",
    //   logo: <User2LineIcon />,
    //   logo_active: <User2FillIcon />,
    // },
    // {
    //   url: "/selections",
    //   name: "Selection",
    //   logo: <SoundModuleLineIcon />,
    //   logo_active: <SoundModuleFillIcon />,
    // },
  ];

  return (
    <div>
      <div className="text-sm font-medium">
        <div className="space-y-2">
          {topMenu.map((val, index) => {
            return (
              <div key={"top-menu-" + index}>
                {prop.sidebarIcon ? (
                  <SidebarLinkIcon val={val} active={groupRouter == val.url} />
                ) : (
                  <SidebarLink val={val} active={groupRouter == val.url} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarTopMenu;
