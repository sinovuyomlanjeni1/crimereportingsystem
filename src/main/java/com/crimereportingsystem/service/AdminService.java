package com.crimereportingsystem.service;

import com.crimereportingsystem.dto.StatusUpdateDTO;
import com.crimereportingsystem.model.CrimeReport;
import com.crimereportingsystem.model.StatusUpdate;
import com.crimereportingsystem.model.User;
import com.crimereportingsystem.repository.CrimeReportRepository;
import com.crimereportingsystem.repository.StatusUpdateRepository;
import com.crimereportingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final CrimeReportRepository reportRepository;
    private final UserRepository userRepository;
    private final StatusUpdateRepository statusUpdateRepository;

    @Autowired
    public AdminService(CrimeReportRepository reportRepository,
                        UserRepository userRepository,
                        StatusUpdateRepository statusUpdateRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.statusUpdateRepository = statusUpdateRepository;
    }

    public StatusUpdate updateReportStatus(StatusUpdateDTO statusUpdateDTO) {
        CrimeReport report = reportRepository.findById(statusUpdateDTO.getReportId())
                .orElseThrow(() -> new RuntimeException("Report not found"));

        User admin = userRepository.findById(statusUpdateDTO.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Update report status
        report.setStatus(statusUpdateDTO.getStatus());
        reportRepository.save(report);

        // Create status update record
        StatusUpdate statusUpdate = new StatusUpdate();
        statusUpdate.setStatus(statusUpdateDTO.getStatus());
        statusUpdate.setComments(statusUpdateDTO.getComments());
        statusUpdate.setCrimeReport(report);
        statusUpdate.setAdmin(admin);

        return statusUpdateRepository.save(statusUpdate);
    }

    public List<CrimeReport> getAllReportsForAdmin() {
        return reportRepository.findAllByOrderByIncidentDateDesc();
    }
}
