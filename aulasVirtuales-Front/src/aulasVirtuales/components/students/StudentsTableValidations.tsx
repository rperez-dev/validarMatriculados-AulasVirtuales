import { useStudentsValidation } from "../../hooks/useStudentsValidation";
import type { Course, Student } from "../../utils/types";

interface Props {
  data: Student[];
  course: Course | null;
  loading?: boolean;
  error?: string | null;
}

export default function StudentsTableValidations({
  data,
  course,
  loading = false,
  error = null,
}: Props) {
  const {
    pastedText,
    setPastedText,
    pastedEmails,
    exists,
    notFound,
    systemNotFound,
  } = useStudentsValidation(data);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando validación...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="p-3 border rounded bg-gray-50 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-lg font-semibold text-[var(--usmp-red)]">
            {course?.nombre}
          </h2>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded p-2">

          <h3 className="font-semibold mb-2">
            📋 Matriculados ({data.length})
          </h3>

          <div className="max-h-80 overflow-auto text-xs">

            <div className="grid grid-cols-[40px_1fr_1fr_120px] font-bold border-b bg-gray-100 px-2 py-1">
              <span>#</span>
              <span>Nombre</span>
              <span>Email</span>
              <span>Rol</span>
            </div>

            {data.map((student, index) => {
              const email = student.email.toLowerCase().trim();
              const isValid = pastedEmails.includes(email);

              return (
                <div
                  key={student.id}
                  className={`
                    grid grid-cols-[40px_1fr_1fr_120px]
                    border-b px-2 py-1 items-center
                    ${isValid ? "bg-green-100" : "bg-red-50"}
                  `}
                >
                  <span>{index + 1}</span>

                  <span className="truncate">
                    {student.nombre}
                  </span>

                  <span className="truncate">
                    {student.email}
                  </span>

                  <span>
                    {student.rol || "-"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border rounded p-2 mt-4">
            <h3 className="font-semibold text-red-600 mb-2">
              ❌ Alumnos del Aula Virtual NO validados ({systemNotFound.length})
            </h3>

            <div className="max-h-40 overflow-auto text-xs">
              {systemNotFound.map((student, index) => (
                <div
                  key={student.id}
                  className="grid grid-cols-[40px_1fr_1fr_120px] border-b px-2 py-1 bg-red-50"
                >
                  <span>{index + 1}</span>
                  <span className="truncate">{student.nombre}</span>
                  <span className="truncate">{student.email}</span>
                  <span>{student.rol || "-"}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="border rounded p-2 flex flex-col gap-2">

          <h3 className="font-semibold">
            📥 Pegar correos del SAP
          </h3>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="correo1@mail.com&#10;correo2@mail.com"
            className="w-full h-40 border p-2 rounded text-sm"
          />

          <div className="text-xs mt-2 flex gap-4">
            <p className="text-green-600">
              ✔ Encontrados: {exists.length}
            </p>

            <p className="text-red-600">
              ❌ No encontrados: {notFound.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">

            <div className="border p-1 rounded max-h-40 overflow-y-auto">
              <p className="font-semibold text-green-600 mb-1">
                ✔ Existentes del SAP
              </p>

              {exists.map((email) => (
                <p key={email}>{email}</p>
              ))}
            </div>

            <div className="border p-1 rounded max-h-40 overflow-y-auto">
              <p className="font-semibold text-red-600 mb-1">
                ❌ No encontrados del SAP
              </p>

              {notFound.map((email) => (
                <p key={email} className="truncate">
                  {email}
                </p>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}