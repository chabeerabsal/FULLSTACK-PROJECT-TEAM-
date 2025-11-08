import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.css']
})
export class InvoicesComponent implements OnInit {
  
  invoices: Invoice[] = [];
  isLoading: boolean = true;
  error: string = '';
  
  // Form states
  showForm: boolean = false;
  isEditMode: boolean = false;
  currentInvoiceId?: number;
  
  // Form model
  invoiceForm: Invoice = {
    clientName: '',
    amount: 0,
    date: '',
    status: 'Pending'
  };

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.isLoading = true;
    this.error = '';

    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
        this.error = 'Failed to load invoices.';
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
    this.invoiceForm = {
      clientName: '',
      amount: 0,
      date: '',
      status: 'Pending'
    };
    this.currentInvoiceId = undefined;
  }

  saveInvoice(): void {
    if (this.isEditMode && this.currentInvoiceId) {
      // Update
      this.invoiceService.updateInvoice(this.currentInvoiceId, this.invoiceForm).subscribe({
        next: () => {
          this.loadInvoices();
          this.closeForm();
        },
        error: (error) => {
          console.error('Error updating invoice:', error);
          alert('Failed to update invoice');
        }
      });
    } else {
      // Create
      this.invoiceService.createInvoice(this.invoiceForm).subscribe({
        next: () => {
          this.loadInvoices();
          this.closeForm();
        },
        error: (error) => {
          console.error('Error creating invoice:', error);
          alert('Failed to create invoice');
        }
      });
    }
  }

  editInvoice(invoice: Invoice): void {
    this.isEditMode = true;
    this.currentInvoiceId = invoice.id;
    this.invoiceForm = { ...invoice };
    this.showForm = true;
  }

  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          this.loadInvoices();
        },
        error: (error) => {
          console.error('Error deleting invoice:', error);
          alert('Failed to delete invoice');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'paid': return 'badge bg-success';
      case 'pending': return 'badge bg-warning';
      case 'overdue': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}