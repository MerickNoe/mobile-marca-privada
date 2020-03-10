export interface ChildrenTest {
    id?: string;
    active: boolean;
    number: number;
    created: string;
    panelist: string;
    product: string;
    category: string;
    scales: {
        scale1: string,
        scale2: string,
        scale3: string,
        scale4: string,
        scale5: string
    };
    sample1: string;
    sample2: string;
    mix: number;
}

export interface ChildrenAnswer {
    id?: string;
    test: string;
    date: string;
    name: string;
    general: number;
}

export interface ChildrenAnswerMix {
    id?: string;
    test: string;
    date: string;
    name: string;
    generalMix1: number;
    generalMix2: number;
}
