// useStudents.ts

import { useState } from "react";
import type { Student } from "../utils/types";
import { getStudents } from "../service/studentService";
import { adaptStudents } from "../adapter/studentAdapter";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async (courseId: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getStudents(courseId);

      console.log("RAW BACKEND:", res);

      // 🔥 AQUÍ ESTÁ LA MAGIA
      const parsed = adaptStudents(res);

      setStudents(parsed.data);
      setTotal(parsed.total);

    } catch (err) {
      console.error(err);
      setError("Error inesperado");
      setStudents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    total,
    loading,
    error,
    fetchStudents,
  };
};