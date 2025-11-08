import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces HERE
export interface Invoice {
  id?: number;
  clientName: string;
  amount: number;
  date: string;
  status: string;
}

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  recentInvoices: Invoice[];
  recentExpenses: Expense[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) { }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
  }
}