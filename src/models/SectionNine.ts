// Generated by https://quicktype.io

interface Section9 {
    pfrId:              number;
    overView1:          string;
    overView2:          string;
    reasonForBenefit:   string;
    reasonForRisk:      string;
    reasonForDeviation: string;
    checkedData:        CheckedDatum[];
    issues:             any[];
    deviates:           any[];
    deviationChanged:   boolean;
    status:             number;
}

interface CheckedDatum {
    id:      number;
    checked: number;
}

export interface SectionNine {
    section9: Section9;
}
