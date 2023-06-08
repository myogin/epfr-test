interface AdditionalMaternityPlan {
    id?: string;
    clients: Array<any>;
    dependants: Array<any>;
    key: string;
}

interface Answer {
    additionalMaternityPlan: AdditionalMaternityPlan[];
}

export interface SectionSeven {
    id: number;
    answer: Answer[];
}

