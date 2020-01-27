export interface DODTest {
    id?: string;
    active: boolean;
    created: string;
    panelist: string;
    product: string;
    category: string;
    general: [];
    set1: {
        sampleActual1: string;
        sampleActual2: string;
        scales: DODScale[];
      };
      set2: {
        sampleActual: string;
        samplePropuesta1: string;
        scales: DODScale[];
      };
      set3: {
        sampleActual: string;
        samplePropuesta2: string;
        scales: DODScale[];
      };
      set4: {
        samplePropuesta1: string;
        samplePropuesta2: string;
        scales: DODScale[];
      };
}

export interface DODScale {
    attribute: string;
    scales: string[];
}

export interface DODAnswer {
  id?: string;
  test: string;
  date: string;
  name: string;
  set1: {
    sampleActual1: string;
    sampleActual2: string;
    scales: DODScaleAnswer[];
    negativePositive: DODNegativePositive[];
    general1: number;
    general2: number;
  };
  set2: {
    sampleActual: string;
    samplePropuesta1: string;
    scales: DODScaleAnswer[];
    negativePositive: DODNegativePositive[];
    general1: number;
    general2: number;
  };
  set3: {
    sampleActual: string;
    samplePropuesta2: string;
    scales: DODScaleAnswer[];
    negativePositive: DODNegativePositive[];
    general1: number;
    general2: number;
  };
  set4: {
    samplePropuesta1: string;
    samplePropuesta2: string;
    scales: DODScaleAnswer[];
    negativePositive: DODNegativePositive[];
    general1: number;
    general2: number;
  };
}

export interface DODScaleAnswer {
  attribute: string;
  point: number;
}

export interface DODNegativePositive {
  attribute: string;
  point: number;
}
