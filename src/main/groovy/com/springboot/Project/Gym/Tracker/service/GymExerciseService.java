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

    public GymExercise updateExercise(Long id, GymExercise exerciseDetails){
        GymExercise existingExercise = gymExerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: "+ id));

        existingExercise.setName(exerciseDetails.getName());
        existingExercise.setMuscleGroup(exerciseDetails.getMuscleGroup());
        existingExercise.setWeights(exerciseDetails.getWeights());
        existingExercise.setSets(exerciseDetails.getSets());
        existingExercise.setReps(exerciseDetails.getReps());
        existingExercise.setDayOfWeek(exerciseDetails.getDayOfWeek());

        return gymExerciseRepository.save(existingExercise);
    }

    public void deleteExercise(Long id){
        if (!gymExerciseRepository.existsById(id)){
            throw new RuntimeException("Exercise not found with id: "+ id);
        }
        gymExerciseRepository.deleteById(id);
    }
}
