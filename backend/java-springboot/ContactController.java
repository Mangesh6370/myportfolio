package com.mangesh.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

/**
 * Optional Spring Boot REST Controller for the portfolio contact form.
 * Drop into any Spring Boot (spring-boot-starter-web) project and set
 * API_ENDPOINT = "http://localhost:8080/api/contact" in js/main.js.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    public record ContactRequest(String name, String email, String subject, String message) {}

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContact(@RequestBody ContactRequest request) {
        System.out.printf("[%s] New portfolio message from %s (%s): %s%n",
                Instant.now(), request.name(), request.email(), request.subject());

        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Message received by Spring Boot backend"
        ));
    }
}
