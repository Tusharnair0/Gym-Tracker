package com.springboot.Project.Gym.Tracker.repository;

import com.springboot.Project.Gym.Tracker.Model.GymExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymExerciseRepository extends JpaRepository<GymExercise, Long> {
}
