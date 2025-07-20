package com.springboot.Project.Gym.Tracker.repository;

import com.springboot.Project.Gym.Tracker.Model.GymExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GymExerciseRepository extends JpaRepository<GymExercise, Long> {
    List<GymExercise> findByDayOfWeek(String dayOfWeek);
    List<GymExercise> findByMuscleGroup(String muscleGroup);
}
