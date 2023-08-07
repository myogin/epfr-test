import SidebarLogo from "./SidebarLogo";
import SidebarTopMenu from "./SidebarTopMenu";
import SidebarBottomMenu from "./SidebarBottomMenu";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  let changeSidebar: boolean = false;

  let epfrSingle = "/epfrs/create/single";
  let epfrJoin = "/epfrs/create/join";
  let submissionCreate = "/submissions/create";
  let selections = "/selections";

  if (
    router.pathname == epfrSingle ||
    router.pathname == epfrJoin ||
    router.pathname == submissionCreate ||
    router.pathname == selections
  ) {
    changeSidebar = true;
  }

  return (
    <aside
      className={`fixed flex flex-col top-0 z-10 ${
        changeSidebar ? "w-24 border-r border-white px-6" : "w-64 px-8"
      } min-h-screen py-16 text-white bg-blue-midnight`}
    >
      <div className="flex flex-row items-center p-1 mb-10">
        <SidebarLogo sidebarIcon={changeSidebar} />
      </div>

      <div className="flex flex-col flex-1">
        <SidebarTopMenu router={router} sidebarIcon={changeSidebar} />
        <SidebarBottomMenu router={router} sidebarIcon={changeSidebar} />
      </div>
    </aside>
  );
};

export default Sidebar;
