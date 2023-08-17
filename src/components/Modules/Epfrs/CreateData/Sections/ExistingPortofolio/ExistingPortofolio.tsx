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
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { useRouter } from "next/router";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { useAffordabilityTemp } from "@/store/epfrPage/createData/affordabilityTemp";
import { getLength } from "@/libs/helper";
import LoaderPage from "./components/LoaderPage";

interface Props {
  id?: any;
  pfrType?: number;
}

const ExistingPortofolio = (props: Props) => {
  let id = usePersonalInformation((state) => state.id);
  let pfrLocal = usePfrData((state) => state.pfr);
  const router = useRouter();

  let getPfrLength = getLength(props.pfrType);

  let totalNetWorth = useExistingPortofolio((state) => state.totalNetWorth);
  let networthReason = useExistingPortofolio((state) => state.networthReason);
  let editableStatus = useExistingPortofolio((state) => state.editableStatus);
  let setNetWorth = useExistingPortofolio((state) => state.setNetWorth);
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

  let summaryOfLoans = useExistingPortofolio((state) => state.summaryOfLoans);
  let summaryOfCPF = useExistingPortofolio((state) => state.summaryOfCPF);
  let summaryOfSRS = useExistingPortofolio((state) => state.summaryOfSRS);

  let setToggle = useExistingPortofolio((state) => state.setToggle);
  let setGlobal = useExistingPortofolio((state) => state.setGlobal);
  let fetchProperty = useExistingPortofolio((state) => state.fetchProperty);
  let fetchInvestment = useExistingPortofolio((state) => state.fetchInvestment);
  let fetchSaving = useExistingPortofolio((state) => state.fetchSaving);
  let fetchCpf = useExistingPortofolio((state) => state.fetchCpf);
  let fetchInsurance = useExistingPortofolio((state) => state.fetchInsurance);
  let fetchInsurance2 = useExistingPortofolio((state) => state.fetchInsurance2);
  let fetchLoan = useExistingPortofolio((state) => state.fetchLoan);
  let fetchSrs = useExistingPortofolio((state) => state.fetchSrs);

  let resetProperty = useExistingPortofolio((state) => state.resetProperty);
  let resetInvestment = useExistingPortofolio((state) => state.resetInvestment);
  let resetSaving = useExistingPortofolio((state) => state.resetSaving);
  let resetCpf = useExistingPortofolio((state) => state.resetCpf);
  let resetInsurance = useExistingPortofolio((state) => state.resetInsurance);
  let resetInsurance2 = useExistingPortofolio((state) => state.resetInsurance2);
  let resetSrs = useExistingPortofolio((state) => state.resetSrs);
  let resetLoan = useExistingPortofolio((state) => state.resetLoan);

  let setGlobalSectionThree = useCashFlow((state) => state.setGlobal);
  let setAffordabilityTemp = useAffordabilityTemp((state) => state.setGlobal);
  let idSectionThree = useCashFlow((state) => state.id);

  const [saveLoading, setSaveLoading] = useState(false);

  const handleToggle = (object: string, clientType: number, value: boolean) => {
    setToggle(object, clientType, "editting", value);
  };

  const scrollPosition = useScrollPosition(2);
  const scrollPositionNext = useScrollPosition(3);
  const scrollPositionBottom = useScrollPositionBottom(1);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setGlobal(name, value);
  };

  const handleNetWorth = (event: any) => {
    const { name, value } = event.target;
    const { indexclient } = event.target.dataset;

    setNetWorth(name, indexclient, value);
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
        if (
          idSectionThree === 0 ||
          idSectionThree === null ||
          idSectionThree === undefined
        ) {
          setGlobalSectionThree("id", storeDataSection.data.pfrId);
        } else {
          setGlobalSectionThree("id", id);
        }
        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  const [loading, setLoading] = useState(false);

  let gate2 = usePfrData((state) => state.pfr.gate2)
  let setPfr = usePfrData((state) => state.setPfr)

  const getSectionData = async (params: any) => {
    try {
      if(gate2 === 0) {
        setLoading(true); // Set loading before sending API request
        let getSection2 = await getPfrStep(2, params);
  
        console.log(getSection2);
  
        // Fetch Client
        if (getSection2.summaryOfProperty.length > 0) {
          if (getSection2.summaryOfProperty.length > 1) {
            console.log("masuk reset")
            resetProperty();
          }
          getSection2.summaryOfProperty.map((data: any, index: number) => {
            fetchProperty(index, data);
          });
        }
  
        // Fetch accompaintment
        if (getSection2.summaryOfInvestment.length > 0) {
          if (getSection2.summaryOfInvestment.length > 1) {
            console.log("masuk reset")
            resetInvestment();
          }
          getSection2.summaryOfInvestment.map((data: any, index: number) => {
            fetchInvestment(index, data);
          });
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfSaving.length > 0) {
          if (getSection2.summaryOfSaving.length > 1) {
            console.log("masuk reset")
            resetSaving();
          }
          getSection2.summaryOfSaving.map((data: any, index: number) => {
            fetchSaving(index, data);
          });
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfCPF.length > 0) {
          if (getSection2.summaryOfCPF.length > 1) {
            console.log("masuk reset")
            resetCpf();
          }
          getSection2.summaryOfCPF.map((data: any, index: number) => {
            fetchCpf(index, data);
          });
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfInsurance.length > 0) {
          if (getSection2.summaryOfInsurance.length > 1) {
            console.log("masuk reset")
            resetInsurance();
          }
          getSection2.summaryOfInsurance.map((data: any, index: number) => {
            fetchInsurance(index, data);
          });
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfInsurance2.length > 0) {
          if (getSection2.summaryOfInsurance2.length > 1) {
            console.log("masuk reset")
            resetInsurance2();
          }
          getSection2.summaryOfInsurance2.map((data: any, index: number) => {
            fetchInsurance2(index, data);
          });
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfLoans.length > 0) {
          if (getSection2.summaryOfLoans.length > 1) {
            console.log("masuk reset")
            resetLoan();
          }
          
          fetchLoan(getSection2.summaryOfLoans);
        }
  
        // Fetch trusted individual
        if (getSection2.summaryOfSRS.length > 0) {
          if (getSection2.summaryOfSRS.length > 1) {
            console.log("masuk reset")
            resetSrs();
          }
          getSection2.summaryOfSRS.map((data: any, index: number) => {
            fetchSrs(index, data);
          });
        }
  
        setLoading(false); // Stop loading
        setPfr("gate2", 1)
      }
      
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  // count assets and liabilities
  useEffect(() => {
    let asset = [0, 0];
    let liability = [0, 0];

    // property
    summaryOfProperty.map((data1, index1) => {
      if (Number(data1.client) === 0) {
        asset[Number(data1.client)] += Number(data1.currentMarketValue);
      } else {
        asset[Number(data1.client)] += Number(data1.currentMarketValue);
      }
    });

    // srs
    let srs = [0, 0];
    summaryOfSRS.map((data2, index1) => {
      if (Number(data2.client) === 0) {
        asset[Number(data2.client)] += Number(data2.amount);
        srs[Number(data2.client)] += Number(data2.amount);
      } else {
        srs[Number(data2.client)] += Number(data2.amount);
        asset[Number(data2.client)] += Number(data2.amount);
      }
    });

    setAffordabilityTemp("summaryOfSRS", 0, srs[0]);
    setAffordabilityTemp("summaryOfSRS", 1, srs[1]);
    // srs
    summaryOfInvestment.map((data3, index1) => {
      if (Number(data3.client) === 0) {
        asset[Number(data3.client)] += Number(data3.currentvalue);
      } else {
        asset[Number(data3.client)] += Number(data3.currentvalue);
      }
    });

    // saving
    let saving = [0, 0];
    summaryOfSavings.map((data4, index1) => {
      if (Number(data4.client) === 0) {
        asset[Number(data4.client)] += Number(data4.savingAmount);
        saving[Number(data4.client)] += Number(data4.savingAmount);
      } else {
        asset[Number(data4.client)] += Number(data4.savingAmount);
        saving[Number(data4.client)] += Number(data4.savingAmount);
      }
    });

    setAffordabilityTemp("summaryOfSaving", 0, saving[0]);
    setAffordabilityTemp("summaryOfSaving", 1, saving[1]);

    // cpf
    let cpfOa = [0, 0];
    let cpfSa = [0, 0];
    let cpfMedisave = [0, 0];
    summaryOfCPF.map((data5, index1) => {
      if (Number(data5.client) === 0) {
        let sumCpf =
          Number(data5.ordinaryAccount) +
          Number(data5.specialAccount) +
          Number(data5.medisaveAccount) +
          Number(data5.retirementAccount);
        asset[Number(data5.client)] += sumCpf;
        cpfOa[Number(data5.client)] += Number(data5.ordinaryAccount);
        cpfSa[Number(data5.client)] += Number(data5.specialAccount);
        cpfMedisave[Number(data5.client)] += Number(data5.medisaveAccount);
      } else {
        let sumCpf =
          Number(data5.ordinaryAccount) +
          Number(data5.specialAccount) +
          Number(data5.medisaveAccount) +
          Number(data5.retirementAccount);
        asset[Number(data5.client)] += sumCpf;
        cpfOa[Number(data5.client)] += Number(data5.ordinaryAccount);
        cpfSa[Number(data5.client)] += Number(data5.specialAccount);
        cpfMedisave[Number(data5.client)] += Number(data5.medisaveAccount);
      }
    });
    setAffordabilityTemp("summaryOfCpfOa", 0, cpfOa[0]);
    setAffordabilityTemp("summaryOfCpfOa", 1, cpfOa[1]);

    setAffordabilityTemp("summaryOfCpfSa", 0, cpfSa[0]);
    setAffordabilityTemp("summaryOfCpfSa", 1, cpfSa[1]);

    setAffordabilityTemp("summaryOfCpfMedisave", 0, cpfMedisave[0]);
    setAffordabilityTemp("summaryOfCpfMedisave", 1, cpfMedisave[1]);
    // Loan liabilities
    summaryOfLoans.map((data6, index1) => {
      if (Number(data6.client) === 0) {
        liability[Number(data6.client)] += Number(data6.currentOutstandingLoan);
      } else {
        liability[Number(data6.client)] += Number(data6.currentOutstandingLoan);
      }
    });

    summaryOfProperty.map((data7, index1) => {
      if (Number(data7.client) === 0) {
        liability[Number(data7.client)] += Number(data7.currentOutstanding);
      } else {
        liability[Number(data7.client)] += Number(data7.currentOutstanding);
      }
    });

    setAffordabilityTemp("asset", 0, asset[0]);
    setAffordabilityTemp("asset", 1, asset[1]);

    setAffordabilityTemp("loan", 0, liability[0]);
    setAffordabilityTemp("loan", 1, liability[1]);
  }, [
    summaryOfCPF,
    summaryOfSavings,
    summaryOfInvestment,
    summaryOfSRS,
    summaryOfProperty,
    summaryOfLoans,
  ]);

  // Get data when scroll from section 1
  useEffect(() => {
    if (!router.isReady) return;
    // If edit check the ID
    if (router.query.id !== null && router.query.id !== undefined) {
      if (scrollPositionBottom === "Process1") {
        setGlobal("editableStatus", pfrLocal.editableSection2);
        setGlobal("id", router.query.id);
        setGlobal("status", pfrLocal.section2);
        getSectionData(router.query.id);
      }
    }
  }, [scrollPositionBottom, router.isReady, router.query.id]);

  useEffect(() => {
    if (scrollPositionNext === "okSec3") {
      if (
        ((editableStatus === 0 || editableStatus === null) && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now");
        storeData();
      } else {
        console.log("Your data not complete Section 2");
      }
    }
  }, [scrollPositionNext, editableStatus, status]);

  return loading ? (
    <LoaderPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
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
          {saveLoading ? (
            <span className="text-xs font-extralight text-gray-light">
              Saving...
            </span>
          ) : (
            ""
          )}
        </HeadingPrimarySection>
      </div>
      {need ? (
        <>
          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.1 Summary of Property(ies)</h2>
            <Toggle
              isChecked={summaryOfProperty[0].editting}
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
                logic={!need && reason === "" ? false : true}
              />
            </RowSingle>
            {getPfrLength?.length &&
              getPfrLength.map((data, index) => (
                <RowDoubleGrid key={"sas" + index}>
                  <div>
                    <Input
                      indexClient={index}
                      name="totalNetWorth"
                      value={totalNetWorth[index]}
                      handleChange={handleNetWorth}
                      label="Total Net Worth"
                      className="my-4"
                    />
                  </div>

                  {totalNetWorth[index] == 0 ? (
                    <div>
                      <TextArea
                        className="my-4"
                        label="Reason is needed if Net Worth ≤ $0"
                        rows={1}
                        name="networthReason"
                        indexClient={index}
                        defaultValue={networthReason[index]}
                        needValidation={true}
                        handleChange={handleNetWorth}
                        logic={
                          !need &&
                          totalNetWorth[index] == 0 &&
                          networthReason[index] == ""
                            ? false
                            : true
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </RowDoubleGrid>
              ))}
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
    </div>
  );
};

export default ExistingPortofolio;
