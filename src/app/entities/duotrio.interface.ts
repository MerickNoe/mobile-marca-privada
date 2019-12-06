export interface DuoTrioTest {
    id?: string;
    active: boolean;
    created: string;
    panelist: string;
    product: string;
    category: string;
    scales: string[];
    set1: Set;
    set2: Set;
}

export interface Set {
    sample1: string;
    sample2: string;
    R: string;
}
export interface DuoTrioAnswer {
    id?: string;
    test: string;
    date: string;
    name: string;
    sample1Selected: string;
    sample2Selected: string;
    diferencias1: DiferenciaModel[];
    diferencias2: DiferenciaModel[];
    otro1: string;
    otro2: string;
    R1: string;
    R2: string;
}

export interface DiferenciaModel {
    val: string;
    isChecked: boolean;
}
