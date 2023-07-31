import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";

import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState, useEffect } from "react";
import { useAnalysisRecommendationGroup } from "@/store/epfrPage/createData/analysisRecommendationGroup";

// Service
import {getPfr, getRecommendationGroup, pfrSection} from "@/services/pfrService";
import {getAllCompany} from "@/services/companyService";
import {productFindOne} from "@/services/productService";
// import {getPfrSection} from "@/services/getPfrSection";

import AddLineIcon from "remixicon-react/AddLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";


const GroupRecommendation = () => {
  let {
    section9RecommendGroup
  } = useAnalysisRecommendationGroup();

  let groupName: any = localStorage.getItem("group_name");

  let {showDetailData} = useNavigationSection();

  const showDetail = () => {
    showDetailData(92);
  };

  const saveData = (params: any) => {
    showDetailData(params);
  };

  // Code
  useEffect(() => {
    const pfrId = localStorage.getItem("s9_PfrId");
    const pfrGroupId = localStorage.getItem("s9_dataGroup");
    console.log('pfrGroupId', pfrGroupId)
    // Find Pfr 
    getPfr(10653).then((data:any) => {
        console.log('getPfr', data)
    })    

    // Find Group Recommend
    getRecommendationGroup(10653, pfrGroupId).then((data: any) => {
        console.log('getRecommendationGroup', data)
    });

    // FInd Pfr Section 8
    pfrSection(8, 10653).then((data: any) => {
        console.log('pfrSection', data)
    });

    // FInd Pfr Section 9
    pfrSection(8, 10653).then((data: any) => {
        console.log('pfrSection', data)
    });
  }, [section9RecommendGroup]);

  return (
    <>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
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

        {/* Button Add Group */}
        <RowSingleGrid>
          <TextSmall>Product(s) / Rider(s)</TextSmall>
          <ButtonBox className="text-green-deep" onClick={showDetail}>
            <AddLineIcon />
          </ButtonBox>
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
          <TextSmall>Group Name</TextSmall>
          <div>
            <Input value={groupName} readonly={true} />
          </div>
        </RowSingleGrid>
      </SectionCardSingleGrid>

      <SectionCardFooter className="mx-8 2xl:mx-60">
        <ButtonGreenMedium onClick={() => saveData(9)}>Save</ButtonGreenMedium>
        <ButtonRedMedium>Cancel</ButtonRedMedium>
      </SectionCardFooter>
    </>
  );
};

export default GroupRecommendation;
