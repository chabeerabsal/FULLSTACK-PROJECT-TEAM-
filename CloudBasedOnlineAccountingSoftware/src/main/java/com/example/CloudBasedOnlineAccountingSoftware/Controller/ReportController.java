package com.example.CloudBasedOnlineAccountingSoftware.Controller;

import com.example.CloudBasedOnlineAccountingSoftware.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalSales", reportService.getTotalSales());
        report.put("totalExpenses", reportService.getTotalExpenses());
        report.put("profitOrLoss", reportService.getProfitOrLoss());
        report.put("gstCollected", reportService.getGSTCollected());
        return report;
    }
}

