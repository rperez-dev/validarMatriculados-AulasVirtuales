import type { Student } from "../utils/types";

export const studentTableAdapter = (students: Student[]) => {
  return students.map((student, index) => ({
    correlativo: index + 1, // 🔥 NUEVO

    id: student.id,

    nombre: `${student.first_name} ${student.last_name}`, // ✔ limpio

    email: student.email,

    rol: student.role || "-", // ✔ ya lo tienes

    curso: student.curso || "-",

    seccion: student.grupo || "-",
  }));
};