import React from "react";
import Notification3LineIcon from "remixicon-react/Notification3LineIcon";
import ChatSmile2LineIcon from "remixicon-react/ChatSmile2LineIcon";
import Settings5LineIcon from "remixicon-react/Settings5LineIcon";

// Fill Icon
import Notification3FillIcon from "remixicon-react/Notification3FillIcon";
import ChatSmile2FillIcon from "remixicon-react/ChatSmile2FillIcon";
import Settings5FillIcon from "remixicon-react/Settings5FillIcon";

import SidebarLink from "./SidebarLink";
import SidebarLinkIcon from "./SidebarLinkIcon";


interface Props {
  router?: any;
  sidebarIcon?: boolean;
}

const SidebarBottomMenu = (prop: Props) => {
  let bottomMenu = [
    {url: "/notifications", name: "Notification", logo: <Notification3LineIcon />, logo_active: <Notification3FillIcon />},
    { url: "/supports", name: "Support", logo: <ChatSmile2LineIcon />, logo_active: <ChatSmile2FillIcon /> },
    { url: "/settings", name: "Settings", logo: <Settings5LineIcon />, logo_active: <Settings5FillIcon /> },
  ];

  return (
    <div>
      <div className="text-sm font-medium">
        <div className="space-y-2">
          {bottomMenu.map((val, index) => {
            return (
              <div key={"bottom-menu-"+index}>
                {prop.sidebarIcon ? (
                  <SidebarLinkIcon
                    val={val}
                    active={prop.router.pathname == val.url}
                  />
                ) : (
                  <SidebarLink
                    val={val}
                    active={prop.router.pathname == val.url}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarBottomMenu;
