package com.jerome.jobtracker.repository;

import com.jerome.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Return the existing row if this URL is already in the table (any status)
    Optional<JobApplication> findFirstByApplyUrlIgnoreCase(String applyUrl);

    // Search by company name (case-insensitive contains)
    List<JobApplication> findByCompanyContainingIgnoreCase(String company);

    // Search by position
    List<JobApplication> findByPositionContainingIgnoreCase(String position);

    // Search by status
    List<JobApplication> findByStatusIgnoreCase(String status);

    // Check for Already Saved or Already applied
    boolean existsByApplyUrlIgnoreCaseAndStatusIgnoreCase(String applyUrl, String status);

}