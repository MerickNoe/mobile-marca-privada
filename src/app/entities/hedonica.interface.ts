export interface HedonicaTest {
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
    intensity: string;
    general: {
        max: string;
        min: string;
        point: number;
        scales: [];
    };
    hedonica: HedonicaDetail[];
    tipojar: TipoJarDetail[];
    attributes: string[];
}

export interface HedonicaDetail {
    attribute: string;
    max: string;
    min: string;
    point: number;
    scales: [];
    }


export interface TipoJarDetail {
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

export interface Intensity {
     name: string;
 }


export interface HedonicaAnswer {
    id?: string;
    test: string;
    date: string;
    name: string;
    hedonica: Hedonica[];
    tipoJar: TipoJar[];
    strange: StrangeModel[];
    general: number;
    corresponde: AceptationModel[];
    noCorresponde: AceptationModel[];
    otrosSi: string;
    otrosNo: string;
}

export interface TipoJar {
    attribute: string;
    point: number;
}

export interface Hedonica {
    attribute: string;
    point: number;
}

export interface StrangeModel {
    val: string;
    isChecked: boolean;
}

export interface AceptationModel {
    val: string;
    isChecked: boolean;
}


