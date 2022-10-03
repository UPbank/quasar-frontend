export default interface Account {
  id: number;
  fullName: string;
  balance: number;
  iban: string;
  birthdate: string;
  address: {
    lineOne: string;
    lineTwo: string;
    postalCode: string;
    city: string;
    district: string;
  };
  taxNumber: string;
  idNumber: string;
  createdAt: string;
}
