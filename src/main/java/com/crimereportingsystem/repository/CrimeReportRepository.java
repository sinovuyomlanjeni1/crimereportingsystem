package com.crimereportingsystem.repository;

import com.crimereportingsystem.model.CrimeReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CrimeReportRepository extends JpaRepository<CrimeReport, Long> {
    @Query("SELECT r FROM CrimeReport r WHERE r.area = :area ORDER BY r.incidentDate DESC")
    List<CrimeReport> findByArea(@Param("area") String area);

    List<CrimeReport> findAllByOrderByIncidentDateDesc();
}
