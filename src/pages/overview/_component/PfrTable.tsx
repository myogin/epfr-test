import SmallBadges from "@/components/Attributes/Badges/SmallBadges";
import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";
import { useDetailDataEpfr } from "@/store/epfrPage/detailData";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import ArrowDropDownLineIcon from "remixicon-react/ArrowDropDownLineIcon";
import More2LineIcon from "remixicon-react/More2LineIcon";
import { wait } from "../overviewService";

interface Props {
  subMenu?: any;
}

const PfrTable = async (props: Props) => {
  let dataEpfr: Array<any> = datas(props.subMenu);
  await wait(200);
  let elementHeader: any;
  switch (props.subMenu) {
    case 1:
      elementHeader = (
        <>
          <div className="basis-1/12">Method</div>
          <div className="basis-1/4">EPFR Progress</div>
        </>
      );
      break;
    case 2:
      elementHeader = (
        <>
          <div className="basis-1/4">Signing Status</div>
        </>
      );
      break;

    case 3:
      elementHeader = <div className="basis-1/4"></div>;
      break;

    default:
      elementHeader = (
        <>
          <div className="basis-1/12">Method</div>
          <div className="basis-1/4">EPFR Progress</div>
        </>
      );
      break;
  }

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between py-6 mx-8 text-sm font-bold text-gray-light">
        <div className="basis-1/12">Type</div>
        <div className="basis-1/5">Owner</div>
        <div className="basis-1/5">Clients</div>
        <div className="basis-1/6">Created At</div>
        {elementHeader}
        <div className="basis-1/12"></div>
      </div>
      {dataEpfr.map((val, index) => (
        <RowData item={val} key={index} />
      ))}
      <div className="flex items-center justify-between py-6 mx-8">
        <div>
          <ButtonBorder>Previous</ButtonBorder>
        </div>
        <div>Page 1 of 10</div>
        <div>
          <ButtonBorder>Next</ButtonBorder>
        </div>
      </div>
    </div>
  );
};

function RowData({ item }: any) {
  // let showDetailData = useDetailDataEpfr((state) => state.showDetailData);

  // const showDetail = () => {
  //   console.log("test masuk gak");
  //   showDetailData(item.id);
  // };

  return (
    <div className="flex flex-row justify-between py-6 mx-8 text-sm border-b hover:px-8 hover:mx-0 hover:border-green-deep hover:bg-green-soft text-gray-light border-gray-soft-light">
      <div className="basis-1/12">{item.type}</div>
      <div className="basis-1/5">{item.owner}</div>
      <div className="basis-1/5">{item.client}</div>
      <div className="basis-1/6">{item.createdAt}</div>
      {item.singingStatus ? (
        <div className="basis-1/4">Test Singing Status</div>
      ) : (
        ""
      )}
      {item.completeStatus ? (
        <div className="basis-1/4">{item.completeStatus}</div>
      ) : (
        ""
      )}
      {item.method ? <div className="basis-1/12">{item.method}</div> : ""}
      {item.progress ? (
        <div className="basis-1/4">
          <div className="flex items-center justify-start gap-3">
            <div className="basis-2/3">
              <div className="w-full rounded-full bg-gray-soft-light">
                <div
                  className={`${
                    item.progress == "100%" ? "bg-green-deep" : "bg-red"
                  } text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`}
                  style={{ width: item.progress }}
                >
                  {" "}
                  {item.progress}
                </div>
              </div>
            </div>

            <div
              className={`basis-1/3 ${
                item.progress == "100%" ? "text-green-deep" : "text-red"
              }`}
            >
              {item.stepProgress}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="text-right basis-1/12">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center text-sm font-semibold w-fit rounded-xl">
              <More2LineIcon />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active
                          ? "bg-gray-soft-light text-gray-light"
                          : "text-gray-light",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active
                          ? "bg-gray-soft-light text-gray-light"
                          : "text-gray-light",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      Duplicate
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active
                          ? "bg-gray-soft-light text-gray-light"
                          : "text-gray-light",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      View Status
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function datas(params: any) {
  let dataEpfr: Array<any> = [];

  switch (params) {
    case 1:
      dataEpfr = [
        {
          id: 1,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Ellen Wang",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
        {
          id: 2,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Juniper",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 4",
          progress: "45%",
        },
        {
          id: 3,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Julian",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 6",
          progress: "50%",
        },
        {
          id: 4,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Adrach",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
        {
          id: 5,
          type: "Single",
          owner: "Selena",
          client: "Gomez",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 7",
          progress: "65%",
        },
        {
          id: 6,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 9",
          progress: "70%",
        },
        {
          id: 7,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 11",
          progress: "80%",
        },
        {
          id: 8,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
      ];
      break;
    case 2:
      dataEpfr = [
        {
          id: 1,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Ellen Wang",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 2,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Juniper",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 3,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Julian",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 4,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Adrach",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 5,
          type: "Single",
          owner: "Selena",
          client: "Gomez",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 6,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 7,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
        {
          id: 8,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          singingStatus: "singpass",
        },
      ];
      break;
    case 3:
      dataEpfr = [
        {
          id: 1,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Ellen Wang",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 2,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Juniper",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 3,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Julian",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 4,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Adrach",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 5,
          type: "Single",
          owner: "Selena",
          client: "Gomez",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 6,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 7,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
        {
          id: 8,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          completeStatus: "Create Submission From This EPFR",
        },
      ];
      break;
    default:
      dataEpfr = [
        {
          id: 1,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Ellen Wang",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
        {
          id: 2,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Juniper",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 4",
          progress: "45%",
        },
        {
          id: 3,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Julian",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 6",
          progress: "50%",
        },
        {
          id: 4,
          type: "Single",
          owner: "Ellen Wilson",
          client: "Adrach",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
        {
          id: 5,
          type: "Single",
          owner: "Selena",
          client: "Gomez",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 7",
          progress: "65%",
        },
        {
          id: 6,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 9",
          progress: "70%",
        },
        {
          id: 7,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 11",
          progress: "80%",
        },
        {
          id: 8,
          type: "Single",
          owner: "Selena",
          client: "Ellen Wilson",
          createdAt: "1 Jan 2023",
          method: "singpass",
          stepProgress: "Section 12",
          progress: "100%",
        },
      ];
      break;
  }

  return dataEpfr;
}

export default PfrTable;
