import { Invoice } from './invoice.model';
import { Expense } from './expense.model';

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  recentInvoices: Invoice[];
  recentExpenses: Expense[];
}