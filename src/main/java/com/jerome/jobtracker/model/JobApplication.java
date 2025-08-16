package com.jerome.jobtracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String position;
    private String status;
    private LocalDate appliedDate;

    private String location;

    @Column(length = 1000)
    private String applyUrl;

    private String source;

    @Column(length = 1000)
    private String notes;
}