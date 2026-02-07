package com.crimereportingsystem.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "status_update")

public class StatusUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;
    private String comments;
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "report_id")
    private CrimeReport crimeReport;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

}
