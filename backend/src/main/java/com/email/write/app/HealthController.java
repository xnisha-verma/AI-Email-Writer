package com.email.write.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/")
    public Map<String, String> health() {
        return Map.of(
                "status", "UP",
                "service", "AI Email Writer Backend"
        );
    }

    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        return Map.of(
                "status", "UP"
        );
    }
}
