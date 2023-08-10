export interface Clientformation {
  id?: string;
  clientTitle: string;
  clientName: string;
  otherName: string;
  relationship: string;
  race: string;
  gender: string;
  passportNo: string;
  nationality: string;
  residency: string;
  residencyTwo: string;
  residencyOther: string;
  dateOfBirth: string;
  birthCountryId: number;
  marital: string;
  smoker: string;
  employmentStatus: string;
  occupation: string;
  companyName: string;
  businessNature: string;
  annualIncome: string;
  contactHome: string;
  contactMobile: string;
  contactOffice: string;
  contactFax: string;
  email: string;
  residentialAddr: string;
  mailingAddr: string;
  clientPfr: string;
}

export interface ClientformationSingpass {
  passportNo: boolean;
  clientName: boolean;
  gender: boolean;
  dateOfBirth: boolean;
  race: boolean;
  birthCountryId: boolean;
  residencyTwo: boolean;
  nationality: boolean;
  contactMobile: boolean;
  residency: boolean;
  email: boolean;
  businessNature: boolean;
  residentialAddr: boolean;
  cpfEmployer : boolean;
  residencyOther: boolean;
  marital: boolean;
  employmentStatus: boolean;
  occupation: boolean;
  companyName: boolean;
  clientPfr: string;
}
export interface DependantInformation {
  id?: number;
  name: string;
  relationship: string;
  dateOfBirth: string;
  certNumber: string;
  sponsored: string;
  nric: string;
  age: number;
  gender: string;
  year: string;
  clientPfr: string;
  client: number;
  depId?: number;
}

export interface Accompaniment {
  clientType:number;
  age: number;
  english_spoken: string;
  english_written: string;
  education_level: string;
  clientPfr: string;
}

export interface TrustedIndividual {
  id?: string;
  condition1: boolean;
  condition2: boolean;
  trustedEmail: string;
  nameOfTrustedIndividual: string;
  passportNo: string;
  relationship: string;
  languageUsed: string;
  contactNumber: string;
  englishLevel1: number;
  englishLevel2: number;
  educationLevel: number;
  ageLevel: number;
  declaration: boolean;
}

export interface SectionOne {
  ownerId?: number;
  type?: number;
  id?: number;
  clientInfo: Clientformation[];
  clientInfoSingpass: ClientformationSingpass[];
  dependant: DependantInformation[];
  accompaniment: Accompaniment[];
  trustedIndividuals: TrustedIndividual;
  issues?: [];
  reviewDate?: string;
  status?: number;
  editableStatus?: number;
}
