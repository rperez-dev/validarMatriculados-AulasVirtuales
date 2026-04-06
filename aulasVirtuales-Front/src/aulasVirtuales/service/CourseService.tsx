import { api } from "../../config/conection/ConectionApi";
import type { Course } from "../utils/types";

export const getCoursesByCategory = async (
  id: number
): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(`/courses/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos", error);
    throw error;
  }
};
