package com.crimereportingsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportDTO {
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

    // Reporter information
    private String reporterName;
    private String reporterEmail;
    private String reporterPhone;
}
