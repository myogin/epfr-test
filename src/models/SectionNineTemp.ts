export interface AnnualGeneral {
  client: number;
  ammount: number;
}

export interface ProductRider {
  feature?: string;
  groupId?: number;
  name?: string;
  no: number;
  rowSpan?: number;
  typeProductCustom?: string;
}

export interface Benefits {
  benefitId?: number;
  content?: string;
  groupId?: number;
  id: number;
  no: number;
  productId: number;
  productName: number;
  recommendId: number;
  riderId: number;
  rowSpan: number;
  title?: string;
  mainProductName?: string;
}

export interface Risks {
  content?: string;
  groupId?: number;
  id: number;
  no: number;
  productId: number;
  productName: number;
  recommendId: number;
  riderId: number;
  riskId: number;
  rowSpan: number;
  title?: string;
  mainProductName?: string;
}

export interface SectionNineTemp {
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
  CISILPProducts: any[];
  CISProduct: any[];
  ILPProduct: any [];
  groups: any [];
  recommendedProduct: any[];
  rowGroups: any[];
  dataProductAndRiders: Array<ProductRider>
  dataBenefits: Array<Benefits>
  dataRisks: Array<Risks>
}
