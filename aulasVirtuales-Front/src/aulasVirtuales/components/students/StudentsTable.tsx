// StudentsTable.tsx

import type { Student } from "../../utils/types";

interface Props {
  data: Student[];
  loading: boolean;
  error: string | null;
}

export default function StudentsTable({ data, loading, error }: Props) {
  if (loading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-auto max-h-[500px]">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-2">#</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Grupo</th>
            <th>Último acceso</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s.correlativo} className="border-t hover:bg-gray-50">
              <td className="p-2">{s.correlativo}</td>
              <td>{s.id}</td>
              <td>{s.nombre}</td>
              <td>{s.email}</td>
              <td>{s.rol}</td>
              <td>{s.grupo}</td>
              <td>{s.ultimoAcceso}</td>
              <td>{s.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && !loading && (
        <div className="text-center py-4 text-gray-400">
          No hay estudiantes
        </div>
      )}
    </div>
  );
}