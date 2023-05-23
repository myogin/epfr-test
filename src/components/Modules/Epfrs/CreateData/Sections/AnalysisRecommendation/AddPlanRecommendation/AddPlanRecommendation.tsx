import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState } from "react";

const AddPlanRecommendation = () => {
  let benefits: Array<any> = [
    {
      id: 1,
      name: "Protection",
      description:
        "Provides coverage against death and terminal illness.Guaranteed Issuance",
    },
    {
      id: 2,
      name: "Guaranted Issuance",
      description:
        "No medical underwriting required.Guaranteed Retirement Income Benefit",
    },
    {
      id: 3,
      name: "Guaranted Retirement Income Benefit",
      description:
        "At the selected Retirement Age (i.e. at the end of the accumulation period), as part of the Retirement Income Benefit, the monthly Guaranteed Retirement Income Benefit will be paid for a period of 10 years. Payments of the monthly Guaranteed Retirement Income Benefit will start one month following the selected Retirement Age. At the end of the Retirement Income Period, while the Policy is in force and upon survival of the Life Assured, the Maturity Payout, which consists of the non-guaranteed Reversionary Bonus accrued over the Policy Term, together with the Terminal Bonus (if any), will also be payable.Withdrawal of Reinvested Retirement Income Benefit",
    },
  ];

  let riders: Array<any> = [
    {
      id: 1,
      name: "Easy Term",
      checked: false,
      description:
        "EasyTerm is a non-participating Supplementary Benefit that offers protection against Death, Terminal Illness and Total and Permanent Disability (TPD) during the period of the benefit term. This benefit does not have any cash value. Premium rates relating to this Supplementary Benefit are level and guaranteed within premium payment term.",
    },
    {
      id: 2,
      name: "Free Look",
      checked: false,
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  let riderBenefits: Array<any> = [
    {
      id: 1,
      name: "Exclusions",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look",
    },
    {
      id: 2,
      name: "Exclusions 2",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look 2",
    },
  ];

  let riderRisks: Array<any> = [
    {
      id: 1,
      name: "Risk One",
      description:
        "EasyTerm is a non-participating Supplementary Benefit that offers protection against Death, Terminal Illness and Total and Permanent Disability (TPD) during the period of the benefit term. This benefit does not have any cash value. Premium rates relating to this Supplementary Benefit are level and guaranteed within premium payment term.",
    },
    {
      id: 2,
      name: "Risk Two",
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  let risks: Array<any> = [
    {
      id: 1,
      name: "Early Surrender",
      description:
        "An early surrender of the policy usually involves high costs and the surrender value may be less than the total premiums paid.Exclusions",
    },
    {
      id: 2,
      name: "Exclusions",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look",
    },
    {
      id: 3,
      name: "Free Look",
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  const [rider, setRider] = useState(null);
  const [productSelect, setProductSelect] = useState(0);

  let riderArray: Array<any> = [false];

  const setRiderAction = (params: any, value: boolean) => {
    console.log("Rider Select " + params + " value " + value);
    setRider(params);

    riderArray[params] = value 
  };

  const changeData = (params: any) => {
    console.log("masuk sini nggak global one");
  };

  const changeDataProductName = (params: any) => {
    console.log("masuk sini nggak ");
    setProductSelect(params);
  };

  let dataOwner: Array<any> = [
    { id: 1, name: "Owner One" },
    { id: 2, name: "Owner Two" },
  ];

  let dataCategory: Array<any> = [
    { id: 1, name: "Category One" },
    { id: 2, name: "Category Two" },
  ];

  let dataProductName: Array<any> = [
    { id: 0, name: "Select Product" },
    { id: 1, name: "Product One" },
    { id: 2, name: "Product Two" },
  ];

  let recomendationType: Array<any> = [
    { id: 1, name: "Insurance" },
    { id: 2, name: "CIS" },
  ];

  let dataPaymentFreq: Array<any> = [
    { id: 1, name: "Monthly" },
    { id: 2, name: "Quarterly" },
    { id: 3, name: "Half-Yearly" },
    { id: 4, name: "Annually" },
    { id: 5, name: "Single" },
  ];

  let dataProvider: Array<any> = [
    { id: 1, name: "Singlife" },
    { id: 2, name: "AXA" },
    { id: 3, name: "Hoxing" },
  ];

  let dataDependant: Array<any> = [
    { id: 1, name: "Mayor Raja" },
    { id: 2, name: "Mayor Jendral" },
    { id: 3, name: "Sino" },
    { id: 3, name: "Other" },
  ];

  let dataPremiumType: Array<any> = [
    { id: 1, name: "CASH" },
    { id: 2, name: "CPFOA" },
    { id: 3, name: "CPFSA" },
    { id: 3, name: "CPF MEDISAVE" },
  ];

  let dataCurrency: Array<any> = [
    { id: 1, name: "Singapore Dollar" },
    { id: 2, name: "US Dollar" },
  ];

  console.log("data " + productSelect);

  const changeDataOwner = (params: any) => {
    console.log("masuk sini owner");
  };

  const changeDataCategory = (params: any) => {
    console.log("masuk sini owner");
  };

  const changeDataRecommendation = (params: any) => {
    console.log("masuk sini recommendation");
  };

  const changeDataProvider = (params: any) => {
    console.log("masuk sini provider");
  };

  const changeDataNameOfInsured = (params: any) => {
    console.log("masuk sini insured name");
  };

  const changeDataPaymentFrequency = (params: any) => {
    console.log("masuk sini freq");
  };

  const changeDataCurrency = (params: any) => {
    console.log("masuk sini currency");
  };

  const changeDataPaymentType = (params: any) => {
    console.log("masuk sini payment type");
  };

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  return (
    <>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">Product Details</HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div>
            <Select
              datas={dataOwner}
              label="Name of Owner"
              className="my-4"
              handleChange={(event) => changeDataOwner(event.target.value)}
            />
            <Select
              datas={dataCategory}
              label="Category"
              className="my-4"
              handleChange={(event) => changeDataCategory(event.target.value)}
            />
            <Select
              datas={dataProductName}
              label="Product Name"
              className="my-4"
              handleChange={(event) =>
                changeDataProductName(event.target.value)
              }
            />
          </div>
          <div>
            <Select
              datas={recomendationType}
              label="Recommendation Type"
              className="my-4"
              handleChange={(event) =>
                changeDataRecommendation(event.target.value)
              }
            />
            <Select
              datas={dataProvider}
              label="Provider Name"
              className="my-4"
              handleChange={(event) => changeDataProvider(event.target.value)}
            />
          </div>
        </RowDoubleGrid>

        {productSelect > 0 ? (
          <>
            <RowDoubleGrid>
              <div>
                <Select
                  datas={dataDependant}
                  label="Name of Insured (If Different From Owner)"
                  className="my-4"
                  handleChange={(event) =>
                    changeDataNameOfInsured(event.target.value)
                  }
                />
                <Select
                  datas={dataPaymentFreq}
                  label="Payment Frequency"
                  className="my-4"
                  handleChange={(event) =>
                    changeDataPaymentFrequency(event.target.value)
                  }
                />
                <Input label="Policy Term Years" className="my-4" />
                <Select
                  datas={dataCurrency}
                  label="Currency"
                  className="my-4"
                  handleChange={(event) =>
                    changeDataCurrency(event.target.value)
                  }
                />
              </div>
              <div>
                <Select
                  datas={dataPremiumType}
                  label="Premium Payment Type"
                  className="my-4"
                  handleChange={(event) =>
                    changeDataPaymentType(event.target.value)
                  }
                />
                <Input label="Premium Amounts" className="my-4" />
                <Input label="Sum Assured" className="my-4" />
              </div>
            </RowDoubleGrid>
            <RowSingleGrid>
              <TextSmall>Product Feature</TextSmall>
              <p className="text-sm text-gray-light">
                MyRetirement is a life insurance endowment plan that aims to
                provide a platform for accumulating retirement savings and
                providing retirement income solutions. This is a participating
                policy that participates in the performance of Singapore Life’s
                Participating Fund in the form of non-guaranteed bonuses.
                MyRetirement consists of two phases, the Accumulation Period and
                the Retirement Income Period, and it provides coverage against
                death and terminal illness. The plan provides limited premium
                payment of 8 years OR limited premium payment of 10 years OR
                regular premium payment up to 5 years before Policyholder's
                selected Retirement Age.
              </p>
            </RowSingleGrid>
          </>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      {productSelect > 0 ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">Benefit Details</HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
            {benefits.length > 0 &&
              benefits.map((benefit, index) => (
                <div
                  className="w-full p-5 border rounded-md border-gray-soft-strong"
                  key={index}
                >
                  <div className="flex items-center justify-start gap-4 mb-5">
                    <Checkbox label={benefit.name} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
          </SectionCardSingleGrid>

          <HeadingSecondarySection className="mx-8 2xl:mx-60">Risk Details</HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
            {benefits.length > 0 &&
              benefits.map((benefit, index) => (
                <div
                  className="w-full p-5 border rounded-md border-gray-soft-strong"
                  key={index}
                >
                  <div className="flex items-center justify-start gap-4 mb-5">
                    <Checkbox label={benefit.name} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
          </SectionCardSingleGrid>

          <HeadingSecondarySection className="mx-8 2xl:mx-60">Rider Details</HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
            {riders.length > 0 &&
              riders.map((r, index) => (
                <div
                  className="w-full p-5 border rounded-md border-gray-soft-strong"
                  key={index}
                >
                  <div className="flex mb-5">
                    <Checkbox
                      onChange={() => setRiderAction(r.id, !r.checked)}
                      isChecked={riderArray[r.id]}
                      label={r.name}
                    />
                  </div>
                  <div className="mb-5">
                    <p className="text-sm text-gray-light">{r.description}</p>
                  </div>
                  {riderArray[r.id] == true ? (
                    <div className="space-y-10">
                      <div className="w-full p-5 border rounded-md border-gray-soft-strong">
                        <RowDoubleGrid>
                          <div>
                            <Input label="Policy Term" className="my-4" />
                            <Input label="Premium ($)" className="my-4" />
                          </div>
                          <div>
                            <Input label="Sum Assured" className="my-4" />
                            <Input label="Name of Insured" className="my-4" />
                          </div>
                        </RowDoubleGrid>
                      </div>

                      <RowSingleGrid>
                        <TextSmall>Rider Benefit</TextSmall>

                        {riderBenefits.length > 0 &&
                          riderBenefits.map((rb, index) => (
                            <div
                              className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                              key={rb.id}
                            >
                              <div className="flex mb-5">
                                <Checkbox
                                  onChange={() => setRiderAction(rb.id)}
                                  isChecked={rider == rb.id ? true : false}
                                  label={rb.name}
                                />
                              </div>
                              <div className="mb-5">
                                <p className="text-sm text-gray-light">
                                  {rb.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </RowSingleGrid>

                      <RowSingleGrid>
                        <TextSmall>Rider Risk</TextSmall>

                        {riderRisks.length > 0 &&
                          riderRisks.map((rr, index) => (
                            <div
                              className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                              key={rr.id}
                            >
                              <div className="flex mb-5">
                                <Checkbox
                                  onChange={() => setRiderAction(rr.id)}
                                  isChecked={rider == rr.id ? true : false}
                                  label={rr.name}
                                />
                              </div>
                              <div className="mb-5">
                                <p className="text-sm text-gray-light">
                                  {rr.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </RowSingleGrid>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
          </SectionCardSingleGrid>
          <SectionCardFooter className="mx-8 2xl:mx-60">
            <ButtonGreenMedium onClick={() => saveData(91)}>Save</ButtonGreenMedium>
            <ButtonRedMedium>Cancel</ButtonRedMedium>
          </SectionCardFooter>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AddPlanRecommendation;
