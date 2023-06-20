import Input from "@/components/Forms/Input";
import React, { useState } from "react";
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import Select from "@/components/Forms/Select";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import Checkbox from "@/components/Forms/Checkbox";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";
import Toggle from "@/components/Forms/Toggle";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionOne } from "@/models/SectionOne";
import Dependent from "./Dependent";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";

interface Props {
  id?: any;
  pfrType?: number;
}

const PersonalInformation = (props: Props) => {
  const [addInfoDependent, setAddInfoDependent] = useState([{}]);
  const [showAddDependent, setShowAddDependent] = useState(false);

  const setData = (params: any) => {
    console.log(params);
  };

  let statusReviewDependent = "Not Review";

  if (showAddDependent === true) {
    statusReviewDependent = "Review";
  }

  const handleShowAddDependent = (params: boolean) => {
    setShowAddDependent(params);
  };

  const handleAddDependent = () => {
    setAddInfoDependent([...addInfoDependent, {}]);
  };

  const changeData = (params: any) => {};

  // Variable Select Box
  let clientTitles: Array<any> = [
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

  let languages: Array<any> = [
    { id: 1, name: "English" },
    { id: 2, name: "Mandarin" },
    { id: 3, name: "Malay" },
    { id: 4, name: "Tamil" },
    { id: 5, name: "Others" },
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

  // console.log(addInfoDependent.length);

  const scrollPosition = useScrollPosition(1);

  // let clientInfo = usePersonalInformation((state: { clientInfo : any }) => state.clientInfo[0]);
  let {
    ownerId,
    type,
    id,
    clientInfo,
    dependant,
    accompaniment,
    trustedIndividuals,
    issues,
    reviewDate,
    status,
    setClient,
  } = usePersonalInformation();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata } = event.target.dataset;

    if (groupdata === "clientInfo") {
      setClient(0, name, value);
    }
  };

  // if (typeof window !== "undefined") {
  //   localStorage.setItem("section1", JSON.stringify(sectionOne));
  // }

  return (
    <div id={props.id}>
      {/* Sec 1 */}
      <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60">
        <button
          className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-strong"
          onClick={() => showDetail(100)}
        >
          <span className="flex">
            <FlashlightLineIcon /> AUTOFILL PROFILE FORM
          </span>
          <span className="px-4 py-3 text-white rounded-lg bg-green-deep">
            Import
          </span>
        </button>
      </div>
      <div
        id="section-header-1"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec1" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec1"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 1. Personal Information
        </HeadingPrimarySection>
      </div>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        1.1 Client Details
      </HeadingSecondarySection>
      <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
        <div>
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Title"
            name="clientTitle"
            value={clientInfo[0].clientTitle}
            datas={clientTitles}
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="NRIC / FIN"
            type="text"
            name="passportNo"
            value={clientInfo[0].passportNo}
            placeholder="12981289129"
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Sex"
            name="gender"
            value={clientInfo[0].gender}
            datas={clientSex}
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={clientInfo[0].dateOfBirth}
            placeholder="01 January 1998"
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Nationality"
            name="nationality"
            value={clientInfo[0].nationality}
            datas={country}
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
          {/* <Select
            className="mb-10"
            label="Pass Type"
            name="passType"
            value={clientInfo[0].passType}
            datas={country}
            handleChange={handleInputChange}
          /> */}
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            name="employmentStatus"
            label="Employment Status"
            value={clientInfo[0].employmentStatus}
            datas={employment}
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Employment Sector"
            name="employmentSector"
            value={clientInfo[0].businessNature}
            datas={employmentSector}
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            name="companyName"
            label="Company Name"
            value={clientInfo[0].companyName}
            datas={companyMaster}
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Contact Detail [Home]"
            type="text"
            name="contactHome"
            value={clientInfo[0].contactHome}
            placeholder="981271291"
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Registered Address"
            type="text"
            name="residentialAddr"
            value={clientInfo[0].residentialAddr}
            placeholder="Singapore"
            handleChange={handleInputChange}
          />
          {/* Selected Form */}
        </div>
        <div>
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Principal Name"
            type="text"
            name="clientName"
            value={clientInfo[0].clientName}
            placeholder="Margo Madison"
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Email Address"
            type="text"
            name="email"
            value={clientInfo[0].email}
            placeholder="margomadison@gmail.com"
            handleChange={handleInputChange}
          />
          {/* <Input
            className="mb-10"
            label="Race"
            type="text"
            name="race"
            value={clientInfo[0].race}
            placeholder="Chinesse"
            handleChange={handleInputChange}
          /> */}
          {/* <Select
            className="mb-10"
            label="Country of Birth"
            name="countryOfBirth"
            value={personalInformation[0].countryOfBirth}
            datas={country}
            handleChange={handleInputChange}
          /> */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Residency Status"
            name="residency"
            value={clientInfo[0].residency}
            datas={recidence}
            handleChange={handleInputChange}
          />
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Marital Status"
            name="marital"
            value={clientInfo[0].marital}
            datas={marital}
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Occupation"
            type="text"
            name="occupation"
            value={clientInfo[0].occupation}
            placeholder="Manager"
            handleChange={handleInputChange}
          />
          {/* <Input
            className="mb-10"
            label="CPF Employee"
            type="text"
            name="cpfEmployee"
            placeholder="-"
            value={personalInformation[0].cpfEmployee}
            handleChange={handleInputChange}
          /> */}
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Annual Income"
            name="annualIncome"
            value={clientInfo[0].annualIncome}
            datas={annualIncome}
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Mobile Number"
            type="text"
            name="contactMobile"
            value={clientInfo[0].contactMobile}
            placeholder="2121921298"
            handleChange={handleInputChange}
          />
          <Input
            dataType="clientInfo"
            className="mb-10"
            label="Mailing Address"
            type="text"
            name="mailingAddr"
            value={clientInfo[0].mailingAddr}
            placeholder="Set as same like registered address"
            handleChange={handleInputChange}
          />
          <Select
            dataType="clientInfo"
            className="mb-10"
            label="Smoker"
            name="smoker"
            value={clientInfo[0].smoker}
            datas={clientSmoker}
            handleChange={handleInputChange}
          />
          {/* <Input
            dataType="clientInfo"
            className="mb-10"
            label="Review Date"
            type="date"
            name="reviewDate"
            value={sectionOne.reviewDate}
            placeholder="01 January 1998"
            handleChange={handleInputChange}
          /> */}
          <Input
            dataType="generalInfo"
            className="mb-10"
            label="Review Date"
            type="date"
            name="reviewDate"
            value={reviewDate}
            placeholder="01 January 1998"
            handleChange={handleInputChange}
          />
        </div>
      </SectionCardDoubleGrid>

      {/* Sec 2 */}
      <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
        <h2 className="text-xl font-bold">1.2 Dependent Information</h2>
        <Toggle
          isChecked={showAddDependent}
          onChange={() => handleShowAddDependent(!showAddDependent)}
          toggleName={statusReviewDependent}
        />
      </HeadingSecondarySectionDoubleGrid>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {showAddDependent ? <Dependent datas={dependant} /> : ""}
      </SectionCardSingleGrid>

      {/* Sec 3 */}
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        1.3 Client Accompainment Assestment
      </HeadingSecondarySection>
      <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
        <div>
          <Input
            className="mb-10"
            label="Age"
            type="text"
            placeholder="Below 62"
            value={accompaniment[0].age}
            handleChange={(event) => setData(event.target.value)}
          />
          <Select
            className="mb-10"
            label="Spoken English Language Proficiency"
            value={accompaniment[0].english_spoken}
            datas={englishLevel}
            handleChange={(event) => changeData(eval(event.target.value))}
          />
        </div>
        <div>
          <Select
            className="mb-10"
            label="Education Level"
            value={accompaniment[0].education_level}
            datas={educationLevel}
            handleChange={(event) => changeData(eval(event.target.value))}
          />
          <Select
            className="mb-10"
            label="Written English Language Proficiency"
            value={accompaniment[0].english_written}
            datas={englishLevel}
            handleChange={(event) => changeData(eval(event.target.value))}
          />
        </div>
      </SectionCardDoubleGrid>
      {/* Sec 4 */}
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        1.4 Trusted Individual
      </HeadingSecondarySection>
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
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default PersonalInformation;
