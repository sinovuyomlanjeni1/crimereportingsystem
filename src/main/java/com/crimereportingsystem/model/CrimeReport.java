package com.crimereportingsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "crime_reports")
public class CrimeReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Area is required")
    private String area;

    @NotNull(message = "Date is required")
    private LocalDateTime incidentDate;

    private String status = "Pending"; // Default status

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reporter;

    private LocalDateTime reportedAt = LocalDateTime.now();
}
