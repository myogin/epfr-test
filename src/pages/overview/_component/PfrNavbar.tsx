import { useFilterDataEpfr } from "@/store/epfrPage/filterDataEpfr";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useState } from "react";
import Search2LineIcon from "remixicon-react/Search2LineIcon";

const PfrNavbar = () => {
  const { query } = useRouter();
  const router = useRouter();

  let menu = [
    {
      id: 1,
      name: "All",
      icon: "",
    },
    {
      id: 2,
      name: "Draft",
      icon: "",
    },
    {
      id: 3,
      name: "Signing on Progress",
      icon: "",
    },
    {
      id: 4,
      name: "Signing Completed",
      icon: "",
    },
    {
      id: 5,
      name: "Signing Cancelled",
      icon: "",
    },
  ];

  function filterActive(
    currentMenu: string,
    query: string | undefined | string[]
  ) {
    if (currentMenu == "All" && (query == undefined || query == "All")) {
      return true;
    }
    if (currentMenu == query) {
      return true;
    }
  }
  function statusFilter(statusLike: string) {
    if (statusLike == "All") {
      const { status_like, ...newQuery } = router.query;
      router.replace({
        query: { ...newQuery },
      });
    } else {
      router.replace({
        query: { ...router.query, status_like: statusLike },
      });
    }
  }

  // handle searching
  // handle filter
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [owner, setOwner] = useState("");

  const handleSearch = () => {
    if (owner) {
      router.push(
        pathname + "?" + createQueryString("ownerDocument_like", owner)
      );
    } else {
      const { ownerDocument_like, ...newQuery } = router.query;
      router.replace({
        query: { ...newQuery },
      });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
      <div className="flex md:col-span-2 items-center">
        {menu.map((val, index) => (
          <Fragment key={index}>
            <div
              className={`pr-4 pb-4 ${
                filterActive(val.name, query.status_like)
                  ? "border-b-4 border-green-deep text-green-deep"
                  : ""
              }`}
            >
              <button onClick={() => statusFilter(val.name)}>{val.name}</button>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="flex-auto pb-4">
        <div className="flex items-center justify-start float-right gap-4">
          <input
            type="text"
            className="p-1 px-2 border-none"
            placeholder="Search Owner"
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          />
          <button onClick={handleSearch}>
            <Search2LineIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

function RowNavbar({ item }: any) {
  return (
    <>
      <div
        className={`pr-4 pb-4 ${
          true ? "border-b-4 border-green-deep text-green-deep" : ""
        }`}
      >
        <button>{item.name}</button>
      </div>
    </>
  );
}

export default PfrNavbar;
