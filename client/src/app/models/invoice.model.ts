export interface Invoice {
  id?: number;
  clientName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  createdAt?: string;
}