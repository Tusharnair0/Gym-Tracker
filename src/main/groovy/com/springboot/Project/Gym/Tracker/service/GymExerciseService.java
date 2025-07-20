package com.springboot.Project.Gym.Tracker.service;

import com.springboot.Project.Gym.Tracker.Model.GymExercise;
import com.springboot.Project.Gym.Tracker.repository.GymExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GymExerciseService {

    @Autowired
    private GymExerciseRepository gymExerciseRepository;

    public GymExercise createExercise(GymExercise gymExercise){
        return gymExerciseRepository.save(gymExercise);
    }

    public List<GymExercise> getAllExercises (String day, String muscleGroup){
        if(day != null){
            return gymExerciseRepository.findByDayOfWeek(day);
        }
        if (muscleGroup != null){
            return gymExerciseRepository.findByMuscleGroup(muscleGroup);
        }
        return gymExerciseRepository.findAll();
    }
}
