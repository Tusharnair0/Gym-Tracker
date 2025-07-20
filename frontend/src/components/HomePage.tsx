import React, { useEffect, useState } from 'react';
import { Dumbbell, TrendingUp, Calendar, Target } from 'lucide-react';
import { apiService } from '../services/api';
import { GymExercise } from '../types/Exercise';

interface HomePageProps {
  onNavigate: (page: 'exercises') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [exercises, setExercises] = useState<GymExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getAllExercises();
      setExercises(data);
      setError(null);
    } catch (err) {
      setError('Failed to load exercises');
      console.error('Error loading exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalExercises: exercises.length,
    uniqueMuscleGroups: [...new Set(exercises.map(e => e.muscleGroup))].length,
    totalSets: exercises.reduce((sum, e) => sum + e.sets, 0),
    totalReps: exercises.reduce((sum, e) => sum + (e.sets * e.reps), 0),
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Gym Tracker
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your workouts, monitor progress, and achieve your fitness goals with ease.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exercises</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalExercises}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Dumbbell className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Muscle Groups</p>
              <p className="text-3xl font-bold text-gray-900">{stats.uniqueMuscleGroups}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sets</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSets}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reps</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalReps}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('exercises')}
            className="flex items-center space-x-4 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors group"
          >
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <Dumbbell className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Manage Exercises</h3>
              <p className="text-gray-600">Add, edit, or view your workout exercises</p>
            </div>
          </button>

          <div className="flex items-center space-x-4 p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
            <div className="p-3 bg-gray-200 rounded-lg">
              <TrendingUp className="w-8 h-8 text-gray-500" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-600">Progress Analytics</h3>
              <p className="text-gray-500">Coming soon - Track your progress over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {exercises.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Exercises</h2>
          <div className="space-y-4">
            {exercises.slice(-5).reverse().map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Dumbbell className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">{exercise.muscleGroup} • {exercise.dayOfWeek}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{exercise.sets} × {exercise.reps}</p>
                  <p className="text-sm text-gray-600">{exercise.weights} lbs</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('exercises')}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View All Exercises
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};