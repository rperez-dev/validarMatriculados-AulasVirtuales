import { api } from "../../config/conection/ConectionApi";
import type { BackendStudentResponse } from "../utils/types";

export const getStudents = async (
  courseId: number,
): Promise<BackendStudentResponse[]> => {
  const response = await api.get(`/participants/${courseId}/`);
  return response.data;
};
