import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import Input from "@/components/Forms/Input";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

const GroupRecommendation = () => {
  let groupName: any = localStorage.getItem("group_name");

  let {showDetailData} = useNavigationSection();

  const showDetail = () => {
    showDetailData(92);
  };

  const saveData = (params: any) => {
    showDetailData(params);
  };

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
