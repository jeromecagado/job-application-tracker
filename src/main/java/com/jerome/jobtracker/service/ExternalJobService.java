package com.jerome.jobtracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;

@Service
public class ExternalJobService {

    private final RestTemplate restTemplate;

    // Values pulled from application.properties (and env variable for the key)
    @Value("${external.jsearch.host}")
    private String apiHost;

    @Value("${external.jsearch.key}")
    private String apiKey;

    @Autowired
    public ExternalJobService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public String searchJobsFromApi(String keyword) {
        // Build the URL safely (escapes special characters)
       // System.out.println("apiHost=" + apiHost + ", apiKeyPresent=" + (apiKey != null && !apiKey.isBlank()));
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

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
}