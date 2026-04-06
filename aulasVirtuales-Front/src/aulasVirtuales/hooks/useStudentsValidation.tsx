import { useMemo, useState } from "react";
import type { Student } from "../utils/types";

export const useStudentsValidation = (systemStudents: Student[]) => {
  const [pastedText, setPastedText] = useState("");

  // 🔥 mapa del sistema (rápido)
  const systemMap = useMemo(() => {
    const map = new Map<string, Student>();

    systemStudents.forEach((s) => {
      map.set(s.email.toLowerCase().trim(), s);
    });

    return map;
  }, [systemStudents]);

  // 🔥 correos pegados
  const pastedEmails = useMemo(() => {
    return pastedText
      .split("\n")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }, [pastedText]);

  // 🔥 OPTIMIZACIÓN PRO
  const pastedSet = useMemo(() => {
    return new Set(pastedEmails);
  }, [pastedEmails]);

  // 🔥 validación SAP → Sistema
  const validation = useMemo(() => {
    const exists: string[] = [];
    const notFound: string[] = [];

    pastedEmails.forEach((email) => {
      if (systemMap.has(email)) {
        exists.push(email);
      } else {
        notFound.push(email);
      }
    });

    return { exists, notFound };
  }, [pastedEmails, systemMap]);

  // 🔥 validación Sistema → SAP
  const systemValidation = useMemo(() => {
    const exists: Student[] = [];
    const notFound: Student[] = [];

    systemStudents.forEach((student) => {
      const email = student.email.toLowerCase().trim();

      if (pastedSet.has(email)) {
        exists.push(student);
      } else {
        notFound.push(student);
      }
    });

    return { exists, notFound };
  }, [systemStudents, pastedSet]);

  return {
    pastedText,
    setPastedText,
    systemMap,
    pastedEmails,

    // SAP → Sistema
    exists: validation.exists,
    notFound: validation.notFound,

    // Sistema → SAP
    systemExists: systemValidation.exists,
    systemNotFound: systemValidation.notFound,
  };
};