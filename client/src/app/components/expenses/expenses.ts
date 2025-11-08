import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.css']
})
export class ExpensesComponent implements OnInit {
  
  expenses: Expense[] = [];
  isLoading: boolean = true;
  error: string = '';
  
  showForm: boolean = false;
  isEditMode: boolean = false;
  currentExpenseId?: number;
  
  categories: string[] = [
    'Office Rent',
    'Electricity',
    'Transportation',
    'Office Supplies',
    'Salaries',
    'Marketing',
    'Other'
  ];
  
  expenseForm: Expense = {
    category: '',
    amount: 0,
    date: '',
    description: ''
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.isLoading = true;
    this.error = '';

    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.error = 'Failed to load expenses.';
        this.isLoading = false;
      }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.resetForm();
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.expenseForm = {
      category: '',
      amount: 0,
      date: '',
      description: ''
    };
    this.currentExpenseId = undefined;
  }

  saveExpense(): void {
    if (this.isEditMode && this.currentExpenseId) {
      this.expenseService.updateExpense(this.currentExpenseId, this.expenseForm).subscribe({
        next: () => {
          this.loadExpenses();
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating expense:', error);
          alert('Failed to update expense');
        }
      });
    } else {
      this.expenseService.createExpense(this.expenseForm).subscribe({
        next: () => {
          this.loadExpenses();
          this.closeForm();
        },
        error: (error) => {
          console.error('Error creating expense:', error);
          alert('Failed to create expense');
        }
      });
    }
  }

  editExpense(expense: Expense): void {
    this.isEditMode = true;
    this.currentExpenseId = expense.id;
    this.expenseForm = { ...expense };
    this.showForm = true;
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.loadExpenses();
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
          alert('Failed to delete expense');
        }
      });
    }
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}