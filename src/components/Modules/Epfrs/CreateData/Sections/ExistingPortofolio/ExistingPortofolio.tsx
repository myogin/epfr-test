import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import Toggle from "@/components/Forms/Toggle";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import CpfPortofolio from "./Cpf/CpfPortofolio";
import InsurancePortofolio from "./Insurance/InsurancePortofolio";
import InvestmentPortofolio from "./Investment/InvestmentPortofolio";
import LoanPortofolio from "./Loan/LoanPortofolio";
import PropertyPortofolio from "./Property/PropertyPortofolio";
import SavingPortofolio from "./Saving/SavingPortofolio";
import SrsPortofolio from "./Srs/SrsPortofolio";
import VehiclesPortofolio from "./Vehicles/VehiclesPortofolio";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionTwo } from "@/models/SectionTwo";

interface Props {
  id?: any;
}

const ExistingPortofolio = (props: Props) => {
  let fillInformation = [
    { id: 0, name: "Nil" },
    { id: 1, name: "Review" },
  ];

  let {
    showDetailProperty,
    showDetailCpf,
    showDetailInsurance,
    showDetailInvestment,
    showDetailLoan,
    showDetailSaving,
    showDetailSrs,
    cpf,
    insurance,
    investment,
    loan,
    property,
    saving,
    srs,
  } = useExistingPortofolio();

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const setDetailProperty = (setParam : boolean) => {

    console.log("test " + setParam)
    setSectionTwo({...sectionTwo}, )
  };

  const setDetailInvestment = () => {
    showDetailInvestment(!investment);
  };

  const setDetailSeving = () => {
    showDetailSaving(!saving);
  };

  const setDetailCpf = () => {
    showDetailCpf(!cpf);
  };

  const setDetailInsurance = () => {
    showDetailInsurance(!insurance);
  };

  const setDetailSrs = () => {
    showDetailSrs(!srs);
  };

  const setDetailLoan = () => {
    showDetailLoan(!loan);
  };

  const [notReviewAll, setNotReviewAll] = useState(false);

  const [totalNetWorth, setTotalNetWorth] = useState<any>(0);

  const scrollPosition = useScrollPosition(2);

  // console.log("Test logic scroll " +scrollPosition);

  const [sectionTwo, setSectionTwo] = useState<SectionTwo>({
    id: 0,
    need: false,
    declineToReview: [],
    reason: "",
    summaryOfProperty: [
      {
        editting: false,
        client: "",
        category: 0,
        typeOfProperty: "",
        yearPurchased: 0,
        purchasePrice: 0,
        loanAmount: 0,
        currentOutstanding: 0,
        monthlyLoanRepaymentCash: 0,
        monthlyLoanRepaymentCPF: 0,
        currentMarketValue: 0,
      },
    ],
    summaryOfInvestment: [
      {
        editting: false,
        client: "",
        typeOfInvestment: "",
        typeOfInvestmentOther: "",
        company: "",
        yearInvested: 0,
        investmentAmount: 0,
        currentvalue: 0,
        sourceOfInvestment: "",
      },
    ],
    summaryOfSavings: [
      {
        editting: false,
        client: "",
        typeOfDeposit: 0,
        bank: "",
        yearDeposit: 0,
        savingAmount: 0,
      },
    ],
    summaryOfInsurance: [
      {
        editting: false,
        client: "",
        insured: "",
        status: "",
        insurer: "",
        policyType: "",
        policyTypeOther: "",
        policyTerm: "",
        death: 0,
        tpd: 0,
        ci: 0,
        earlyCI: 0,
        acc: 0,
        purchaseYear: 0,
        premiumFrequency: "",
        premium: 0,
        cash: 0,
        medisave: 0,
        sourceOfFund: 0,
      },
    ],
    summaryOfInsurance2: [
      {
        editting: false,
        client: "",
        insured: "",
        insurer: "",
        policyType: "",
        policyTerm: "",
        existingHosPlan: "",
        typeOfHosCovered: "",
        classOfWardCovered: "",
        purchaseYear: 0,
        premium: 0,
        medisave: 0,
        frequency: "",
        sourceOfFund: 0,
      },
    ],
    summaryOfLoans: [
      {
        editting: false,
        client: "",
        typeOfLoan: "",
        loanTerm: "",
        yearOfLoanTaken: 0,
        amountBorrowed: 0,
        loanStatus: "",
        typeOfVehicle: "",
        currentOutstandingLoan: 0,
        lender: "",
        interestRate: 0,
        monthlyLoanRepayment: 0,
      },
    ],
    summaryOfCPF: [
      {
        editting: false,
        client: "",
        ordinaryAccount: 0,
        specialAccount: 0,
        medisaveAccount: 0,
        retirementAccount: 0,
      },
    ],
    summaryOfSRS: [
      {
        editting: false,
        client: "",
        amount: 0,
      },
    ],
    issues: [],
    totalNetWorth: [],
    networthReason: [],
    status: 0,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("section2", JSON.stringify(sectionTwo));
  }

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
      {!notReviewAll ? (
        <>
          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.1 Summary of Property(ies)</h2>
            <Toggle
              isChecked={sectionTwo.summaryOfProperty[0].editting}
              toggleName={sectionTwo.summaryOfProperty[0].editting ? "Review" : "Not Review"}
              onChange={() => setDetailProperty(!sectionTwo.summaryOfProperty[0].editting)}
            />
            {/* <Toggle /> */}
          </HeadingSecondarySectionDoubleGrid>

          {sectionTwo.summaryOfProperty[0].editting ? <PropertyPortofolio id={sectionTwo.id} datas={sectionTwo.summaryOfProperty} /> : null}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.2 Summary of Investment(s)</h2>
            <Toggle
              isChecked={investment}
              toggleName={investment ? "Review" : "Not Review"}
              onChange={setDetailInvestment}
            />
          </HeadingSecondarySectionDoubleGrid>

          {investment ? <InvestmentPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.3 Summary of Saving(s)</h2>
            <Toggle
              isChecked={saving}
              toggleName={saving ? "Review" : "Not Review"}
              onChange={setDetailSeving}
            />
          </HeadingSecondarySectionDoubleGrid>

          {saving ? <SavingPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.4 Summary of CPF</h2>
            <Toggle
              isChecked={cpf}
              toggleName={cpf ? "Review" : "Not Review"}
              onChange={setDetailCpf}
            />
          </HeadingSecondarySectionDoubleGrid>

          {cpf ? <CpfPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">2.5 Summary of Insurance(s)</h2>
            <Toggle
              isChecked={insurance}
              toggleName={insurance ? "Review" : "Not Review"}
              onChange={setDetailInsurance}
            />
          </HeadingSecondarySectionDoubleGrid>

          {insurance ? <InsurancePortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">
              2.6 Supplementary Retirement Scheme (SRS)
            </h2>
            <Toggle
              isChecked={srs}
              toggleName={srs ? "Review" : "Not Review"}
              onChange={setDetailSrs}
            />
          </HeadingSecondarySectionDoubleGrid>

          {srs ? <SrsPortofolio /> : ""}

          <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
            <h2 className="text-xl font-bold">
              2.7 Summary of Loan (Excluding Property Loan)
            </h2>
            <Toggle
              isChecked={loan}
              toggleName={loan ? "Review" : "Not Review"}
              onChange={setDetailLoan}
            />
          </HeadingSecondarySectionDoubleGrid>

          {loan ? <LoanPortofolio /> : ""}
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            onChange={() => setNotReviewAll(!notReviewAll)}
            lableStyle="text-sm font-normal text-gray-light"
            label="The Client would not like their assets and liabilities to be taken
            into consideration for the needs analysis and recommendations"
          />
        </RowSingle>
        {notReviewAll ? (
          <>
            <RowSingle className="my-10">
              <TextArea label="The Reason" defaultValue="test text area" />
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
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(3)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default ExistingPortofolio;
