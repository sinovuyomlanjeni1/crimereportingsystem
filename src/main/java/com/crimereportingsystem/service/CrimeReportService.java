package com.crimereportingsystem.service;

import com.crimereportingsystem.dto.ReportDTO;
import com.crimereportingsystem.model.CrimeReport;
import com.crimereportingsystem.model.User;
import com.crimereportingsystem.repository.CrimeReportRepository;
import com.crimereportingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrimeReportService {
    private final CrimeReportRepository reportRepository;
    private final UserRepository userRepository;

    @Autowired
    public CrimeReportService(CrimeReportRepository reportRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    public CrimeReport submitReport(ReportDTO reportDTO) {
        // Check if user exists or create new one
        User reporter = null;

        if (reportDTO.getReporterEmail() != null && !reportDTO.getReporterEmail().isBlank()) {
            reporter = userRepository.findByEmail(reportDTO.getReporterEmail())
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setName(
                                reportDTO.getReporterName() == null || reportDTO.getReporterName().isBlank()
                                        ? "Anonymous"
                                        : reportDTO.getReporterName()
                        );
                        newUser.setEmail(reportDTO.getReporterEmail());
                        newUser.setPhone(reportDTO.getReporterPhone());
                        return userRepository.save(newUser);
                    });
        }

        // Create and save report
        CrimeReport report = new CrimeReport();
        report.setTitle(reportDTO.getTitle());
        report.setDescription(reportDTO.getDescription());
        report.setLocation(reportDTO.getLocation());
        report.setArea(reportDTO.getArea());
        report.setIncidentDate(reportDTO.getIncidentDate());
        report.setReporter(reporter);

        return reportRepository.save(report);
    }

    public List<CrimeReport> getAllReports() {
        return reportRepository.findAllByOrderByIncidentDateDesc();
    }

    public List<CrimeReport> getReportsByArea(String area) {
        return reportRepository.findByArea(area);
    }
}
