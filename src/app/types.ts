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

export type Intervention = {
  date: string;
  intervention: string;
  status: boolean;
  createdBy: string;
  uid: string;
};
