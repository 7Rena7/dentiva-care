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
  DOB: string;
  DNI: string;
  CUIL: string;
  status: boolean;
  createdBy: string;
  uid: string;
};

export type Address = {
  street: string;
  number: number;
  apartment: string;
  city: string;
  postalCode: string;
  status: boolean;
};
