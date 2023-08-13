export interface AnnualGeneral {
  client: number;
  ammount: number;
}

export interface SectionEightTemp {
  id?: number;
  annualIncome: AnnualGeneral[];
  annualExpense: AnnualGeneral[];
  asset: AnnualGeneral[];
  loan: AnnualGeneral[];
  summaryOfSRS: AnnualGeneral[];
  summaryOfCpfOa: AnnualGeneral[];
  summaryOfCpfSa: AnnualGeneral[];
  summaryOfCpfMedisave: AnnualGeneral[];
  summaryOfSaving: AnnualGeneral[];
}
