package com.jerome.jobtracker.repository;

import com.jerome.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // You can add custom query methods later (e.g., findByStatus)
}