package com.jerome.jobtracker.controller;

import com.jerome.jobtracker.dto.ExternalJobDto;
import com.jerome.jobtracker.model.ExperienceLevel;
import com.jerome.jobtracker.model.JobApplication;
import com.jerome.jobtracker.repository.JobApplicationRepository;
import com.jerome.jobtracker.service.ExternalJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationRepository repository;
    private final ExternalJobService externalJobService;

    @Autowired
    public JobApplicationController(JobApplicationRepository repository, ExternalJobService externalJobService) {
        this.repository = repository;
        this.externalJobService = externalJobService;
    }

    @GetMapping("/external/search")
    public List<ExternalJobDto> searchExternalJobs(@RequestParam String keyword) {
        return externalJobService.searchJobsFromApi(keyword);
    }

    @GetMapping("/external/search2")
    public List<ExternalJobDto> searchExternalJobsV2(
            @RequestParam String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String experience,   // <-- String now
            @RequestParam(required = false) String skills,       // CSV: "java,python, csharp"
            @RequestParam(required = false, defaultValue = "false") boolean military,
            @RequestParam(required = false, defaultValue = "false") boolean remote,
            @RequestParam(required = false, defaultValue = "false") boolean hybrid,
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "1") int numPages
    ) {
        ExperienceLevel exp = parseExperience(experience); // normalize
        return externalJobService.searchJobsFromApiV2(
                keyword, location, exp, skills, military, remote, hybrid, page, numPages
        );
    }


    private ExperienceLevel parseExperience(String raw) {
        if (raw == null || raw.isBlank()) return null;
        String norm = raw.trim().toUpperCase().replace(' ', '_').replace('-', '_');
        try {
            return ExperienceLevel.valueOf(norm);
        } catch (IllegalArgumentException e) {
            // Unknown value -> ignore (or you could throw a 400 if you want strict behavior)
            return null;
        }
    }

    @GetMapping
    public List<JobApplication> getAllJobs() {
        return repository.findAll();
    }

    @GetMapping("/search/company")
    public List<JobApplication> searchByCompany(@RequestParam String company) {
        return repository.findByCompanyContainingIgnoreCase(company);
    }

    @GetMapping("/search/position")
    public List<JobApplication> searchByPosition(@RequestParam String position) {
        return repository.findByPositionContainingIgnoreCase(position);
    }

    @GetMapping("/search/status")
    public List<JobApplication> searchByStatus(@RequestParam String status) {
        return repository.findByStatusIgnoreCase(status);
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
