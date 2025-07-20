import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ExerciseFormData, GymExercise } from '../types/Exercise';

interface ExerciseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exercise: ExerciseFormData) => void;
  editingExercise?: GymExercise | null;
  isLoading?: boolean;
}

const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core', 'Cardio'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingExercise,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: '',
    muscleGroup: '',
    weights: 0,
    sets: 0,
    reps: 0,
    dayOfWeek: '',
  });

  //const [errors, setErrors] = useState<Partial<ExerciseFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ExerciseFormData, string>>>({});

  useEffect(() => {
    if (editingExercise) {
      setFormData({
        name: editingExercise.name,
        muscleGroup: editingExercise.muscleGroup,
        weights: editingExercise.weights,
        sets: editingExercise.sets,
        reps: editingExercise.reps,
        dayOfWeek: editingExercise.dayOfWeek,
      });
    } else {
      setFormData({
        name: '',
        muscleGroup: '',
        weights: 0,
        sets: 0,
        reps: 0,
        dayOfWeek: '',
      });
    }
    setErrors({});
  }, [editingExercise, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ExerciseFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Exercise name is required';
    if (!formData.muscleGroup) newErrors.muscleGroup = 'Muscle group is required';
    if (!formData.dayOfWeek) newErrors.dayOfWeek = 'Day of week is required';
    if (formData.weights < 0) newErrors.weights = 'Weight cannot be negative';
    if (formData.sets < 1) newErrors.sets = 'Sets must be at least 1';
    if (formData.reps < 1) newErrors.reps = 'Reps must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ExerciseFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Exercise Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Bench Press"
              disabled={isLoading}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-700 mb-1">
              Muscle Group *
            </label>
            <select
              id="muscleGroup"
              value={formData.muscleGroup}
              onChange={(e) => handleInputChange('muscleGroup', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.muscleGroup ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Select muscle group</option>
              {muscleGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {errors.muscleGroup && <p className="text-red-600 text-sm mt-1">{errors.muscleGroup}</p>}
          </div>

          <div>
            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-1">
              Day of Week *
            </label>
            <select
              id="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={(e) => handleInputChange('dayOfWeek', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                errors.dayOfWeek ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Select day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {errors.dayOfWeek && <p className="text-red-600 text-sm mt-1">{errors.dayOfWeek}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="weights" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                id="weights"
                value={formData.weights}
                onChange={(e) => handleInputChange('weights', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.weights ? 'border-red-300' : 'border-gray-300'
                }`}
                min="0"
                disabled={isLoading}
              />
              {errors.weights && <p className="text-red-600 text-sm mt-1">{errors.weights}</p>}
            </div>

            <div>
              <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
                Sets *
              </label>
              <input
                type="number"
                id="sets"
                value={formData.sets}
                onChange={(e) => handleInputChange('sets', parseInt(e.target.value) || 1)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.sets ? 'border-red-300' : 'border-gray-300'
                }`}
                min="1"
                disabled={isLoading}
              />
              {errors.sets && <p className="text-red-600 text-sm mt-1">{errors.sets}</p>}
            </div>

            <div>
              <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
                Reps *
              </label>
              <input
                type="number"
                id="reps"
                value={formData.reps}
                onChange={(e) => handleInputChange('reps', parseInt(e.target.value) || 1)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.reps ? 'border-red-300' : 'border-gray-300'
                }`}
                min="1"
                disabled={isLoading}
              />
              {errors.reps && <p className="text-red-600 text-sm mt-1">{errors.reps}</p>}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : editingExercise ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};