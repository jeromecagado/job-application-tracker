package com.jerome.jobtracker.repository;

import com.jerome.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // You can add custom query methods later (e.g., findByStatus)

    // Search by company name (case-insensitive contains)
    List<JobApplication> findByCompanyContainingIgnoreCase(String company);

    // Search by position
    List<JobApplication> findByPositionContainingIgnoreCase(String position);

    // Search by status
    List<JobApplication> findByStatusIgnoreCase(String status);



}