import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import RowSixGrid from "@/components/Attributes/Rows/Grids/RowSixGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, {useEffect} from "react";
import { useAffordability } from "@/store/epfrPage/createData/affordability";
import { getLength } from "@/libs/helper";

interface Props {
  id?: any;
  pfrType?: number;
}

const Affordability = (props: Props) => {
  let {
    section8,
    setPayorDetail,
    setPayorBudget,
    setSourceOfWealth,
    setAssetOrSurplus
  } = useAffordability();

  let getPfrLength = getLength(props.pfrType);

  let fillInformation: Array<any> = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  let payorForClient: Array<any> = [
    { id: 0, name: "Self" },
    { id: 1, name: "Pay for other" },
  ];

  let payorDetails: Array<any> = [
    { id: 0, name: "Cash", annual: 0, single: 0 },
    { id: 1, name: "CPF OA", annual: 0, single: 0 },
    { id: 2, name: "CPF SA", annual: 0, single: 0 },
    { id: 3, name: "CPF Medisave", annual: 0, single: 0 },
    { id: 4, name: "SRS", annual: 0, single: 0 },
  ];

  let { showDetailData } = useNavigationSection();

  const dataPayorDetail = (data: any) => {
    var resData = [
      "Cash", 
      "CPF OA",
      "CPF SA",
      "CPF Medisave",
      "SRS"
    ];

    return resData[data];
  } 

  const handlePayorDetail = (event: any, key: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setPayorDetail(key, name, groupdata, value);
  };

  const checkboxPayorBudget = (event:any, key:any, index:any) => {
    const { name, value } = event.target;
    console.log('value', value)
    setPayorBudget(key, index, name, value);
  }

  const handleSourceOfWealth = (event: any, key: any) => {
    const { name, value } = event.target;
    setSourceOfWealth(key, name, value);
  };

  const handleAssetOrSurplus = (event: any, key: any) => {
    const { name, value } = event.target;
    setAssetOrSurplus(key, name, value);
  };

  useEffect(() => {  
    console.log('section8', section8);
    localStorage.setItem("section8", JSON.stringify(section8));
  }, [section8]);
  
  const scrollPosition = useScrollPosition(8);
  return (
    <div id={props.id}>
      <div
        id="section-header-8"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec8" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec8"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 8. Affordability
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          {section8.payorDetail.map(function(value:any, key:any){
            return (
              <div className="text-left space-y-11" key={"payor-detail-top-"+key}>
                <Select
                  className="my-4"
                  name="isSelf"
                  dataType="payorDetail"
                  datas={payorForClient}
                  value={value.isSelf}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  label={`Payor For Client ${key+1}`}
                />
              </div>
            );
          })}
        </RowDoubleGrid>
        
        <RowDoubleGrid>
          {section8.payorDetail.map(function(value:any, key:any){ 
              return (value.isSelf == 1) ? (
                  <div className="text-left space-y-11" key={"payor-detail-"+key}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder=""
                      name="relationShip"
                      dataType="payorDetail"
                      label={`PAYOR RELATIONSHIP TO CLIENT : ${key+1}`}
                      handleChange={(event) => handlePayorDetail(event, key)}
                      needValidation={true}
                      logic={(value.relationShip == "" || value.relationShip == null)  ? false : true}
                      value={value.relationShip}
                    />
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder=""
                      name="payorName"
                      dataType="payorDetail"
                      label={`PAYOR NAME :`}
                      handleChange={(event) => handlePayorDetail(event, key)}
                      needValidation={true}
                      logic={(value.payorName == "" || value.payorName == null)  ? false : true}
                      value={value.payorName}
                    />
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder=""
                      name="passportNo"
                      dataType="payorDetail"
                      label={`PAYOR NRIC / PASSPORT NUMBER :`}
                      handleChange={(event) => handlePayorDetail(event, key)}
                      needValidation={true}
                      logic={(value.passportNo == "" || value.passportNo == null)  ? false : true}
                      value={value.passportNo}
                    />
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder=""
                      name="occupation"
                      dataType="payorDetail"
                      label={`PAYOR OCCUPATION :`}
                      handleChange={(event) => handlePayorDetail(event, key)}
                      needValidation={true}
                      logic={(value.occupation == "" || value.occupation == null)  ? false : true}
                      value={value.occupation}
                    />
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder=""
                      name="payorIncome"
                      dataType="payorDetail"
                      label={`PAYOR ANNUAL INCOME RANGE (S$) :`}
                      handleChange={(event) => handlePayorDetail(event, key)}
                      needValidation={true}
                      logic={(value.payorIncome == "" || value.payorIncome == null)  ? false : true}
                      value={value.payorIncome}
                    />
                  </div>
              )
            : ''
          })}
        </RowDoubleGrid>
      </SectionCardSingleGrid>
      
      <SectionCardSingleGrid className="mx-8 2xl:mx-60" key={"part-2"}>
        <RowSingleGrid key={"row-1"}>
          <HeadingSecondarySection key={"heading-1"}>Payor Budget</HeadingSecondarySection>
        </RowSingleGrid>
        <RowSixGrid key={"row-six"}>
          <div></div>
          {payorDetails?.length && payorDetails.map((val, index) => (
            <div key={"payor-budget-top"+val.id} className="flex items-center justify-center text-sm font-normal">
            {val.name}
          </div>
          ))}
        </RowSixGrid>
        {section8.payorBudget.map(function(value:any, key:any){
          return (
            <RowSixGrid key={"payor-budget-top-data"+key}>
              <label className="text-sm font-bold" key={"client"+key}>Client {key+1}</label>
              {value?.length && value.map((val: any, index: any) => (
                <div key={"payor-budget-checkbox"+index} className="flex items-center justify-center">
                <input type="checkbox" name="selection" onChange={(event) => checkboxPayorBudget(event, key, index)} checked={value.selection}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              ))}
            </RowSixGrid>
          );
        })}
            
      </SectionCardSingleGrid>
        
      {section8.payorBudget.map(function(value:any, key:any){
        return (
          <SectionCardSingleGrid className="mx-8 2xl:mx-60" key={"payor-"+key}>
            <RowSingleGrid key={"reference"+key}>
              <h4 className="text-sm font-bold mb-9">
                References From Previous Sections Client {key+1}
              </h4>
            </RowSingleGrid>
            <RowTripleGrid className="mb-16" key={"total-annual"+key}>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Total Annual Income ($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Total Annual Expense ($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Annual Surplus / Shortfall ($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
            </RowTripleGrid>
            <RowTripleGrid key={"total-asset"+key}>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Total Asset($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Total Liabilities($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="text-center space-y-11">
                <div className="text-sm font-bold">Net Worth ($)</div>
                <div className="text-sm font-normal">0</div>
              </div>
            </RowTripleGrid>

            {/* Payor Details */}
            <RowSingleGrid>
              <RowSingleGrid>
                <HeadingSecondarySection>Payor Details</HeadingSecondarySection>
              </RowSingleGrid>
            </RowSingleGrid>
            <RowFourthGrid>
              <div></div>
              <div className="text-sm font-bold text-right">Annual ($)</div>
              <div className="text-sm font-bold text-right">Single ($)</div>
              <div className="text-sm font-bold text-right">Source of Fund</div>
            </RowFourthGrid>
            
            {value?.length && value.map((val: any, index: any) => (
              (val.selection === true) ? 
              <RowFourthGrid key={"payor-detail-"+key+"-"+index} className="items-center">
                <div key={`dataPayorDetail`+index}>
                  <TextSmall className="text-gray-light">{dataPayorDetail(index)}</TextSmall>
                </div>
                <div>
                  <Input
                    className="my-4"
                    type="text"
                    formStyle="text-right"
                    name="annual"
                    value={val.annual}
                    handleChange={(event) => checkboxPayorBudget(event, key, index)}
                  />
                </div>
                <div>
                  <Input
                    className="my-4"
                    type="text"
                    formStyle="text-right"
                    name="single"
                    value={val.single}
                    handleChange={(event) => checkboxPayorBudget(event, key, index)}
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <Checkbox lableStyle="text-sm font-normal" label="Past / Current Employment" name="sourceOfFund" onChange={(event) => checkboxPayorBudget(event, key, index)} isChecked={(val.sourceOfFund == 'Past / Current Employment')} value="Past / Current Employment"/>
                    </div>
                  <div className="mb-2">
                    <Checkbox lableStyle="text-sm font-normal" label="Investment" name="sourceOfFund" onChange={(event) => checkboxPayorBudget(event, key, index)} isChecked={(val.sourceOfFund == 'Investment')} value="Investment"/>
                    </div>
                  <div className="mb-2">
                    <Checkbox lableStyle="text-sm font-normal" label="Inheritance" name="sourceOfFund" onChange={(event) => checkboxPayorBudget(event, key, index)} isChecked={(val.sourceOfFund == 'Inheritance')} value="Inheritance"/>
                    </div>
                </div>
              </RowFourthGrid>
              : ''
            ))}     
          </SectionCardSingleGrid>
        );
      })}

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Source of Wealth
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div className={(section8.sourceOfWealth.length > 1) ? `grid grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2` : `grid grid-cols-1 gap-8 mb-5`}>
        {section8.sourceOfWealth.map(function(value:any, key:any){
          return (
            <div key={`sourceOfWealth`+key}>
              <TextSmall>Client {key+1}</TextSmall><br></br>
              <div className="flex items-center justify-start gap-4 text-sm font-normal text-gray-light">
                <div className="flex items-center justify-start gap-2" key={`employment`+key}>
                  <Checkbox label="Past / Current Employment" name="employment" onChange={(e) => handleSourceOfWealth(e, key)} isChecked={value.employment} value={value.employment}/>
                </div>
                <div className="flex items-center justify-start gap-2" key={`investment`+key}>
                  <Checkbox label="Investment" name="investment" onChange={(e) => handleSourceOfWealth(e, key)} isChecked={value.investment} value={value.investment}/>
                </div>
                <div className="flex items-center justify-start gap-2" key={`inheritance`+key}>
                  <Checkbox label="Inheritance" name="inheritance" onChange={(e) => handleSourceOfWealth(e, key)} isChecked={value.inheritance} value={value.inheritance}/>
                </div>
                <div className="flex items-center justify-start gap-2" key={`other`+key}>
                  <Checkbox label="Saving" name="other" onChange={(e) => handleSourceOfWealth(e, key)} isChecked={value.other} value={value.other}/>
                </div>
              </div>
              <br/>
              <div >
                <TextSmall>If other please specify</TextSmall>
                <TextArea className="my-4" name="otherExplain" defaultValue={value.otherExplain} handleChange={(e) => handleSourceOfWealth(e, key)} />
                <small>
                  To indicate source of wealth if transaction(s) is/are ≤ $150,000
                </small>
              </div>
            </div>
          );
        })}
        </div>
      </SectionCardSingleGrid>

      

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div key={`sourceOfWealthIndex`} className={(section8.sourceOfWealth.length > 1) ? 'grid grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2' : 'grid grid-cols-1 gap-8 mb-5'}>
        {section8.sourceOfWealth.map(function(value:any, key:any){
          return (
            <div className="" key={`SOW-1-`+key}>
              <TextThin>
                Is the budget set aside a substantial portion of The Payor’s assets
                or surplus?
              </TextThin>
              <Select
                className="my-4"
                datas={fillInformation}                
                dataType="assetOrSurplus"
                value={value.answer}
                name="answer"
                handleChange={(event) => handleAssetOrSurplus(event, key)}
              />
              <small className="text-sm italic font-normal">
                {`If the answer is "Yes", a potential risk of not being able to
                continue paying premiums in the future may occur. Budget is
                considered substantial if it is more than 50% of assets or surplus`}
              </small>
            </div>
          );
        })}
        </div>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default Affordability;
