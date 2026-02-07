package com.crimereportingsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StatusUpdateDTO {
    @NotBlank(message = "Status is required")
    private String status;

    private String comments;
    private Long reportId;
    private Long adminId;
}
