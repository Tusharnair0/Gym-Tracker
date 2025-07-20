package com.springboot.Project.Gym.Tracker.Controllers;

import com.springboot.Project.Gym.Tracker.Model.GymExercise;
import com.springboot.Project.Gym.Tracker.service.GymExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class GymExerciseController {

    @Autowired
    private GymExerciseService gymExerciseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GymExercise createExercise(@RequestBody GymExercise gymExercise){
        return gymExerciseService.createExercise(gymExercise);
    }

    @GetMapping
    public List<GymExercise> getAllExercise(
            @RequestParam(value = "day", required = false) String day,
            @RequestParam(value = "muscleGroup", required = false) String muscleGroup
    ){
        return gymExerciseService.getAllExercises(day,muscleGroup);
    }
}
