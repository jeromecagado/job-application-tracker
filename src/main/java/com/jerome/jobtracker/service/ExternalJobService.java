package com.jerome.jobtracker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jerome.jobtracker.dto.ExternalJobDto;
import com.jerome.jobtracker.model.ExperienceLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExternalJobService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper; // Spring auto-wires a preconfigured mapper

    // Values pulled from application.properties (and env variable for the key)
    @Value("${external.jsearch.host}")
    private String apiHost;

    @Value("${external.jsearch.key}")
    private String apiKey;

    @Autowired
    public ExternalJobService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<ExternalJobDto> searchJobsFromApi(String keyword) {
        String url = UriComponentsBuilder
                .fromUriString("https://jsearch.p.rapidapi.com/search")
                .queryParam("query", keyword)
                .queryParam("page", 1)
                .queryParam("num_pages", 1)
                .toUriString();

        // Fail fast if API key is missing
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Missing RapidAPI key. Set the JSEARCH_API_KEY environment variable.");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", apiHost);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Parse JSON
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode data = root.path("data"); // JSearch puts results under "data"

            List<ExternalJobDto> results = new ArrayList<>();
            if (data.isArray()) {
                for (JsonNode n : data) {
                    String title = n.path("job_title").asText(null);
                    String company = n.path("employer_name").asText(null);

                    String city = n.path("job_city").asText("");
                    String state = n.path("job_state").asText("");
                    String country = n.path("job_country").asText("");

                    String location =
                            java.util.stream.Stream.of(city, state, country)
                                    .filter(s -> s != null && !s.isBlank())
                                    .collect(Collectors.joining(", "));

                    String applyUrl = n.path("job_apply_link").asText(null);

                    results.add(new ExternalJobDto(title, company, location, applyUrl));
                }
            }
            return results;
        } catch (RestClientResponseException ex) {
            // Surface upstream HTTP errors as a clear exception
            throw new RuntimeException("External API error: " + ex.getStatusCode().value() + " - " + ex.getResponseBodyAsString(), ex);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to parse external jobs: " + ex.getMessage(), ex);
        }
    }

    public List<ExternalJobDto> searchJobsFromApiV2(
            String keyword,
            String location,
            ExperienceLevel experience,
            String skillsCsv,
            boolean military,
            boolean remote,
            boolean hybrid,
            int page,
            int numPages
    ) {
        // 1) Most specific query
        String q1 = buildQuery(keyword, location, experience, skillsCsv, military, remote, hybrid);
        List<ExternalJobDto> r1 = callAndParse(buildUrl(q1, page, numPages));
        if (!r1.isEmpty()) return r1;

        // 2) Back off: keep only keyword + location + remote/hybrid
        String q2 = buildQuery(keyword, location, null, null, false, remote, hybrid);
        List<ExternalJobDto> r2 = callAndParse(buildUrl(q2, page, numPages));
        if (!r2.isEmpty()) return r2;

        // 3) Last resort: keyword only
        String q3 = keyword.trim();
        return callAndParse(buildUrl(q3, page, numPages));
    }

    private String buildUrl(String query, int page, int numPages) {
        return UriComponentsBuilder
                .fromUriString("https://jsearch.p.rapidapi.com/search")
                .queryParam("query", query)
                .queryParam("page", Math.max(page, 1))
                .queryParam("num_pages", Math.max(numPages, 1))
                .toUriString();
    }

    private String buildQuery(String keyword,
                              String location,
                              ExperienceLevel experience,
                              String skillsCsv,
                              boolean military,
                              boolean remote,
                              boolean hybrid) {
        StringBuilder q = new StringBuilder();
        q.append(keyword.trim());

        if (experience != null) {
            switch (experience) {
                case NEW_GRAD -> q.append(" (\"new grad\" OR \"recent graduate\" OR campus OR \"university hire\" OR \"early career\" OR \"new college graduate\")");
                case ENTRY_LEVEL -> q.append(" (junior OR \"entry level\" OR associate)");
                case ONE_PLUS -> q.append(" (\"1+ years\" OR \"one year\")");
                case THREE_PLUS -> q.append(" (\"3+ years\" OR \"three years\")");
            }
        }
        if (military) {
            q.append(" (veteran OR \"military friendly\" OR DoD OR skillbridge OR MSSA)");
        }
        if (remote && hybrid) {
            q.append(" (remote OR hybrid)");
        } else if (remote) {
            q.append(" remote");
        } else if (hybrid) {
            q.append(" hybrid");
        }

        if (skillsCsv != null && !skillsCsv.isBlank()) {
            String skillsClause = java.util.Arrays.stream(skillsCsv.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isBlank())
                    .map(s -> "\"" + s + "\"")
                    .collect(java.util.stream.Collectors.joining(" OR "));
            if (!skillsClause.isBlank()) {
                q.append(" (").append(skillsClause).append(")");
            }
        }
        if (location != null && !location.isBlank()) {
            q.append(" ").append(location.trim());
        }
        return q.toString();
    }


    private List<ExternalJobDto> callAndParse(String url) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Missing RapidAPI key. Set the JSEARCH_API_KEY environment variable.");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", apiHost);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Debug log for troubleshooting
//            String body = response.getBody();
//            System.out.println("Raw response (first 600 chars): " +
//                    body.substring(0, Math.min(600, body.length())));

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode data = root.path("data");

            List<ExternalJobDto> results = new ArrayList<>();
            if (data.isArray()) {
                for (JsonNode n : data) {
                    String title   = n.path("job_title").asText(null);
                    String company = n.path("employer_name").asText(null);

                    String city    = n.path("job_city").asText("");
                    String state   = n.path("job_state").asText("");
                    String country = n.path("job_country").asText("");

                    String location =
                            java.util.stream.Stream.of(city, state, country)
                                    .filter(s -> s != null && !s.isBlank())
                                    .collect(Collectors.joining(", "));

                    String applyUrl = n.path("job_apply_link").asText(null);

                    results.add(new ExternalJobDto(title, company, location, applyUrl));
                }
            }
            return results;

        } catch (RestClientResponseException ex) {
            throw new RuntimeException(
                    "External API error: " + ex.getStatusCode().value() + " - " + ex.getResponseBodyAsString(), ex);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to parse external jobs: " + ex.getMessage(), ex);
        }
    }
}