export default interface Transfer {
  id: number;
  amount: number;
  date: string;
  metadata: Record<string, string>;
  name: string;
  notes: string | null;
  type: 'EXPENSE' | 'INCOME';
}
