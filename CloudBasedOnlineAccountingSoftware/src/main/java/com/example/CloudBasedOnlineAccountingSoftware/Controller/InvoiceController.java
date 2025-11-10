package com.example.CloudBasedOnlineAccountingSoftware.Controller;

import com.example.CloudBasedOnlineAccountingSoftware.Model.Invoice;
import com.example.CloudBasedOnlineAccountingSoftware.Service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*") // allows frontend to connect easily
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();

    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.saveInvoice(invoice);
    }

    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable Long id, @RequestBody Invoice updatedInvoice) {
        return invoiceService.updateInvoice(id, updatedInvoice);
    }

    @DeleteMapping("/{id}")
    public String deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
        return "Invoice deleted successfully";
    }

    @GetMapping("/status/{status}")
    public List<Invoice> getInvoicesByStatus(@PathVariable String status) {
        return invoiceService.getInvoicesByStatus(status);
    }

    @GetMapping("/search")
    public List<Invoice> searchByClientName(@RequestParam String clientName) {
        return invoiceService.searchInvoicesByClientName(clientName);
    }
}

