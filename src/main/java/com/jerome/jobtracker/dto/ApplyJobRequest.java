package com.jerome.jobtracker.dto;

public record ApplyJobRequest(
        String position,
        String company,
        String location,
        String applyUrl,
        String notes,
        String source
){}
