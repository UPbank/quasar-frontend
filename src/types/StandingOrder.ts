export default interface DirectDebit {
  id: number;
  iban: string;
  amount: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  name: string;
}
