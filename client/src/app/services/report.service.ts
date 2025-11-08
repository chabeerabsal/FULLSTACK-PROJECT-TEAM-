import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces HERE
export interface MonthlyReport {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface CategoryReport {
  category: string;
  amount: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) { }

  getMonthlyReport(): Observable<MonthlyReport[]> {
    return this.http.get<MonthlyReport[]>(`${this.apiUrl}/monthly`);
  }

  getCategoryReport(): Observable<CategoryReport[]> {
    return this.http.get<CategoryReport[]>(`${this.apiUrl}/category`);
  }
}