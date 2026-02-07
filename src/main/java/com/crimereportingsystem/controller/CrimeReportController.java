package com.crimereportingsystem.controller;

import com.crimereportingsystem.dto.ReportDTO;
import com.crimereportingsystem.model.CrimeReport;
import com.crimereportingsystem.service.CrimeReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")


public class CrimeReportController {

    private final CrimeReportService reportService;

    @Autowired
    public CrimeReportController(CrimeReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<CrimeReport> submitReport(@Valid @RequestBody ReportDTO reportDTO) {
        CrimeReport report = reportService.submitReport(reportDTO);
        return ResponseEntity.ok(report);
    }

    @GetMapping
    public ResponseEntity<List<CrimeReport>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @GetMapping("/area/{area}")
    public ResponseEntity<List<CrimeReport>> getReportsByArea(@PathVariable String area) {
        return ResponseEntity.ok(reportService.getReportsByArea(area));
    }
}
