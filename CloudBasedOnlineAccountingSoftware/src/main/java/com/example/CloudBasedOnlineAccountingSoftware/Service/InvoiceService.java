package com.example.CloudBasedOnlineAccountingSoftware.Service;

import com.example.CloudBasedOnlineAccountingSoftware.Model.Invoice;
import com.example.CloudBasedOnlineAccountingSoftware.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        return invoiceRepository.findById(id).map(invoice -> {
            invoice.setClientName(updatedInvoice.getClientName());
            invoice.setClientEmail(updatedInvoice.getClientEmail());
            invoice.setAmount(updatedInvoice.getAmount());
            invoice.setStatus(updatedInvoice.getStatus());
            invoice.setIssueDate(updatedInvoice.getIssueDate());
            invoice.setDueDate(updatedInvoice.getDueDate());
            return invoiceRepository.save(invoice);
        }).orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

    public List<Invoice> getInvoicesByStatus(String status) {
        return invoiceRepository.findByStatus(status);
    }

    public List<Invoice> searchInvoicesByClientName(String clientName) {
        return invoiceRepository.findByClientNameContainingIgnoreCase(clientName);
    }
}

