import { GymExercise, ExerciseFormData } from '../types/Exercise';

const API_BASE_URL = 'http://localhost:8080/api';
class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async getAllExercises(day?: string, muscleGroup?: string): Promise<GymExercise[]> {
    const params = new URLSearchParams();
    if (day) params.append('day', day);
    if (muscleGroup) params.append('muscleGroup', muscleGroup);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/exercises${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    return this.handleResponse<GymExercise[]>(response);
  }

  async createExercise(exercise: ExerciseFormData): Promise<GymExercise> {
    const response = await fetch(`${API_BASE_URL}/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });
    return this.handleResponse<GymExercise>(response);
  }

  async updateExercise(id: number, exercise: ExerciseFormData): Promise<GymExercise> {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    });
    return this.handleResponse<GymExercise>(response);
  }

  async deleteExercise(id: number): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'DELETE',
    });
    return await response.text();
  }

  async checkHealth(): Promise<string> {
    const response = await fetch('http://localhost:8080/health');
    return await response.text();
  }
}

export const apiService = new ApiService();