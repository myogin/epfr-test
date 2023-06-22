import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import Toggle from "@/components/Forms/Toggle";
import { TrustedIndividual } from "@/models/SectionOne";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React, { useState } from "react";

const TrustedIndividual = () => {
  let initialState: TrustedIndividual = {
    condition1: false,
    condition2: false,
    trustedEmail: "",
    nameOfTrustedIndividual: "",
    passportNo: "",
    relationship: "",
    languageUsed: "",
    contactNumber: "",
    englishLevel1: 0,
    englishLevel2: 0,
    educationLevel: 0,
    ageLevel: 0,
    declaration: 0,
  };

  let { trustedIndividuals } = usePersonalInformation();

  const changeData = (params: any) => {};

  const setData = (params: any) => {
    console.log(params);
  };

  let languages: Array<any> = [
    { id: 1, name: "English" },
    { id: 2, name: "Mandarin" },
    { id: 3, name: "Malay" },
    { id: 4, name: "Tamil" },
    { id: 5, name: "Others" },
  ];

  const [newTrustedIndividual, setNewTrustedIndividual] =
    useState(initialState);

  return (
    <>
      <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
        <div>
          <Toggle
            isChecked={trustedIndividuals.condition1}
            toggleName="Two of Following Profiles"
          />
          <div className="h-24 mt-2 text-sm text-gray-light">
            (i) Aged 62 or above
            <br />
            (ii) Are not proficient in spoken or written English
            <br />
            (iii) Have secondary education or below
          </div>
          <Input
            className="mb-10"
            label="Name of Trusted Individual"
            type="text"
            value={trustedIndividuals.nameOfTrustedIndividual}
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="mb-10"
            label="NRIC/Passport No. of Trusted Individual"
            type="text"
            placeholder="-"
            value={trustedIndividuals.passportNo}
            handleChange={(event) => setData(event.target.value)}
          />
          <Select
            className="mb-10"
            label="Language Used"
            value={trustedIndividuals.languageUsed}
            datas={languages}
            handleChange={(event) => changeData(eval(event.target.value))}
          />
        </div>
        <div>
          <Toggle
            isChecked={trustedIndividuals.condition2}
            toggleName="The Following Profile"
          />
          <div className="h-24 mt-2 text-sm text-gray-light">
            (i) Are not proficient in spoken or written English
          </div>
          <Input
            className="mb-10"
            label="Trusted Individual Email Address"
            type="text"
            placeholder="-"
            value={trustedIndividuals.trustedEmail}
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="mb-10"
            label="Relationship to Client"
            type="text"
            placeholder="-"
            value={trustedIndividuals.relationship}
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="mb-10"
            label="Mobile Number"
            type="text"
            placeholder="-"
            value={trustedIndividuals.contactNumber}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </SectionCardDoubleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Declaration by Trusted Individual
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            lableStyle="text-sm font-normal text-gray-light"
            label="I have conveyed and/or translated the recommendation(s) and all
        relevant disclosures into a language which the client can
        understand. By providing my contact details a. signing this seaion
        in this 'Personal Financial IlecorcP, I have gjven my consent mallow
        Lega, FP Pte Ltd to contact me tor verification oldie contents in
        this 'Personal Financial Record• and not tor any other purposes."
          />
        </RowSingle>
      </SectionCardSingleGrid>
    </>
  );
};

export default TrustedIndividual;
