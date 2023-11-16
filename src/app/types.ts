export type PatientsResponse = {
  totalCount: number;
  patients: Patient[];
};

export type Patient = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: Address;
  dob: string;
  dni: string;
  cuil: string;
  medicalService: string;
  medicalServiceNumber: string;
  alergies: boolean;
  diabetes: boolean;
  reumaticFiber: boolean;
  epilepsy: boolean;
  cardiopathy: boolean;
  hepatithis: boolean;
  other: boolean;
  otherIllnesses: string;
  otherDetails: string;
  generalApretiation: string;
  status: boolean;
  teeths: Array<Teeth>;
  lastInterventionDate: string;
  createdBy: string;
  uid: string;
};

export type Address = {
  province: string;
  street: string;
  number: string;
  department: string;
  city: string;
  postalCode: string;
  status: boolean;
};

export type InterventionsResponse = {
  totalCount: number;
  interventions: Intervention[];
};

export type InterventionResponse = {
  msg: string;
  data: Intervention;
};

export type Intervention = {
  date: string;
  lineInterventions: LineIntervention[];
  softTissues: string;
  observations: string;
  status: boolean;
  createdBy: string;
  uid: string;
};

export type LineIntervention = {
  index: number | undefined;
  teethNumber: number | null;
  treatment: string;
  done: boolean;
  date: string;
  uid: string;
  section: string;
};

export type Teeth = {
  name: string;
  number: number;
  area: string;
  sections: Array<Section>;
  uid: string;
};

export type Section = {
  name: string;
  number: number;
  uid: string;
};
