package com.jerome.jobtracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class ExternalJobService {

    private final RestTemplate restTemplate;

    @Autowired
    public ExternalJobService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchJobsFromApi(String keyword) {
        String url = "https://jsearch.p.rapidapi.com/search?query=" + keyword + "&page=1&num_pages=1";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "de1dcd6cbcmsh41558d85e15b06fp129197jsnd71387043b36");
        headers.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");
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
