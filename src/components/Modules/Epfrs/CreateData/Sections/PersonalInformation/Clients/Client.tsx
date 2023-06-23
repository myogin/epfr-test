import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React from "react";

const Client = () => {
  let {
    ownerId,
    type,
    id,
    clientInfo,
    reviewDate,
    status,
    setClient,
    setAccompaniment,
    setGlobal,
  } = usePersonalInformation();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata } = event.target.dataset;

    switch (groupdata) {
      case "clientInfo":
        setClient(0, name, value);

        if (name === "dateOfBirth") {
          console.log("masuk sini dob")
          countAgeClient(value);
        }

        if (name === "clientTitle") {
          updateGender(value);
        }
        break;
      case "generalInfo":
        setGlobal(name, value);
        break;
      default:
        setGlobal(name, value);
        break;
    }
  };

  const countAgeClient = (params : Date) => {
    let dob = new Date(params);
    let currentDate = new Date();

    console.log(dob);

    if (!isNaN(dob.getTime())) {

      console.log("Cek masuk sini nggak")
      const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
      const monthsDiff = currentDate.getMonth() - dob.getMonth();

      let calculatedAge = yearsDiff;

      if (
        monthsDiff < 0 ||
        (monthsDiff === 0 && currentDate.getDate() < dob.getDate())
      ) {
        calculatedAge--;
      }

      setAccompaniment(0, "age", calculatedAge);
    }
  };

  const updateGender = (value: number) => {
    if (value == 2 || value == 4 || value == 5) {
      setClient(0, "gender", 2);
    } else if (value == 3) {
      setClient(0, "gender", 1);
    }
  };

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

  let annualIncome: Array<any> = [
    { id: 1, name: "0 - 29,000" },
    { id: 2, name: "29,000 - 49,000" },
    { id: 3, name: "50,000 - 79,000" },
  ];
  return (
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
          name="businessNature"
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
  );
};

export default Client;
