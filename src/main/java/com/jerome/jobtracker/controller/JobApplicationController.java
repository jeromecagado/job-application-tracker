package com.jerome.jobtracker.controller;

import com.jerome.jobtracker.model.JobApplication;
import com.jerome.jobtracker.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationRepository repository;

    @Autowired
    public JobApplicationController(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<JobApplication> getAllJobs() {
        return repository.findAll();
    }

    @PostMapping
    public JobApplication createJob(@RequestBody JobApplication job) {
        if (job.getAppliedDate() == null) {
            job.setAppliedDate(LocalDate.now());
        }
        return repository.save(job);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public JobApplication updateJob(@PathVariable Long id, @RequestBody JobApplication updatedJob) {
        return repository.findById(id)
                .map(job -> {
                    job.setCompany(updatedJob.getCompany());
                    job.setPosition(updatedJob.getPosition());
                    job.setStatus(updatedJob.getStatus());

                    // only update appliedDate if it's not null
                    if (updatedJob.getAppliedDate() != null) {
                        job.setAppliedDate(updatedJob.getAppliedDate());
                    };

                    job.setNotes(updatedJob.getNotes());
                    return repository.save(job);
                })
                .orElseThrow(() -> new RuntimeException("Job was not found with id " + id));
    }
}
