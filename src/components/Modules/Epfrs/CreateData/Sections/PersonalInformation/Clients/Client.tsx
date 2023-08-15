import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import SelectNationality from "@/components/Forms/SelectNationality";
import { getLength } from "@/libs/helper";
import { getAllCountry } from "@/services/countryService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import React, { Fragment, useEffect, useState } from "react";

interface Props {
  pfrType?: number;
}
const Client = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  let {
    id,
    clientInfo,
    clientInfoSingpass,
    reviewDate,
    setClient,
    setAccompaniment,
    setTrustedIndividuals,
    setGlobal,
  } = usePersonalInformation();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexclient } = event.target.dataset;

    switch (groupdata) {
      case "clientInfo":
        setClient(indexclient, name, value);

        if (name === "dateOfBirth") {
          countAgeClient(indexclient, value);
        }

        if (name === "clientTitle") {
          updateGender(indexclient, value);
        }

        if (name === "nationality") {
          updateResidentialStatus(indexclient, value);
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
      setTrustedIndividuals("ageLevel", groupAge);
    }
  };

  const updateGender = (index: number, value: number) => {
    if (value == 1 || value == 3 || value == 4) {
      setClient(index, "gender", 1);
    } else if (value == 2) {
      setClient(index, "gender", 0);
    }
  };

  const updateResidentialStatus = (index: number, value: string) => {
    if (value === "Singaporean") {
      setClient(index, "residencyTwo", 0);
    } else {
      setClient(index, "residencyTwo", "-");
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

  let passTypes: Array<any> = [
    { id: 1, name: "Employment Pass" },
    { id: 2, name: "S-Pass" },
    { id: 3, name: "Work Permit" },
    { id: 4, name: "Dependant's Pass" },
    { id: 5, name: "Student Pass" },
    { id: 6, name: "Others" },
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

  let [countries, setCounties] = useState<Array<any>>([]);

  const getCountryOfBirth = async () => {
    let arrCountry: any[] = [];

    try {
      let countries = await getAllCountry();

      let countriesData: any[] = countries.birthCountry;

      if (countriesData.length > 0) {
        countriesData.map((data, index) => {
          arrCountry.push({ id: data.id, name: data.title });
        });
      }

      setCounties(arrCountry);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountryOfBirth();
  }, []);

  return (
    <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
      {props.pfrType === 1 ? (
        <Fragment>
          <div>
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Title"
              name="clientTitle"
              indexClient={0}
              value={
                clientInfo[0] && Number(clientInfo[0].clientTitle) >= 0
                  ? clientInfo[0].clientTitle
                  : "-"
              }
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
              readonly={clientInfoSingpass[0].passportNo}
              dataType="clientInfo"
              className="mb-10"
              label="NRIC / FIN"
              type="text"
              name="passportNo"
              indexClient={0}
              value={clientInfo[0].passportNo}
              placeholder="12981289129"
              handleChange={handleInputChange}
            />

            {/* Selected Form */}
            {clientInfoSingpass[0].gender ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Sex"
                type="text"
                name="gender"
                indexClient={0}
                value={
                  clientInfo[0] && Number(clientInfo[0].gender) >= 0
                    ? clientSex[Number(clientInfo[0].gender)].name
                    : ""
                }
                placeholder="Male"
              />
            ) : (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Sex"
                name="gender"
                indexClient={0}
                value={
                  clientInfo[0] && Number(clientInfo[0].gender) >= 0
                    ? clientInfo[0].gender
                    : "-"
                }
                datas={clientSex}
                handleChange={handleInputChange}
                needValidation={true}
                logic={
                  clientInfo[0].gender === "" || clientInfo[0].gender === "-"
                    ? false
                    : true
                }
              />
            )}

            <Input
              readonly={clientInfoSingpass[0].dateOfBirth}
              dataType="clientInfo"
              className="mb-10"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              indexClient={0}
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
            {clientInfoSingpass[0].nationality ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Nationality"
                type="text"
                name="nationality"
                indexClient={0}
                value={clientInfo[0].nationality}
                placeholder="Nationality"
              />
            ) : (
              <SelectNationality
                dataType="clientInfo"
                className="mb-10"
                label="Nationality"
                name="nationality"
                indexClient={0}
                value={
                  clientInfo[0] && clientInfo[0].nationality !== ""
                    ? clientInfo[0].nationality
                    : "-"
                }
                handleChange={handleInputChange}
                needValidation={true}
                logic={
                  clientInfo[0].nationality === "" ||
                  clientInfo[0].nationality === "-"
                    ? false
                    : true
                }
              />
            )}
            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="employmentStatus"
              indexClient={0}
              label="Employment Status"
              value={
                clientInfo[0] && Number(clientInfo[0].employmentStatus) >= 0
                  ? clientInfo[0].employmentStatus
                  : "-"
              }
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

            <Input
              readonly={clientInfoSingpass[0].businessNature}
              dataType="clientInfo"
              className="mb-10"
              label="Business Nature"
              type="text"
              name="businessNature"
              indexClient={0}
              value={clientInfo[0] ? clientInfo[0].businessNature : ""}
              placeholder="Financial"
              handleChange={handleInputChange}
            />

            {/* Selected Form */}
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Annual Income"
              name="annualIncome"
              indexClient={0}
              value={
                clientInfo[0] && Number(clientInfo[0].annualIncome) >= 0
                  ? clientInfo[0].annualIncome
                  : "-"
              }
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
              indexClient={0}
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
              indexClient={0}
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
              indexClient={0}
              value={reviewDate}
              placeholder="01 January 1998"
              handleChange={handleInputChange}
              needValidation={true}
              logic={reviewDate === "" || reviewDate === "-" ? false : true}
            />
          </div>
          <div>
            <Input
              readonly={clientInfoSingpass[0].clientName}
              dataType="clientInfo"
              className="mb-10"
              label="Full Name"
              type="text"
              name="clientName"
              indexClient={0}
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
              indexClient={0}
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
              readonly={clientInfoSingpass[0].race}
              dataType="clientInfo"
              className="mb-10"
              label="Race"
              name="race"
              type="text"
              indexClient={0}
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

            {clientInfoSingpass[0].birthCountryId ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Country of Birth"
                type="text"
                name="birthCountryId"
                indexClient={0}
                value={
                  clientInfo[0] && Number(clientInfo[0].birthCountryId) >= 0
                    ? clientInfo[0].birthCountryId
                    : ""
                }
                placeholder="Male"
              />
            ) : (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Country of Birth"
                name="birthCountryId"
                indexClient={0}
                value={
                  clientInfo[0]
                    ? clientInfo[0].birthCountryId
                      ? clientInfo[0].birthCountryId
                      : "-"
                    : "-"
                }
                datas={countries}
                handleChange={handleInputChange}
              />
            )}

            {clientInfoSingpass[0].residencyTwo ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Residential Status"
                type="text"
                name="residencyTwo"
                indexClient={0}
                value={
                  clientInfo[0] && Number(clientInfo[0].residencyTwo) >= 0
                    ? recidence[Number(clientInfo[0].residencyTwo)].name
                    : ""
                }
                placeholder="recidency status"
              />
            ) : (
              <>
                {clientInfo[0].nationality === "Singaporean" ? (
                  <Input
                    readonly={true}
                    dataType="clientInfo"
                    className="mb-10"
                    label="Residential Status"
                    type="text"
                    name="residencyTwo"
                    indexClient={0}
                    value={
                      Number(clientInfo[0].residencyTwo) === 0
                        ? "Singapore Citizen"
                        : ""
                    }
                    placeholder="recidency status"
                  />
                ) : (
                  <Select
                    dataType="clientInfo"
                    className="mb-10"
                    label="Residential Status"
                    name="residencyTwo"
                    indexClient={0}
                    value={
                      clientInfo[0]
                        ? Number(clientInfo[0].residencyTwo) >= 0
                          ? clientInfo[0].residencyTwo
                          : "-"
                        : "-"
                    }
                    datas={recidence}
                    handleChange={handleInputChange}
                    needValidation={true}
                    logic={
                      clientInfo[0]
                        ? clientInfo[0].residencyTwo === "" ||
                          clientInfo[0].residencyTwo === "-"
                          ? false
                          : true
                        : true
                    }
                  />
                )}
              </>
            )}

            {Number(clientInfo[0].residencyTwo) === 2 ? (
              <>
                {clientInfoSingpass[0].residency ? (
                  <Input
                    readonly={true}
                    dataType="clientInfo"
                    className="mb-10"
                    label="Pass Type"
                    type="text"
                    name="residency"
                    indexClient={0}
                    value={clientInfo[0].residency}
                    placeholder="pass type"
                  />
                ) : (
                  <>
                    <Select
                      dataType="clientInfo"
                      className="mb-10"
                      label="Pass Type"
                      name="residency"
                      indexClient={0}
                      value={
                        clientInfo[0].residency ? clientInfo[0].residency : "-"
                      }
                      datas={passTypes}
                      handleChange={handleInputChange}
                      needValidation={true}
                      logic={
                        clientInfo[0].residency === "" ||
                        clientInfo[0].residency === "-"
                          ? false
                          : true
                      }
                    />
                    {Number(clientInfo[0].residency) === 6 ? (
                      <Input
                        dataType="clientInfo"
                        className="mb-10"
                        label="Other Pass Type"
                        type="text"
                        name="residencyOther"
                        indexClient={0}
                        value={clientInfo[0].residencyOther}
                        placeholder="pass type"
                        needValidation={true}
                        handleChange={handleInputChange}
                        logic={
                          clientInfo[0].residencyOther === "" ||
                          clientInfo[0].residencyOther === "-"
                            ? false
                            : true
                        }
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            ) : (
              ""
            )}

            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Marital Status"
              name="marital"
              indexClient={0}
              value={
                clientInfo[0] && Number(clientInfo[0].marital) >= 0
                  ? clientInfo[0].marital
                  : "-"
              }
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
              readonly={clientInfoSingpass[0].occupation}
              dataType="clientInfo"
              className="mb-10"
              label="Occupation"
              type="text"
              name="occupation"
              indexClient={0}
              value={clientInfo[0].occupation}
              placeholder="Manager"
              handleChange={handleInputChange}
            />
            <Input
              readonly={clientInfoSingpass[0].companyName}
              dataType="clientInfo"
              className="mb-10"
              label="Company Name"
              type="text"
              name="companyName"
              indexClient={0}
              value={clientInfo[0].companyName}
              placeholder="your company here"
              handleChange={handleInputChange}
            />
            <Input
              dataType="clientInfo"
              className="mb-10"
              label="Contact Detail [Home]"
              type="text"
              name="contactHome"
              indexClient={0}
              value={clientInfo[0].contactHome}
              placeholder="981271291"
              handleChange={handleInputChange}
            />
            <Input
              readonly={clientInfoSingpass[0].residentialAddr}
              dataType="clientInfo"
              className="mb-10"
              label="Residential Address"
              type="text"
              name="residentialAddr"
              indexClient={0}
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
              indexClient={0}
              value={
                clientInfo[0] && Number(clientInfo[0].smoker) >= 0
                  ? clientInfo[0].smoker
                  : "-"
              }
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
        </Fragment>
      ) : (
        getPfrLength?.length &&
        getPfrLength.map((data, index) => (
          <div key={"asasa" + index}>
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Title"
              name="clientTitle"
              indexClient={index}
              value={
                clientInfo[index]
                  ? Number(clientInfo[index].clientTitle) >= 0
                    ? clientInfo[index].clientTitle
                    : "-"
                  : "-"
              }
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
              readonly={clientInfoSingpass[index].clientName}
              dataType="clientInfo"
              className="mb-10"
              label="Full Name"
              type="text"
              name="clientName"
              indexClient={index}
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
              readonly={clientInfoSingpass[index].passportNo}
              dataType="clientInfo"
              className="mb-10"
              label="NRIC / FIN"
              type="text"
              name="passportNo"
              indexClient={index}
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
              indexClient={index}
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
            {clientInfoSingpass[index].gender ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Sex"
                type="text"
                name="gender"
                indexClient={index}
                value={
                  clientInfo[index] && Number(clientInfo[index].gender) >= 0
                    ? clientSex[Number(clientInfo[index].gender)].name
                    : ""
                }
                placeholder="Male"
              />
            ) : (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Sex"
                name="gender"
                indexClient={index}
                value={
                  clientInfo[index]
                    ? Number(clientInfo[index].gender) >= 0
                      ? clientInfo[index].gender
                      : "-"
                    : "-"
                }
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
            )}

            <Input
              readonly={clientInfoSingpass[index].race}
              dataType="clientInfo"
              className="mb-10"
              label="Race"
              name="race"
              type="text"
              indexClient={index}
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
              readonly={clientInfoSingpass[index].dateOfBirth}
              dataType="clientInfo"
              className="mb-10"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              indexClient={index}
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

            {clientInfoSingpass[index].birthCountryId ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Country of Birth"
                type="text"
                name="birthCountryId"
                indexClient={index}
                value={
                  clientInfo[index] &&
                  Number(clientInfo[index].birthCountryId) >= 0
                    ? clientInfo[index].birthCountryId
                    : ""
                }
                placeholder="Male"
              />
            ) : (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Country of Birth"
                name="birthCountryId"
                indexClient={index}
                value={
                  clientInfo[index]
                    ? Number(clientInfo[index].birthCountryId) >= 0
                      ? clientInfo[index].birthCountryId
                      : "-"
                    : "-"
                }
                datas={countries}
                handleChange={handleInputChange}
              />
            )}

            {clientInfoSingpass[index].nationality ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Nationality"
                type="text"
                name="nationality"
                indexClient={index}
                value={clientInfo[index].nationality}
                placeholder="Nationality"
              />
            ) : (
              <SelectNationality
                dataType="clientInfo"
                className="mb-10"
                label="Nationality"
                name="nationality"
                indexClient={index}
                value={clientInfo[index] &&
                  clientInfo[index].nationality !== ""
                    ? clientInfo[index].nationality
                    : "-"
                }
                handleChange={handleInputChange}
                needValidation={true}
                logic={
                  clientInfo[index].nationality === "" ||
                  clientInfo[index].nationality === "-"
                    ? false
                    : true
                }
              />
            )}

            {clientInfoSingpass[0].residencyTwo ? (
              <Input
                readonly={true}
                dataType="clientInfo"
                className="mb-10"
                label="Residential Status"
                type="text"
                name="residencyTwo"
                indexClient={index}
                value={clientInfo[index] && Number(clientInfo[index].residencyTwo) >= 0
                  ? recidence[Number(clientInfo[index].residencyTwo)].name
                  : ""
              }
                placeholder="recidency status"
              />
            ) : (
              <Select
                dataType="clientInfo"
                className="mb-10"
                label="Residential Status"
                name="residencyTwo"
                indexClient={index}
                value={
                  clientInfo[index]
                    ? Number(clientInfo[index].residencyTwo) >= 0
                      ? clientInfo[index].residencyTwo
                      : "-"
                    : "-"
                }
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
            )}

            {Number(clientInfo[index].residencyTwo) === 2 ? (
              <>
                {clientInfoSingpass[index].residency ? (
                  <Input
                    readonly={true}
                    dataType="clientInfo"
                    className="mb-10"
                    label="Pass Type"
                    type="text"
                    name="residency"
                    indexClient={index}
                    value={clientInfo[index].residency}
                    placeholder="pass type"
                  />
                ) : (
                  <>
                    <Select
                      dataType="clientInfo"
                      className="mb-10"
                      label="Pass Type"
                      name="residency"
                      indexClient={index}
                      value={
                        clientInfo[index].residency
                          ? clientInfo[index].residency
                          : "-"
                      }
                      datas={passTypes}
                      handleChange={handleInputChange}
                      needValidation={true}
                      logic={
                        clientInfo[index].residency === "" ||
                        clientInfo[index].residency === "-"
                          ? false
                          : true
                      }
                    />

                    {Number(clientInfo[index].residency) === 6 ? (
                      <Input
                        dataType="clientInfo"
                        className="mb-10"
                        label="Other Pass Type"
                        type="text"
                        name="residencyOther"
                        indexClient={index}
                        value={clientInfo[index].residencyOther}
                        placeholder="pass type"
                        needValidation={true}
                        handleChange={handleInputChange}
                        logic={
                          clientInfo[index].residencyOther === "" ||
                          clientInfo[index].residencyOther === "-"
                            ? false
                            : true
                        }
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            ) : (
              ""
            )}

            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Marital Status"
              name="marital"
              indexClient={index}
              value={
                clientInfo[index]
                  ? Number(clientInfo[index].marital) >= 0
                    ? clientInfo[index].marital
                    : "-"
                  : "-"
              }
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
            <Select
              dataType="clientInfo"
              className="mb-10"
              name="employmentStatus"
              indexClient={index}
              label="Employment Status"
              value={
                clientInfo[index]
                  ? Number(clientInfo[index].employmentStatus) >= 0
                    ? clientInfo[index].employmentStatus
                    : "-"
                  : "-"
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
              readonly={clientInfoSingpass[index].occupation}
              dataType="clientInfo"
              className="mb-10"
              label="Occupation"
              type="text"
              name="occupation"
              indexClient={index}
              value={clientInfo[index] ? clientInfo[index].occupation : ""}
              placeholder="Manager"
              handleChange={handleInputChange}
            />

            <Input
              readonly={clientInfoSingpass[index].businessNature}
              dataType="clientInfo"
              className="mb-10"
              label="Business Nature"
              type="text"
              name="businessNature"
              indexClient={index}
              value={clientInfo[index] ? clientInfo[index].businessNature : ""}
              placeholder="Financial"
              handleChange={handleInputChange}
            />

            <Input
              readonly={clientInfoSingpass[index].companyName}
              dataType="clientInfo"
              className="mb-10"
              label="Company Name"
              type="text"
              name="companyName"
              indexClient={index}
              value={clientInfo[index] ? clientInfo[index].companyName : ""}
              placeholder="your company here"
              handleChange={handleInputChange}
            />
            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Annual Income"
              name="annualIncome"
              indexClient={index}
              value={
                clientInfo[index]
                  ? Number(clientInfo[index].annualIncome) >= 0
                    ? clientInfo[index].annualIncome
                    : "-"
                  : "-"
              }
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
              indexClient={index}
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
              indexClient={index}
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
              readonly={clientInfoSingpass[index].residentialAddr}
              dataType="clientInfo"
              className="mb-10"
              label="Residential Address"
              type="text"
              name="residentialAddr"
              indexClient={index}
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
              indexClient={index}
              value={clientInfo[index] ? clientInfo[index].mailingAddr : ""}
              placeholder="Set as same like registered address"
              handleChange={handleInputChange}
            />

            <Select
              dataType="clientInfo"
              className="mb-10"
              label="Smoker"
              name="smoker"
              indexClient={index}
              value={
                clientInfo[index]
                  ? Number(clientInfo[index].smoker) >= 0
                    ? clientInfo[index].smoker
                    : "-"
                  : "-"
              }
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
                logic={reviewDate === "" || reviewDate === null ? false : true}
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
                indexClient={index}
                value={
                  clientInfo[index]
                    ? Number(clientInfo[index].relationship) >= 0
                      ? clientInfo[index].relationship
                      : "-"
                    : "-"
                }
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
