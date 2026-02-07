package com.crimereportingsystem.controller;

import com.crimereportingsystem.dto.StatusUpdateDTO;
import com.crimereportingsystem.model.CrimeReport;
import com.crimereportingsystem.model.StatusUpdate;
import com.crimereportingsystem.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")


public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/status")
    public ResponseEntity<StatusUpdate> updateStatus(@Valid @RequestBody StatusUpdateDTO statusUpdateDTO) {
        return ResponseEntity.ok(adminService.updateReportStatus(statusUpdateDTO));
    }

    @GetMapping("/reports")
    public ResponseEntity<List<CrimeReport>> getAllReports() {
        return ResponseEntity.ok(adminService.getAllReportsForAdmin());
    }
}
