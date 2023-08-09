import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import TextArea from "@/components/Forms/TextArea";
import { Menu, Transition } from "@headlessui/react";
import React, {useState, useEffect, Fragment} from 'react'
import ArrowDropDownLineIcon from "remixicon-react/ArrowDropDownLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import dynamic from "next/dynamic";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAnalysisRecommendation } from "@/store/epfrPage/createData/analysisRecommendation";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

interface Props {
  id?: any;
  pfrType?: number;
}

const AnalysisRecommendation = (props: Props) => {
  let {
    section9,
    setParent
  } = useAnalysisRecommendation();

  const [editorData, setEditor] = useState({
    overView1: EditorState.createEmpty(),
    overView2: EditorState.createEmpty(),
    reasonForBenefit: EditorState.createEmpty(),
    reasonForRisk: EditorState.createEmpty(),
    reasonForDeviation: EditorState.createEmpty()
  });

  const [dataGroup, setGroup] = useState();

  const handleOverView1 = (editorState: any) => {
    setEditor({...editorData,overView1: editorState});
    setParent('overView1', draftToHtml(convertToRaw(editorData.overView1.getCurrentContent())));
  };

  const handleOverView2 = (editorState: any) => {
    setEditor({...editorData,overView2: editorState});
    setParent('overView2', draftToHtml(convertToRaw(editorData.overView2.getCurrentContent())));
  };

  const handleReasonBenefit = (editorState: any) => {
    setEditor({...editorData,reasonForBenefit: editorState});
    setParent('reasonForBenefit', draftToHtml(convertToRaw(editorData.reasonForBenefit.getCurrentContent())));
  };

  const handleReasonRisk = (editorState: any) => {
    setEditor({...editorData,reasonForRisk: editorState});
    setParent('reasonForRisk', draftToHtml(convertToRaw(editorData.reasonForRisk.getCurrentContent())));
  };

  const handleReasonDeviation = (editorState: any) => {
    setEditor({...editorData,reasonForDeviation: editorState});
    setParent('reasonForDeviation', draftToHtml(convertToRaw(editorData.reasonForDeviation.getCurrentContent())));
  };

  let { showDetailData } = useNavigationSection();
  const showDetail = (params: any, data: any) => {
    localStorage.setItem("s9_PfrId", '10623');
    localStorage.setItem("s9_dataGroup", '0');
    localStorage.setItem("group_name", params);

    showDetailData(91);
  };
  const saveData = (params: any) => {
    showDetailData(params);
  };

  const scrollPosition = useScrollPosition(9)

  useEffect(() => {  
    console.log('section9', section9);
    localStorage.setItem("section9", JSON.stringify(section9));
  }, [section9]);

  return (
    <div id={props.id}>
      <div id="section-header-9" className={`sticky top-0 z-10 ${scrollPosition === "okSec9" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec9" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 9. Analysis & Recommendation{" "}
        </HeadingPrimarySection>
      </div>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.1 Client Overview
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            {`1) Client's situation(s), consideration(s), objective(s),
            concern(s), medical condition(s), shortfall amount($), where
            applicable*`}
          </TextThin>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.overView1} 
            onEditorStateChange={handleOverView1}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />

          {/* <TextArea defaultValue="text here" rows={5} /> */}
        </RowSingleGrid>

        <RowSingleGrid>
          <TextThin>
            {`2) Client's investment objectives, investment time horizon,
            investment risk profile, where applicable *`}
          </TextThin>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.overView2} 
            onEditorStateChange={handleOverView2}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />
          {/* <TextArea defaultValue="text here" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.2 Plans Recommendation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {/* Button Add Group */}
        <RowSingleGrid>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-fit items-center justify-center gap-x-1.5 rounded-xl bg-green-deep px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-deep">
                ADD GROUP
                <ArrowDropDownLineIcon />
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
              <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Protection", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Protection
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Term", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Term
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Protection 2", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Protection 2
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </RowSingleGrid>
        {/* Payor Budget */}
        <RowSingleGrid>
          <TextSmall>Payor Budget</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    Cash
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFOA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFSA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPF Medisave
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    SRS
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">Client 1</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        {/* Total By Client Choice */}
        <RowSingleGrid>
          <TextSmall>Total by Client Choice</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    Cash
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFOA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFSA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPF Medisave
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    SRS
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">Client 1</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Remaining Budget */}
        <RowSingleGrid>
          <TextSmall>Remaining Budget</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    Cash
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFOA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFSA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPF Medisave
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    SRS
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">Client 1</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                  <td className="px-2 py-5 text-center">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Group List */}
        <RowSingleGrid>
          <TextSmall>Group List</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Group Name</th>
                  <th className="px-2 py-5">Total Product(s)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Protection</td>
                  <td className="px-2 py-5">5</td>
                  <td className="w-1/12 px-2 py-5">
                    <div className="flex w-full gap-2">
                      <ButtonBox className="text-green-deep">
                        <PencilLineIcon size={14} />
                      </ButtonBox>
                      <ButtonBox className="text-red">
                        <CloseLineIcon size={14} />
                      </ButtonBox>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Recommended Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Name of Plan(s) / Rider(s)</th>
                  <th className="px-2 py-5">Policy Term</th>
                  <th className="px-2 py-5">Sum Assured</th>
                  <th className="px-2 py-5">Premium Type</th>
                  <th className="px-2 py-5">Premium ($)</th>
                  <th className="px-2 py-5">Premium Frequency</th>
                  <th className="px-2 py-5">Name of Owner / Insured</th>
                  <th className="px-2 py-5">Client Choice</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Ilp Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Name of Plan(s) / Rider(s)</th>
                  <th className="px-2 py-5">Policy Term</th>
                  <th className="px-2 py-5">Sum Assured</th>
                  <th className="px-2 py-5">Premium Type</th>
                  <th className="px-2 py-5">Premium ($)</th>
                  <th className="px-2 py-5">Premium Frequency</th>
                  <th className="px-2 py-5">Name of Owner / Insured</th>
                  <th className="px-2 py-5">Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product(s)/Rider(s) Name</th>
                  <th className="px-2 py-5">Feature</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="w-1/2 px-2 py-5">
                    {`Singlife Savvy Invest is a whole life, regular premium
                    investment-linked plan (ILP) that provides investment
                    opportunities as well as protection against death and
                    terminal illness. This plan offers a welcome bonus to help
                    boost the policyholder’s initial investment value and it
                    also rewards the policyholder with a loyalty bonus along the
                    policy term. At a life stage event, the policyholder can
                    also make a penalty-free withdrawal from the policy up to a
                    limit.`}
                  </td>
                  <td className="px-2 py-5">Protection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.3 Reason For Recommendation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm font-normal">
          {`1) State how the plan meets client's need(s)`}
          <br />
          {`2) State and explain features and benefits relating to the product(s)`}
          sold
          <br />
          {`3) Affordability, consideration before investing (where applicable),`}
          remaining shortfall (if any)
        </RowSingleGrid>
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product Name</th>
                  <th className="px-2 py-5">Benefit Name</th>
                  <th className="w-1/5 px-2 py-5">Benefit Content</th>
                  <th className="px-2 py-5">Main Product/Rider</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="px-2 py-5">Minimum Investment Period</td>
                  <td className="px-2 py-5">
                    {`There are two variations of minimum investment period
                    available under this plan: (a) Fixed; and (b) Flexible. Both
                    the Fixed and Flexible options offer a range of different
                    durations that the policyholder can choose from, depending
                    on his/her preferred commitment period. Please refer to the
                    policy contract for more information.`}
                  </td>
                  <td className="px-2 py-5">-</td>
                  <td className="px-2 py-5">Group One</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForBenefit} 
            onEditorStateChange={handleReasonBenefit}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.4 Risk / Limitation of Plan
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm">
          {`1) State any possible risks relating to the product(s) sold`}
          <br />
          {`2) State possible disadvantage(s) based on circumstances of client`}
        </RowSingleGrid>
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product Name</th>
                  <th className="px-2 py-5">Risk Name</th>
                  <th className="w-1/5 px-2 py-5">Risk Content</th>
                  <th className="px-2 py-5">Main Product/Rider</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="px-2 py-5">Minimum Investment Period</td>
                  <td className="px-2 py-5">
                    {`There are two variations of minimum investment period
                    available under this plan: (a) Fixed; and (b) Flexible. Both
                    the Fixed and Flexible options offer a range of different
                    durations that the policyholder can choose from, depending
                    on his/her preferred commitment period. Please refer to the
                    policy contract for more information.`}
                  </td>
                  <td className="px-2 py-5">-</td>
                  <td className="px-2 py-5">Group One</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForRisk} 
            onEditorStateChange={handleReasonRisk}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.5 Reason For Deviation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm font-normal text-gray-light">
          {`1) Reasons for any deviation from client's profile , objectives and/or Representative's recommendations (where applicable)`}
          <br />
          {`- Premiums are more than Client's budget`}
          <br />
          {`- Funds recommended (e.g ILP sub-fund, par, fund) are of a higher risk than client's risk preference`}
          <br />
          {`- Client's choice of product(s)/fund(s) differs from Representative's recommended plan(s)/funds`}
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForDeviation} 
            onEditorStateChange={handleReasonDeviation}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(10)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default AnalysisRecommendation;
