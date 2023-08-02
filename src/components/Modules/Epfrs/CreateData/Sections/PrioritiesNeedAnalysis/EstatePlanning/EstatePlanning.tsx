import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import React, { useState } from "react";
import Toggle from "@/components/Forms/Toggle";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";
import Select from "@/components/Forms/Select";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import AddBoxFillIcon from "remixicon-react/AddBoxFillIcon";
import { getLength } from "@/libs/helper";

interface Props {
  datas?: Array<any>;
  pfrType: number;
}

const EstatePlanning = (props: Props) => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
    addChildFund,
    removeChildFund,
    setChildFund,
  } = usePrioritiesNeedAnalysis();

  let planningWritten: Array<any> = [
    { id: "Yes", name: "Yes" },
    { id: "No", name: "No" },
  ];

  let planningDependants: Array<any> = [
    { id: "Yes", name: "Yes" },
    { id: "No", name: "No" },
  ];

  let planningAttorney: Array<any> = [
    { id: "Yes", name: "Yes" },
    { id: "No", name: "No" },
  ];

  let planningNomination: Array<any> = [
    { id: "Yes", name: "Yes" },
    { id: "No", name: "No" },
  ];

  let planningSection: Array<any> = [
    { id: "Yes", name: "Yes" },
    { id: "No", name: "No" },
  ];

  let getPfrLength = getLength(props.pfrType);

  // Total Data Client & Deoendants
  let total = props.pfrType;
  var totalClient = [];
  var totalChildFund = [];
  var totalDependant = [];

  for (var i = 0; i < section7.typeClient; i++) {
    totalClient.push(i);
  }

  for (var i = 0; i < section7.totalDependant; i++) {
    totalDependant.push(i);
  }

  // Handle Checkbox Client & Dependant
  const handleClient = (value: any, i: any, dataI: any) => {
    setNeed(value, i, dataI);
  };

  // Set Client Data
  const setDataClient = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setClient(value, i, name, groupdata);
  };

  // Additional Note
  const handleAdditional = (e: any) => {
    const { name, value } = e.target;
    setAdditional(value, 10, name);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-gray-light">
                ESTATE PLANNING
              </TextSmall>
            </td>
            {total > 1
              ? getPfrLength.map((data, i) => (
                  <td key={"sd" + i} className={``}>
                    <div className="text-right text-green-deep">
                      Client {i + 1}{" "}
                    </div>
                    <div
                      className="items-center justify-start gap-2 mb-10 text-right"
                      id={`custome-checkbox-${i}`}
                    >
                      <div className="items-start justify-start gap-4">
                        <input
                          type="checkbox"
                          checked={section7.answer.need.client[i][10]}
                          onChange={(event) =>
                            handleClient(
                              !section7.answer.need.client[i][10],
                              i,
                              10
                            )
                          }
                          className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                        />
                        <span className={``}> Review</span>
                      </div>
                    </div>
                  </td>
                ))
              : ""}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Do you have a Will written?
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Select
                  className="mb-10"
                  name="willWritten"
                  dataType="estatePlaning"
                  value={
                    section7.answer.clientData[i].estatePlaning.willWritten
                  }
                  datas={planningWritten}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                When was it last updated?
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="date"
                  placeholder="date"
                  name="lastUpdated"
                  dataType="estatePlaning"
                  value={
                    section7.answer.clientData[i].estatePlaning.lastUpdated
                  }
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                {`Were there any Provisions made for Special Needs Dependant's?`}
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Select
                  className="mb-10"
                  name="anyProvision"
                  dataType="estatePlaning"
                  value={
                    section7.answer.clientData[i].estatePlaning.anyProvision
                  }
                  datas={planningDependants}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Have you given a Lasting Power Attorney?
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Select
                  className="mb-10"
                  name="haveLastingPowerOfAttorney"
                  dataType="estatePlaning"
                  value={
                    section7.answer.clientData[i].estatePlaning
                      .haveLastingPowerOfAttorney
                  }
                  datas={planningAttorney}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Have you done your CPF nomination?
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Select
                  className="mb-10"
                  name="doneYourCPFNomination"
                  dataType="estatePlaning"
                  value={
                    section7.answer.clientData[i].estatePlaning
                      .doneYourCPFNomination
                  }
                  datas={planningNomination}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Have you named any beneficiaries under Section 49M / 49L?
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sd" + i} className={``}>
                <Select
                  className="mb-10"
                  name="anyBenefit"
                  dataType="estatePlaning"
                  value={section7.answer.clientData[i].estatePlaning.anyBenefit}
                  datas={planningSection}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={total}>
              <TextSmall className="text-gray-light">
                Additional Notes
              </TextSmall>
            </td>
          </tr>
          <tr>
            <td colSpan={total + 1}>
              <Input
                formStyle="text-right"
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                name="note"
                value={section7.additionalNote[10].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default EstatePlanning;
