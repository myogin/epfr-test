import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import Toggle from "@/components/Forms/Toggle";
import ToggleCustom from "@/components/Forms/ToggleCustom";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React, { useState } from "react";

const TrustedIndividual = () => {
  let { trustedIndividuals, setTrustedIndividuals } = usePersonalInformation();

  let languages: Array<any> = [
    { id: 1, name: "English" },
    { id: 2, name: "Mandarin" },
    { id: 3, name: "Malay" },
    { id: 4, name: "Tamil" },
    { id: 5, name: "Others" },
  ];

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    console.log("Masuk sini nggak");
    setTrustedIndividuals(name, value);
  };

  const handleCheckbox = (name: string, value: boolean) => {
    setTrustedIndividuals(name, value);
  };

  return (
    <>
      <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
        <div>
          <ToggleCustom
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
            name="nameOfTrustedIndividual"
            handleChange={handleInputChange}
            needValidation={true}
            logic={
              trustedIndividuals.nameOfTrustedIndividual === "" ||
              trustedIndividuals.nameOfTrustedIndividual === "-" ||
              trustedIndividuals.nameOfTrustedIndividual === null
                ? false
                : true
            }
          />
          <Input
            className="mb-10"
            label="NRIC/Passport Number of Trusted Individual"
            type="text"
            placeholder="-"
            name="passportNo"
            value={trustedIndividuals.passportNo}
            handleChange={handleInputChange}
            needValidation={true}
            logic={
              trustedIndividuals.passportNo === "" ||
              trustedIndividuals.passportNo === "-" ||
              trustedIndividuals.passportNo === null
                ? false
                : true
            }
          />
          <Select
            className="mb-10"
            label="Language Used"
            value={trustedIndividuals.languageUsed ? trustedIndividuals.languageUsed : "-"}
            name="languageUsed"
            datas={languages}
            handleChange={handleInputChange}
          />
        </div>
        <div>
          <ToggleCustom
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
            name="trustedEmail"
            value={trustedIndividuals.trustedEmail}
            handleChange={handleInputChange}
            needValidation={true}
            logic={
              trustedIndividuals.trustedEmail === "" ||
              trustedIndividuals.trustedEmail === "-" ||
              trustedIndividuals.trustedEmail === null
                ? false
                : true
            }
          />
          <Input
            className="mb-10"
            label="Relationship to Client"
            type="text"
            placeholder="-"
            name="relationship"
            value={trustedIndividuals.relationship}
            handleChange={handleInputChange}
            needValidation={true}
            logic={
              trustedIndividuals.relationship === "" ||
              trustedIndividuals.relationship === "-" ||
              trustedIndividuals.relationship === null
                ? false
                : true
            }
          />
          <Input
            className="mb-10"
            label="Mobile Number"
            type="text"
            placeholder="-"
            value={trustedIndividuals.contactNumber}
            handleChange={handleInputChange}
            needValidation={true}
            name="contactNumber"
            logic={
              trustedIndividuals.contactNumber === "" ||
              trustedIndividuals.contactNumber === "-" ||
              trustedIndividuals.contactNumber === null
                ? false
                : true
            }
          />
        </div>
      </SectionCardDoubleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Declaration by Trusted Individual
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            needValidation={true}
            name="declaration"
            onChange={(event) =>
              handleCheckbox(event.target.name, !trustedIndividuals.declaration)
            }
            logic={trustedIndividuals.declaration}
            isChecked={trustedIndividuals.declaration}
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
