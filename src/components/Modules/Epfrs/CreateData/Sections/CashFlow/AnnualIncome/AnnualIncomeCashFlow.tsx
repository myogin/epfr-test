import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import { checkCountData } from "@/libs/helper";
import { AnnualIncome, Datas } from "@/models/SectionThree";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  data?: any;
  pfrType?: number;
}

const AnnualIncomeCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let { data, setAnnualIncome, setAnnualSurplus } = useCashFlow();

  let [annualData, setAnnualData] = useState(0);
  let [monthlyData, setMonthlyData] = useState(0);

  let [annualWadgesData, setAnnualWadgesData] = useState(0);
  let [monthlyWadgesData, setMonthlyWadgesData] = useState(0);

  let [annualLessData, setAnnualLessData] = useState(0);
  let [monthlyLessData, setMonthlyLessData] = useState(0);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata } = event.target.dataset;

    switch (name) {
      case "annualGrossIncome":
        if (groupdata === "annualy") {
          setAnnualData(value);
          setMonthlyData(value / 12);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualData(value * 12);
          setMonthlyData(value);

          setAnnualIncome(0, name, value * 12);
        }

        break;
      case "additionalWages":
        if (groupdata === "annualy") {
          setMonthlyWadgesData(value / 12);
          setAnnualWadgesData(value);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualWadgesData(value * 12);
          setMonthlyWadgesData(value);

          setAnnualIncome(0, name, value * 12);
        }
        break;
      case "less":
        if (groupdata === "annualy") {
          setMonthlyLessData(value / 12);
          setAnnualLessData(value);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualLessData(value * 12);
          setMonthlyLessData(value);

          setAnnualIncome(0, name, value * 12);
        }
        break;
      default:
        if (groupdata === "annualy") {
          setMonthlyData(value / 12);
          setAnnualData(value);
        } else {
          setAnnualData(value * 12);
          setMonthlyData(value);
        }
        setAnnualIncome(0, name, annualData);
        break;
    }
  };

  const getNumber = () => {};

  const [other, setOther] = useState<any>(0);
  const [cpfContribution, setCpfContribution] = useState<any>(0);
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowTripleGrid>
        <div></div>
        {props.pfrType == 1 ? (
          <>
            <div className="text-sm font-bold text-right">Monthly</div>
            <div className="text-sm font-bold text-right">Annual</div>
          </>
        ) : (
          <>
            <div className="text-sm font-bold text-right">Monthly</div>
            <div className="text-sm font-bold text-right">Annual</div>
            <div className="text-sm font-bold text-right">Monthly</div>
            <div className="text-sm font-bold text-right">Annual</div>
          </>
        )}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">
            Annual Gross Income {annualData ? annualData : 0}
          </TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  name="annualGrossIncome"
                  value={
                    monthlyData > 0
                      ? monthlyData
                      : d.annualIncome.annualGrossIncome / 12
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  name="annualGrossIncome"
                  value={
                    annualData > 0
                      ? annualData
                      : d.annualIncome.annualGrossIncome
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Additional Wages</TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  name="additionalWages"
                  value={
                    monthlyWadgesData > 0
                      ? monthlyWadgesData
                      : d.annualIncome.additionalWages / 12
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  name="additionalWages"
                  value={
                    annualWadgesData > 0
                      ? annualWadgesData
                      : d.annualIncome.additionalWages
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div className="flex items-center justify-start">
          <TextSmall className="text-gray-light">Others</TextSmall>
          <ButtonBox className="text-green-deep">
            <AddLineIcon size={14} />
          </ButtonBox>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
                <Input
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  value={other}
                  handleChange={(event) => setOther(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  value={other}
                  handleChange={(event) => setOther(event.target.value)}
                />
              </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">
            Less Employee’s CPF Contribution
          </TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  type="text"
                  name="less"
                  formStyle="text-right"
                  value={
                    monthlyLessData > 0
                      ? monthlyLessData
                      : d.annualIncome.less / 12
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  type="text"
                  name="less"
                  formStyle="text-right"
                  value={
                    annualLessData > 0 ? annualLessData : d.annualIncome.less
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-green-deep">ANNUAL NET INCOME</TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
                <Input
                  className="my-4"
                  type="text"
                  formStyle="text-right text-green-deep"
                  value={cpfContribution}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  type="text"
                  formStyle="text-right text-green-deep"
                  value={cpfContribution}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
            </>
          ))}
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualIncomeCashFlow;
