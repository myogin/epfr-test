import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { getLength } from "@/libs/helper";
import { Clientformation } from "@/models/SectionOne";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React, { useEffect, useState } from "react";

interface Props {
  pfrType?: number;
}
const Client = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  let { id, clientInfo, reviewDate, setClient, setAccompaniment, setGlobal } =
    usePersonalInformation();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexdata } = event.target.dataset;

    switch (groupdata) {
      case "clientInfo":
        setClient(indexdata, name, value);

        if (name === "dateOfBirth") {
          countAgeClient(indexdata, value);
        }

        if (name === "clientTitle") {
          updateGender(indexdata, value);
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

  const countAgeClient = (index: number, params: Date) => {
    let dob = new Date(params);
    let currentDate = new Date();

    console.log(dob);

    if (!isNaN(dob.getTime())) {
      const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
      const monthsDiff = currentDate.getMonth() - dob.getMonth();

      let calculatedAge = yearsDiff;

      if (
        monthsDiff < 0 ||
        (monthsDiff === 0 && currentDate.getDate() < dob.getDate())
      ) {
        calculatedAge--;
      }

      let groupAge: number = 0;

      if (calculatedAge >= 62) {
        groupAge = 1;
      }

      setAccompaniment(index, "age", groupAge);
    }
  };

  const updateGender = (index: number, value: number) => {
    if (value == 1 || value == 3 || value == 4) {
      setClient(index, "gender", 1);
    } else if (value == 2) {
      setClient(index, "gender", 0);
    }
  };

  let clientTitles: Array<any> = [
    { id: 0, name: "Dr" },
    { id: 1, name: "Mdm" },
    { id: 2, name: "Mr" },
    { id: 3, name: "Ms" },
    { id: 4, name: "Mrs" },
  ];

  let clientSex: Array<any> = [
    { id: 0, name: "Man" },
    { id: 1, name: "Female" },
  ];

  let clientSmoker: Array<any> = [
    { id: 1, name: "Yes" },
    { id: 0, name: "No" },
  ];

  let country: Array<any> = [
    { id: 1, name: "Singaporean" },
    { id: 2, name: "Malay" },
    { id: 3, name: "Thailand" },
  ];

  let recidence: Array<any> = [
    { id: 0, name: "Singapore Citizen" },
    { id: 1, name: "Singapore PR" },
    { id: 2, name: "Foreigner" },
  ];

  let marital: Array<any> = [
    { id: 0, name: "Single" },
    { id: 1, name: "Meried" },
    { id: 2, name: "Widowed" },
    { id: 3, name: "Divorced" },
  ];

  let employment: Array<any> = [
    { id: 0, name: "Full Time" },
    { id: 1, name: "Part Time" },
    { id: 2, name: "Self-Employed" },
    { id: 3, name: "Retired" },
    { id: 4, name: "Unemployed" },
    { id: 5, name: "Others" },
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
    { id: 0, name: "0 ~ 29,999" },
    { id: 1, name: "30,000 ~ 49,999" },
    { id: 2, name: "50,000 ~ 99,999" },
    { id: 3, name: "100,000 ~ 149,999" },
    { id: 4, name: "150,000 ~ 299,999" },
    { id: 5, name: "300,000 ~" },
  ];

  let relationships: Array<any> = [
    { id: 0, name: "Spouse" },
    { id: 1, name: "Child" },
    { id: 2, name: "Parent" },
    { id: 3, name: "Others" },
  ];

  return (
    <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
      {props.pfrType === 1 ? (
        <>
          <div>
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Title"
              name="clientTitle"
              indexData={0}
              value={clientInfo[0].clientTitle}
              datas={clientTitles}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].clientTitle === "" ||
                clientInfo[0].clientTitle === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="NRIC / FIN"
              type="text"
              name="passportNo"
              indexData={0}
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
              indexData={0}
              value={clientInfo[0].gender}
              datas={clientSex}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].gender === "" || clientInfo[0].gender === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              indexData={0}
              value={clientInfo[0].dateOfBirth}
              placeholder="01 January 1998"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].dateOfBirth === "" ||
                clientInfo[0].dateOfBirth === "-"
                  ? false
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Nationality"
              name="nationality"
              indexData={0}
              value={clientInfo[0].nationality}
              datas={country}
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Pass Type"
              name="residency"
              indexData={0}
              value={clientInfo[0].residency}
              datas={recidence}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].residency === "" ||
                clientInfo[0].residency === "-"
                  ? false
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="employmentStatus"
              indexData={0}
              label="Employment Status"
              value={clientInfo[0].employmentStatus}
              datas={employment}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].employmentStatus === "" ||
                clientInfo[0].employmentStatus === "-"
                  ? false
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Employment Sector"
              name="businessNature"
              indexData={0}
              value={clientInfo[0].businessNature}
              datas={employmentSector}
              handleChange={handleInputChange}
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Annual Income"
              name="annualIncome"
              indexData={0}
              value={clientInfo[0].annualIncome}
              datas={annualIncome}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].annualIncome === "" ||
                clientInfo[0].annualIncome === "-"
                  ? false
                  : true
              }
            />

            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Mobile Number"
              type="text"
              name="contactMobile"
              indexData={0}
              value={clientInfo[0].contactMobile}
              placeholder="2121921298"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].contactMobile === "" ||
                clientInfo[0].contactMobile === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Mailing Address"
              type="text"
              name="mailingAddr"
              indexData={0}
              value={clientInfo[0].mailingAddr}
              placeholder="Set as same like registered address"
              handleChange={handleInputChange}
            />
            <Input
              dataType="generalInfo"
              className="mb-10"
              label="Review Date"
              type="date"
              name="reviewDate"
              indexData={0}
              value={reviewDate}
              placeholder="01 January 1998"
              handleChange={handleInputChange}
              needValidation={true}
              logic={reviewDate === "" || reviewDate === "-" ? false : true}
            />
          </div>
          <div>
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Principal Name"
              type="text"
              name="clientName"
              indexData={0}
              value={clientInfo[0].clientName}
              placeholder="Margo Madison"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].clientName === "" ||
                clientInfo[0].clientName === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Email Address"
              type="text"
              name="email"
              indexData={0}
              value={clientInfo[0].email}
              placeholder="margomadison@gmail.com"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].email === "" || clientInfo[0].email === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Race"
              name="race"
              type="text"
              indexData={0}
              value={clientInfo[0] ? clientInfo[0].race : ""}
              placeholder="Chinesse"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0]
                  ? clientInfo[0].race === "" || clientInfo[0].race === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Country of Birth"
              name="birthCountryId"
              indexData={0}
              value={clientInfo[0] ? clientInfo[0].birthCountryId : ""}
              datas={country}
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Residency Status"
              name="residencyTwo"
              indexData={0}
              value={clientInfo[0].residencyTwo}
              datas={recidence}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].residencyTwo === "" ||
                clientInfo[0].residencyTwo === "-"
                  ? false
                  : true
              }
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Marital Status"
              name="marital"
              indexData={0}
              value={clientInfo[0].marital}
              datas={marital}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].marital === "" || clientInfo[0].marital === "-"
                  ? false
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Occupation"
              type="text"
              name="occupation"
              indexData={0}
              value={clientInfo[0].occupation}
              placeholder="Manager"
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="companyName"
              indexData={0}
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
              indexData={0}
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
              indexData={0}
              value={clientInfo[0].residentialAddr}
              placeholder="Singapore"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].residentialAddr === "" ||
                clientInfo[0].residentialAddr === "-"
                  ? false
                  : true
              }
            />

            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Smoker"
              name="smoker"
              indexData={0}
              value={clientInfo[0].smoker}
              datas={clientSmoker}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[0].smoker === "" || clientInfo[0].smoker === "-"
                  ? false
                  : true
              }
            />
          </div>
        </>
      ) : (
        getPfrLength?.length &&
        getPfrLength.map((data, index) => (
          <div key={"asasa"+index}>
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Title"
              name="clientTitle"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].clientTitle : ""}
              datas={clientTitles}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].clientTitle === "" ||
                    clientInfo[index].clientTitle === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Principal Name"
              type="text"
              name="clientName"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].clientName : ""}
              placeholder="Margo Madison"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].clientName === "" ||
                    clientInfo[index].clientName === "-"
                    ? false
                    : true
                  : true
              }
            />

            <Input
              dataType="clientInfo"
              className="mb-10"
              label="NRIC / FIN"
              type="text"
              name="passportNo"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].passportNo : ""}
              placeholder="12981289129"
              handleChange={handleInputChange}
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Email Address"
              type="text"
              name="email"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].email : ""}
              placeholder="margomadison@gmail.com"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].email === "" ||
                    clientInfo[index].email === "-"
                    ? false
                    : true
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Sex"
              name="gender"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].gender : ""}
              datas={clientSex}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].gender === "" ||
                    clientInfo[index].gender === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Race"
              name="race"
              type="text"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].race : ""}
              placeholder="Chinesse"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].race === "" ||
                    clientInfo[index].race === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].dateOfBirth : ""}
              placeholder="01 January 1998"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].dateOfBirth === "" ||
                    clientInfo[index].dateOfBirth === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Country of Birth"
              name="birthCountryId"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].birthCountryId : ""}
              datas={country}
              handleChange={handleInputChange}
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Nationality"
              name="nationality"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].nationality : ""}
              datas={country}
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Residency Status"
              name="residencyTwo"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].residencyTwo : ""}
              datas={recidence}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].residencyTwo === "" ||
                    clientInfo[index].residencyTwo === "-"
                    ? false
                    : true
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Pass Type"
              name="residency"
              indexData={index}
              value={clientInfo[index].residency}
              datas={recidence}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index].residency === "" ||
                clientInfo[index].residency === "-"
                  ? false
                  : true
              }
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Marital Status"
              name="marital"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].marital : ""}
              datas={marital}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].marital === "" ||
                    clientInfo[index].marital === "-"
                    ? false
                    : true
                  : true
              }
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="employmentStatus"
              indexData={index}
              label="Employment Status"
              value={
                clientInfo[index] ? clientInfo[index].employmentStatus : ""
              }
              datas={employment}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].employmentStatus === "" ||
                    clientInfo[index].employmentStatus === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Occupation"
              type="text"
              name="occupation"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].occupation : ""}
              placeholder="Manager"
              handleChange={handleInputChange}
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Employment Sector"
              name="businessNature"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].businessNature : ""}
              datas={employmentSector}
              handleChange={handleInputChange}
            />
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="companyName"
              indexData={index}
              label="Company Name"
              value={clientInfo[index] ? clientInfo[index].companyName : ""}
              datas={companyMaster}
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Annual Income"
              name="annualIncome"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].annualIncome : ""}
              datas={annualIncome}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].annualIncome === "" ||
                    clientInfo[index].annualIncome === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Contact Detail [Home]"
              type="text"
              name="contactHome"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].contactHome : ""}
              placeholder="981271291"
              handleChange={handleInputChange}
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Mobile Number"
              type="text"
              name="contactMobile"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].contactMobile : ""}
              placeholder="2121921298"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].contactMobile === "" ||
                    clientInfo[index].contactMobile === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Registered Address"
              type="text"
              name="residentialAddr"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].residentialAddr : ""}
              placeholder="Singapore"
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].residentialAddr === "" ||
                    clientInfo[index].residentialAddr === "-"
                    ? false
                    : true
                  : true
              }
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Mailing Address"
              type="text"
              name="mailingAddr"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].mailingAddr : ""}
              placeholder="Set as same like registered address"
              handleChange={handleInputChange}
            />
            {/* Selected Form */}

            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Smoker"
              name="smoker"
              indexData={index}
              value={clientInfo[index] ? clientInfo[index].smoker : ""}
              datas={clientSmoker}
              handleChange={handleInputChange}
              needValidation={true}
              logic={
                clientInfo[index]
                  ? clientInfo[index].smoker === "" ||
                    clientInfo[index].smoker === "-"
                    ? false
                    : true
                  : true
              }
            />
            {index === 0 ? (
              <Input
                dataType="generalInfo"
                className="mb-10"
                label="Review Date"
                type="date"
                name="reviewDate"
                value={reviewDate}
                placeholder="01 January 1998"
                handleChange={handleInputChange}
                needValidation={true}
                logic={reviewDate === "" || reviewDate === "-" ? false : true}
              />
            ) : (
              ""
            )}
            {index === 1 ? (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Relationship To Client 1"
                name="relationship"
                indexData={index}
                value={clientInfo[index] ? clientInfo[index].relationship : ""}
                datas={relationships}
                handleChange={handleInputChange}
                needValidation={true}
                logic={
                  clientInfo[index]
                    ? clientInfo[index].relationship === "" ||
                      clientInfo[index].relationship === "-"
                      ? false
                      : true
                    : true
                }
              />
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </SectionCardDoubleGrid>
  );
};

export default Client;
