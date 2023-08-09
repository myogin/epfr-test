import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import TextArea from "@/components/Forms/TextArea";
import Toggle from "@/components/Forms/Toggle";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import React, { useEffect, useState } from "react";
import CpfPortofolio from "./Cpf/CpfPortofolio";
import InsurancePortofolio from "./Insurance/InsurancePortofolio";
import InvestmentPortofolio from "./Investment/InvestmentPortofolio";
import LoanPortofolio from "./Loan/LoanPortofolio";
import PropertyPortofolio from "./Property/PropertyPortofolio";
import SavingPortofolio from "./Saving/SavingPortofolio";
import SrsPortofolio from "./Srs/SrsPortofolio";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { postPfrSections } from "@/services/pfrService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";

interface Props {
  id?: any;
  pfrType?: number;
}

const ExistingPortofolio = (props: Props) => {
  let id = usePersonalInformation((state) => state.id);

  let editableStatus = useExistingPortofolio((state) => state.editableStatus);
  let status = useExistingPortofolio((state) => state.status);
  let need = useExistingPortofolio((state) => state.need);
  let reason = useExistingPortofolio((state) => state.reason);
  let summaryOfProperty = useExistingPortofolio(
    (state) => state.summaryOfProperty
  );
  let summaryOfInvestment = useExistingPortofolio(
    (state) => state.summaryOfInvestment
  );
  let summaryOfSavings = useExistingPortofolio(
    (state) => state.summaryOfSavings
  );
  let summaryOfInsurance = useExistingPortofolio(
    (state) => state.summaryOfInsurance
  );
  let summaryOfInsurance2 = useExistingPortofolio(
    (state) => state.summaryOfInsurance2
  );
  let summaryOfLoans = useExistingPortofolio((state) => state.summaryOfLoans);
  let summaryOfCPF = useExistingPortofolio((state) => state.summaryOfCPF);
  let summaryOfSRS = useExistingPortofolio((state) => state.summaryOfSRS);
  let setToggle = useExistingPortofolio((state) => state.setToggle);
  let setGlobal = useExistingPortofolio((state) => state.setGlobal);

  const [saveLoading, setSaveLoading] = useState(false);

  const handleToggle = (object: string, clientType: number, value: boolean) => {
    setToggle(object, clientType, "editting", value);
  };

  const [totalNetWorth, setTotalNetWorth] = useState<any>(0);

  const scrollPosition = useScrollPosition(2);
  const scrollPositionBottom = useScrollPositionBottom(2);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setGlobal(name, value);
  };

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section2")
        ? localStorage.getItem("section2")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(2, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        if (id === 0 || id === null || id === undefined) {
          setGlobal("id", storeDataSection.data.pfrId);
        } else {
          setGlobal("id", id);
        }
        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  useEffect(() => {
    if (scrollPositionBottom === "Process2") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now");
        storeData();
      } else {
        console.log("Your data not complete Section 2");
      }
    }
  }, [scrollPositionBottom, editableStatus, status]);

  return (
    <div id={props.id}>
      <div
        id="section-header-2"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec2" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec2"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 2. Existing Portfolio
        </HeadingPrimarySection>
      </div>
      {need ? (
        <>
          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.1 Summary of Property(ies)</h2>
            <Toggle
              isChecked={summaryOfProperty[0].editting}
              toggleName={
                summaryOfProperty[0].editting ? "Review" : "Not Review"
              }
              onChange={() =>
                handleToggle(
                  "summaryOfProperty",
                  0,
                  !summaryOfProperty[0].editting
                )
              }
            />
            {/* <Toggle /> */}
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfProperty[0].editting ? <PropertyPortofolio /> : null}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.2 Summary of Investment(s)</h2>
            <Toggle
              isChecked={summaryOfInvestment[0].editting}
              toggleName={
                summaryOfInvestment[0].editting ? "Review" : "Not Review"
              }
              onChange={() =>
                handleToggle(
                  "summaryOfInvestment",
                  0,
                  !summaryOfInvestment[0].editting
                )
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfInvestment[0].editting ? <InvestmentPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.3 Summary of Saving(s)</h2>
            <Toggle
              isChecked={summaryOfSavings[0].editting}
              toggleName={
                summaryOfSavings[0].editting ? "Review" : "Not Review"
              }
              onChange={() =>
                handleToggle(
                  "summaryOfSavings",
                  0,
                  !summaryOfSavings[0].editting
                )
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfSavings[0].editting ? <SavingPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.4 Summary of CPF</h2>
            <Toggle
              isChecked={summaryOfCPF[0].editting}
              toggleName={summaryOfCPF[0].editting ? "Review" : "Not Review"}
              onChange={() =>
                handleToggle("summaryOfCPF", 0, !summaryOfCPF[0].editting)
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfCPF[0].editting ? <CpfPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.5 Summary of Insurance(s)</h2>
            <Toggle
              isChecked={summaryOfInsurance[0].editting}
              toggleName={
                summaryOfInsurance[0].editting ? "Review" : "Not Review"
              }
              onChange={() =>
                handleToggle(
                  "summaryOfInsurance",
                  0,
                  !summaryOfInsurance[0].editting
                )
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfInsurance[0].editting ? <InsurancePortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">
              2.6 Supplementary Retirement Scheme (SRS)
            </h2>
            <Toggle
              isChecked={summaryOfSRS[0].editting}
              toggleName={summaryOfSRS[0].editting ? "Review" : "Not Review"}
              onChange={() =>
                handleToggle("summaryOfSRS", 0, !summaryOfSRS[0].editting)
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfSRS[0].editting ? <SrsPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">
              2.7 Summary of Loan (Excluding Property Loan)
            </h2>
            <Toggle
              isChecked={summaryOfLoans[0].editting}
              toggleName={summaryOfLoans[0].editting ? "Review" : "Not Review"}
              onChange={() =>
                handleToggle("summaryOfLoans", 0, !summaryOfLoans[0].editting)
              }
            />
          </HeadingSecondarySectionDoubleGrid>

          {summaryOfLoans[0].editting ? <LoanPortofolio /> : ""}
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            isChecked={need}
            onChange={() => setGlobal("need", !need)}
            lableStyle="text-sm font-normal text-gray-light"
            label=" Would you like your assets and liabilities to be taken into consideration for the Needs Analysis and Recommendation(s)?"
            needValidation={true}
            textError={`Need portfolio at least ${need}`}
            logic={
              (need &&
                (summaryOfProperty[0].editting ||
                  summaryOfInvestment[0].editting ||
                  summaryOfSavings[0].editting ||
                  summaryOfCPF[0].editting ||
                  summaryOfInsurance[0].editting ||
                  summaryOfSRS[0].editting ||
                  summaryOfLoans[0].editting)) ||
              !need
                ? true
                : false
            }
          />
        </RowSingle>
        {!need ? (
          <>
            <RowSingle className="my-10">
              <TextArea
                name="reason"
                handleChange={handleInputChange}
                label="The Reason"
                defaultValue={reason}
                needValidation={true}
                logic={!need ? false : true}
              />
            </RowSingle>
            <RowDoubleGrid>
              <div>
                <Input
                  value={totalNetWorth}
                  handleChange={(event) => setTotalNetWorth(event.target.value)}
                  label="Total Net Worth"
                  className="my-4"
                />
              </div>

              {totalNetWorth == 0 ? (
                <div>
                  <TextArea
                    className="my-4"
                    label="Reason is needed if Net Worth ≤ $0"
                    rows={1}
                    defaultValue="text the reason"
                    needValidation={true}
                    logic={!need ? false : true}
                  />
                </div>
              ) : (
                ""
              )}
            </RowDoubleGrid>
          </>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      {editableStatus === 2 && status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 2" />
      ) : (
        ""
      )}
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default ExistingPortofolio;
