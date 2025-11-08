import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

// Define interfaces HERE in the component
interface Invoice {
  id?: number;
  clientName: string;
  amount: number;
  date: string;
  status: string;
}

interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  recentInvoices: Invoice[];
  recentExpenses: Expense[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  
  totalIncome: number = 0;
  totalExpenses: number = 0;
  netProfit: number = 0;
  recentInvoices: Invoice[] = [];
  recentExpenses: Expense[] = [];
  
  isLoading: boolean = true;
  error: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.error = '';

    this.dashboardService.getDashboardSummary().subscribe({
      next: (data: DashboardSummary) => {
        this.totalIncome = data.totalIncome;
        this.totalExpenses = data.totalExpenses;
        this.netProfit = data.netProfit;
        this.recentInvoices = data.recentInvoices.slice(0, 3);
        this.recentExpenses = data.recentExpenses.slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.error = 'Failed to load dashboard data. Please try again.';
        this.isLoading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}