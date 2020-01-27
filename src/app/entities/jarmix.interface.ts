export interface JarMixTest {
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
    jarmix: number;
    general: {
        max: string;
        min: string;
        point: number;
        scales: [];
    };

    jars: ScaleJar[];

}

export interface ScaleJar {
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
export interface JarMixAnswer {
    id?: string;
    test: string;
    date: string;
    name: string;
    generalSample: number;
    jars: TipoJar[];
    agrado1: string;
    agrado2: string;
    agrado3: string;
    agrado4: string;
    desagrado1: string;
    desagrado2: string;
    desagrado3: string;
    desagrado4: string;
    comprar: boolean;
    consumir: boolean;
}

export interface TipoJar {
    attribute: string;
    point: number;
}

export interface JarMix2Answer {
    id?: string;
    test: string;
    date: string;
    name: string;
    generalSample1: number;
    generalSample2: number;
    jarsSample1: TipoJar[];
    jarsSample2: TipoJar[];
    agrado1Sample1: string;
    agrado2Sample1: string;
    agrado3Sample1: string;
    agrado4Sample1: string;
    desagrado1Sample1: string;
    desagrado2Sample1: string;
    desagrado3Sample1: string;
    desagrado4Sample1: string;
    agrado1Sample2: string;
    agrado2Sample2: string;
    agrado3Sample2: string;
    agrado4Sample2: string;
    desagrado1Sample2: string;
    desagrado2Sample2: string;
    desagrado3Sample2: string;
    desagrado4Sample2: string;
    comprarSample1: boolean;
    comprarSample2: boolean;
    consumir: boolean;
}
