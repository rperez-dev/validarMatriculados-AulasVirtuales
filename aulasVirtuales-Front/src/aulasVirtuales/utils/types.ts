export interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

export interface Course {
  id: number;
  nombre: string;
  codigo: string;
}

// src/utils/types.ts

export interface Student {
  correlativo: number;
  id: string;
  nombre: string;
  email: string;
  rol: string;
  grupo: string;
  ultimoAcceso: string;
  estado: string;
}

export interface StudentResponse {
  success: boolean;
  data: Student[];
  total: number;
  message?: string;
}

export interface BackendStudentResponse {
  error: boolean;
  data: {
    html: string;
    warnings: string[];
  };
}