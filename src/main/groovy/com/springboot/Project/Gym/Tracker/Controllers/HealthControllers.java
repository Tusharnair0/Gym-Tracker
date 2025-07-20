package com.springboot.Project.Gym.Tracker.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthControllers {
    @GetMapping("/health")
    public String checkHealth(){
        return "Gym-Tracker API is up and running";
    }
}
