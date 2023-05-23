import Input from "@/components/Forms/Input";
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import AddDependent from "./AddDependent";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import Checkbox from "@/components/Forms/Checkbox";

interface Props {
  id?:any
}

const PersonalInformationJoin = (props: Props) => {
  const [addInfoDependent, setAddInfoDependent] = useState([{}]);
  const [showAddDependent, setShowAddDependent] = useState(false);

  let type: Array<any> = [{}, {}];

  const setData = (params: any) => {
    console.log(params);
  };

  const handleShowAddDependent = () => {
    setShowAddDependent(true);
  };

  const handleAddDependent = () => {
    setAddInfoDependent([...addInfoDependent, {}]);
  };

  const changeData = (params: any) => {};

  // Variable Select Box
  let clientTitle: Array<any> = [
    { id: 1, name: "Dr" },
    { id: 2, name: "Mdm" },
    { id: 3, name: "Mr" },
    { id: 4, name: "Ms" },
    { id: 5, name: "Mrs" },
  ];

  let clientSex: Array<any> = [
    { id: 1, name: "Man" },
    { id: 2, name: "Female" },
  ];

  let clientSmoker: Array<any> = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ];

  let country: Array<any> = [
    { id: 1, name: "Singapore" },
    { id: 2, name: "Malay" },
    { id: 3, name: "Thailand" },
  ];

  let recidence: Array<any> = [
    { id: 1, name: "Singaporean" },
    { id: 2, name: "Malay" },
    { id: 3, name: "Thailand" },
  ];

  let marital: Array<any> = [
    { id: 1, name: "Single" },
    { id: 2, name: "Meried" },
  ];

  let employment: Array<any> = [
    { id: 1, name: "Fulltime" },
    { id: 2, name: "Parttime" },
    { id: 3, name: "Freelance" },
  ];

  let employmentSector: Array<any> = [
    { id: 1, name: "Education" },
    { id: 2, name: "Banking" },
    { id: 3, name: "Financial" },
  ];

  let companyMaster: Array<any> = [
    { id: 1, name: "Abc Company" },
    { id: 2, name: "Cde Company" },
    { id: 3, name: "Fgh Company" },
  ];

  let annualIncome: Array<any> = [
    { id: 1, name: "0 - 29,000" },
    { id: 2, name: "29,000 - 49,000" },
    { id: 3, name: "50,000 - 79,000" },
  ];

  let englishLevel: Array<any> = [
    { id: 1, name: "Proficient" },
    { id: 2, name: "Not Proficient" },
  ];

  let educationLevel: Array<any> = [
    { id: 1, name: "Primary" },
    { id: 2, name: "Secondary" },
    { id: 3, name: "GCE 'N' or 'O' Level Certifications, or Equivalent" },
    { id: 4, name: "Pre-Tertiary" },
    { id: 5, name: "Tertiary and above" },
  ];

  let { showDetailData } = useNavigationSection();

  const showDetail = (params: any) => {
    showDetailData(params);
  };

  const saveData = (params: any) => {
    showDetailData(params);
  };

  console.log(addInfoDependent.length);

  return (
    <div id={props.id}>
      {/* Sec 1 */}
      <HeadingSecondarySection>
        1.1 Personal Information
      </HeadingSecondarySection>

      <SectionCardDoubleGrid>
        {type.map((data, index) => (
          <div key={index}>
            <div className="flex flex-row items-center justify-between mb-10">
              <button className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-light">
                <span className="flex">
                  <FlashlightLineIcon /> AUTOFILL PROFILE FORM
                </span>
                <span className="px-4 py-3 text-white rounded-lg bg-green-deep">
                  Import
                </span>
              </button>
            </div>
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Title"
              value=""
              datas={clientTitle}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Input
              className="mb-10"
              label="Principal Name"
              type="text"
              placeholder="Margo Madison"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="NRIC / FIN"
              type="text"
              placeholder="12981289129"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="Email Address"
              type="text"
              placeholder="margomadison@gmail.com"
              handleChange={(event) => setData(event.target.value)}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Sex"
              value=""
              datas={clientSex}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Input
              className="mb-10"
              label="Race"
              type="text"
              placeholder="Chinesse"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="Date of Birth"
              type="text"
              placeholder="01 January 1998"
              handleChange={(event) => setData(event.target.value)}
            />
            <Select
              className="mb-10"
              label="Country of Birth"
              value=""
              datas={country}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Nationality"
              value=""
              datas={country}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Select
              className="mb-10"
              label="Residency Status"
              value=""
              datas={recidence}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Pass Type"
              value=""
              datas={country}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Select
              className="mb-10"
              label="Marital Status"
              value=""
              datas={marital}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Employment Status"
              value=""
              datas={employment}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Input
              className="mb-10"
              label="Occupation"
              type="text"
              placeholder="Manager"
              handleChange={(event) => setData(event.target.value)}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Employment Sector"
              value=""
              datas={employmentSector}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Input
              className="mb-10"
              label="CPF Employe"
              type="text"
              placeholder="-"
              handleChange={(event) => setData(event.target.value)}
            />
            {/* Selected Form */}
            <Select
              className="mb-10"
              label="Company Name"
              value=""
              datas={companyMaster}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Select
              className="mb-10"
              label="Annual Income"
              value=""
              datas={annualIncome}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
            <Input
              className="mb-10"
              label="Contact Detail [Home]"
              type="text"
              placeholder="981271291"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="Mobile Number"
              type="text"
              placeholder="2121921298"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="Registered Address"
              type="text"
              placeholder="Singapore"
              handleChange={(event) => setData(event.target.value)}
            />
            <Input
              className="mb-10"
              label="Mailing Address"
              type="text"
              placeholder="Set as same like registered address"
              handleChange={(event) => setData(event.target.value)}
            />
            {/* Selected Form */}

            <Select
              className="mb-10"
              label="Smoker"
              value=""
              datas={clientSmoker}
              handleChange={(event) => changeData(eval(event.target.value))}
            />
          </div>
        ))}
      </SectionCardDoubleGrid>

      {/* Sec 2 */}
      <HeadingSecondarySection>
        1.2 Dependent Information
      </HeadingSecondarySection>
      <SectionCardSingleGrid>
        <button
          className="flex text-green-deep"
          onClick={handleShowAddDependent}
        >
          <AddLineIcon /> Add Dependent
        </button>
        {showAddDependent ? (
          <>
            {addInfoDependent?.length &&
              addInfoDependent.map((dependent, index) => (
                <AddDependent key={index} />
              ))}

            <button
              className="flex text-green-deep"
              onClick={handleAddDependent}
            >
              Add More
            </button>
          </>
        ) : null}
      </SectionCardSingleGrid>

      {/* Sec 3 */}
      <HeadingSecondarySection>
        1.3 Client Accompainment Assestment
      </HeadingSecondarySection>
      <SectionCardDoubleGrid>
        <div>
          <Input
            label="Age"
            type="text"
            placeholder="Below 62"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="Spoken English Language Proficiency"
            type="text"
            placeholder="Proficient"
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            label="Education Level"
            type="text"
            placeholder="Primary"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="Written English Language Proficiency"
            type="text"
            placeholder="Proficient"
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </SectionCardDoubleGrid>
      {/* Sec 4 */}
      <HeadingSecondarySection>1.4 Trusted Individual</HeadingSecondarySection>
      <SectionCardDoubleGrid>
        <div>
          <Input
            label="Name of Trusted Individual"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="NRIC/Passport No. of Trusted Individual"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="Language Used"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            label="Trusted Individual Email Address"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="Relationship to Client"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            label="Mobile Number"
            type="text"
            placeholder="-"
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </SectionCardDoubleGrid>
      <HeadingSecondarySection>
        Declaration by Trusted Individual
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="border-b border-gray-light">
        <RowSingle className="mb-10">
          <Checkbox />
          <p className="text-sm text-gray-light">
            I have conveyed and/or translated the recommendation(s) and all
            relevant disclosures into a language which the client can
            understand. By providing my contact details a. signing this seaion
            in this 'Personal Financial IlecorcP, I have gjven my consent mallow
            Lega, FP Pte Ltd to contact me tor verification oldie contents in
            this 'Personal Financial Record• and not tor any other purposes.
          </p>
        </RowSingle>
      </SectionCardSingleGrid>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(2)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default PersonalInformationJoin;
