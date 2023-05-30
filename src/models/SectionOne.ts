export interface PersonalInformation {
  id: string;
  title: string;
  nric: string;
  sex: string;
  dob: string;
  nationality: string;
  passType: string;
  employmentStatus: string;
  employmentSector: string;
  companyName: string;
  contactDetailHome: string;
  registeredAddress: string;
  smoker: string;
  principalName: string;
  emailAddress: string;
  race: string;
  countryOfBirth: string;
  residencyStatus: string;
  maritalStatus: string;
  occupation: string;
  cpfEmployee: string;
  annualIncome: string;
  mobileNumber: string;
  mailingAddress: string;
}

export interface DependantInformation {
  id: string;
  relationship: string;
  nric: string;
  datOfBirth: string;
  sex: string;
  name: string;
  birthCertNumber: string;
  age: string;
  yearsToSupport: string;
}

export interface TrustedIndividual {
  id: string;
  name: string;
  nric: string;
  languageUsed: string;
  email: string;
  relationship: string;
  mobileNumber: string;
}
