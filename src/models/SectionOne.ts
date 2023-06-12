export interface PersonalInformation {
  id?: string;
  clientTitle: string;
  clientName: string;
  otherName: string;
  relationship: string;
  gender: string;
  passportNo: string;
  nationality: string;
  residency: string;
  residencyTwo: string;
  residencyOther: string;
  dateOfBirth: string;
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
}
export interface DependantInformation {
  id?: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  year: string;
}

export interface Accompaniment {
  age: number;
  english_spoken: string;
  english_written: string;
  education_level: string;
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
  declaration: number;
}

export interface SectionOne {
  ownerId: number;
  type: number;
  id: number;
  clientInfo: PersonalInformation[];
  dependant: DependantInformation[];
  accompaniment: Accompaniment[];
  trustedIndividuals: TrustedIndividual[];
  issues: [];
  reviewDate: string;
  status: number;
}
