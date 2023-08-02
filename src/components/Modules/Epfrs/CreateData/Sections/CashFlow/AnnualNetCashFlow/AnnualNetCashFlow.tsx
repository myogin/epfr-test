import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import TextArea from "@/components/Forms/TextArea";
import { getLength } from "@/libs/helper";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import React, { Fragment, useState } from "react";

interface Props {
  pfrType?: any;
}

const AnnualNetCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let getPfrLength = getLength(props.pfrType);

  let [annualData, setAnnualData] = useState([0, 0]);
  let [monthlyData, setMonthlyData] = useState([0, 0]);

  let { need, data, setAnnualSurplus, setReasonSurplus } = useCashFlow();

  const handleReason = (event: any) => {
    console.log(event.target);
    const { name, value, defaultValue } = event.target;
    const { groupdata, indexclient } = event.target.dataset;

    if (name == "annualSurplus") {
      if (groupdata === "annualy") {
        const newArray = [...annualData];
        newArray[indexclient] = value;

        const newArrayMonthly = [...monthlyData];
        newArrayMonthly[indexclient] = value / 12;

        setAnnualData(newArray);
        setMonthlyData(newArrayMonthly);

        setAnnualSurplus(indexclient, value);
      } else {
        const newArray = [...monthlyData];
        newArray[indexclient] = value;

        const newArrayAnnualy = [...annualData];
        newArrayAnnualy[indexclient] = value * 12;

        setAnnualData(newArrayAnnualy);
        setMonthlyData(newArray);

        setAnnualSurplus(indexclient, value * 12);
      }
    } else {
      setReasonSurplus(indexclient, value);
    }
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div className={`col-span-3`}></div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <Fragment key={"sasa" + index}>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </Fragment>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div className={`col-span-3`}>
          <TextSmall className="text-green-deep">
            ANNUAL SURPLUS / SHORTFALL
          </TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((dataB, index) => (
            <Fragment key={"asas" + index}>
              {need ? (
                need[index] ? (
                  <>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      dataType="monthly"
                      className="my-4"
                      type="text"
                      indexClient={index}
                      name="annualSurplus"
                      formStyle="text-right"
                      value={
                        monthlyData[index] > 0
                          ? monthlyData[index]
                          : data[index]
                          ? data[index].annualSurplus.annualSurplus / 12
                          : 0
                      }
                      handleChange={handleReason}
                    />
                    <Input
                      dataType="annualy"
                      className="my-4"
                      type="text"
                      indexClient={index}
                      name="annualSurplus"
                      formStyle="text-right"
                      value={
                        annualData[index] > 0
                          ? annualData[index]
                          : data[index]
                          ? data[index].annualSurplus.annualSurplus
                          : 0
                      }
                      handleChange={handleReason}
                    />
                  </>
                )
              ) : (
                <>
                  <div className="text-right">
                    <span className="text-green-deep">-</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-deep">-</span>
                  </div>
                </>
              )}
            </Fragment>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        {props.pfrType > 1 ? <div className={`col-span-3`}></div> : null}

        {getPfrLength?.length &&
          getPfrLength.map((dataB, index) => data[index].annualSurplus.annualSurplus === 0 ? (
            <Fragment key={"sasa" + index}>
              <div className={`${props.pfrType > 1 ? "col-span-2" : ""}`}>
                <TextArea
                  className="my-4"
                  name="reasonForSurplus"
                  label="Reason is needed if Surplus Is ≤ $0"
                  defaultValue={data[index].reasonForSurplus}
                  indexClient={index}
                  handleChange={handleReason}
                />
              </div>
            </Fragment>
          ) : (""))}
      </RowDinamycGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualNetCashFlow;
