export interface PareadaTest {
    id?: string;
    number: number;
    active: boolean;
    category: string;
    created: string;
    panelist: string;
    product: string;
    sample1: string;
    sample2: string;
    typetest: string;
    diminutivo: string;
    general: {
        max: string;
        min: string;
        point: number;
        scales: [];
    };
    tipojar: ComparacionPareadaTestDetail[];
}

export interface ComparacionPareadaTestDetail {
    attribute: string;
    high: string;
    low: string;
    scales: {
        jar1: string,
        jar2: string,
        jar3: string,
        jar4: string,
        jar5: string
    };
}

export interface CompareacionPareadaAnswer {
    id?: string;
    test: string;
    date: string;
    name: string;
    semejante1: string;
    semejante2: string;
    semejante3: string;
    semejante4: string;
    diferencia1: string;
    diferencia2: string;
    diferencia3: string;
    diferencia4: string;
    generalSample1: number;
    generalSample2: number;
    otrosSample1: string;
    otrosSample2: string;
    tipoJar: TipoJar[];
    negativePositive: NegativePositive[];
    strange1: StrangeModel[];
    strange2: StrangeModel[];
}

export interface TipoJar {
    attribute: string;
    point: number;
}

export interface NegativePositive {
    attribute: string;
    point: number;
}

export interface StrangeSensation {
    id?: string;
    options: [];
}

export interface StrangeModel {
            val: string;
            isChecked: boolean;
}

export interface OptionJar {
    attribute: string;
    selected: string;
}

export interface ResColor {
    attribute: string;
    color: string;
}
