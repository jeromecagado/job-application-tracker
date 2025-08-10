package com.jerome.jobtracker.dto;

public record ExternalJobDto(
   String title,
   String company,
   String location,
   String applyUrl
) {}
