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
import { signOut, useSession } from "next-auth/react";
import { useLoginData } from "@/store/login/logindata";

interface Props {
  router?: any;
  sidebarIcon?: boolean;
}

const SidebarBottomMenu = (prop: Props) => {
  const { delLogin } = useLoginData();

  const { name } = useLoginData();
  let bottomMenu = [
    {
      url: "/notifications",
      name: "Notification",
      logo: <Notification3LineIcon />,
      logo_active: <Notification3FillIcon />,
    },
    {
      url: "/supports",
      name: "Support",
      logo: <ChatSmile2LineIcon />,
      logo_active: <ChatSmile2FillIcon />,
    },
    {
      url: "/logout",
      name: "Logout",
      logo: <Settings5LineIcon />,
      logo_active: <Settings5FillIcon />,
    },
  ];

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="text-sm font-medium flex flex-col flex-1 justify-end">
      <div className="space-y-2">
        {/* {bottomMenu.map((val, index) => {
          return (
            <div key={"bottom-menu-" + index}>
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
        })} */}
        <div>
          <span className="p-3">Hi {name} ~</span>
          <button
            className="flex w-full justify-start gap-4 p-3 hover:cursor-pointer items-center"
            onClick={logout}
          >
            <Settings5LineIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarBottomMenu;
