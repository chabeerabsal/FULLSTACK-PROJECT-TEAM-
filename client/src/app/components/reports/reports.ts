import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { MonthlyReport, CategoryReport } from '../../models/report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class ReportsComponent implements OnInit {
  
  monthlyReports: MonthlyReport[] = [];
  categoryReports: CategoryReport[] = [];
  
  totalIncome: number = 0;
  totalExpenses: number = 0;
  netProfit: number = 0;
  
  isLoading: boolean = true;
  error: string = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.isLoading = true;
    this.error = '';

    // Load Monthly Report
    this.reportService.getMonthlyReport().subscribe({
      next: (data) => {
        this.monthlyReports = data;
        this.calculateTotals();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading monthly reports:', error);
        this.error = 'Failed to load reports.';
        this.isLoading = false;
      }
    });

    // Load Category Report
    this.reportService.getCategoryReport().subscribe({
      next: (data) => {
        this.categoryReports = data;
      },
      error: (error) => {
        console.error('Error loading category reports:', error);
      }
    });
  }

  calculateTotals(): void {
    this.totalIncome = this.monthlyReports.reduce((sum, report) => sum + report.income, 0);
    this.totalExpenses = this.monthlyReports.reduce((sum, report) => sum + report.expenses, 0);
    this.netProfit = this.totalIncome - this.totalExpenses;
  }

  exportToExcel(): void {
    // Simple CSV export
    let csv = 'Month,Income,Expenses,Profit\n';
    this.monthlyReports.forEach(report => {
      csv += `${report.month},${report.income},${report.expenses},${report.profit}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}