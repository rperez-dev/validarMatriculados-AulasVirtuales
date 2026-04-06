import type { BackendStudentResponse, Student } from "../utils/types";

export const adaptStudents = (
  response: BackendStudentResponse[],
): { data: Student[]; total: number } => {
  const html = response?.[0]?.data?.html || "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const rows = Array.from(
    doc.querySelectorAll("#participants tbody tr"),
  ).filter((row) => {
    const nameCell = row.querySelector("td.c0");
    return nameCell && nameCell.textContent?.trim() !== "";
  });

  const cleanName = (text: string): string => {
    const match = text.match(/'([^']+)'/);
    return match ? match[1] : text;
  };

  const students: Student[] = rows.map((row, index) => {
    const getText = (selector: string) =>
      row.querySelector(selector)?.textContent?.trim() || "";

    const rawName = getText("td.c0");

    return {
      correlativo: index + 1,
      id: getText("td.c1"),
      nombre: cleanName(rawName),
      email: getText("td.c2"),
      rol: getText("td.c3"),
      grupo: getText("td.c4"),
      ultimoAcceso: getText("td.c5"),
      estado: getText("td.c6"),
    };
  });

  console.log("TOTAL REAL:", students.length);

  return {
    data: students,
    total: students.length,
  };
};
