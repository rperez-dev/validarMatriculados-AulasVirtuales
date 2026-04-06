import { useState } from "react";
import type { Course, TreeNode } from "../../utils/types";
import { useStudents } from "../../hooks/useStudents";
import StudentsTable from "../students/StudentsTable";
import { Modal } from "../../../components/ui/Modal";
import StudentsTableValidations from "../students/StudentsTableValidations";
import { CheckSquare, Eye } from "react-feather";

interface Props {
  courses: Course[];
  loading: boolean;
  selectedNode: TreeNode | null;
}

export default function CoursesPanel({
  courses,
  loading,
  selectedNode,
}: Props) {

  const [openModal, setOpenModal] = useState(false);
   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "validate">("view");

  const {
    students,
    total,
    loading: loadingStudents,
    error,
    fetchStudents,
  } = useStudents();

  const handleView = (course: Course) => {
    setSelectedCourse(course);
    setModalMode("view");
    setOpenModal(true);
    fetchStudents(course.id);
  };

  const handleValidate = (course: Course) => {
    setSelectedCourse(course);
    setModalMode("validate");
    setOpenModal(true);
    fetchStudents(course.id);
  };

  const getNombre = (nombre: string) => nombre.split(" - ")[0];
  const getSeccion = (nombre: string) => nombre.split(" - ")[1] || "";
  const getCiclo = (nombre: string) => {
    const sec = getSeccion(nombre);
    return sec.split(">")[1]?.substring(0, 2) || "--";
  };

  if (!selectedNode)
    return <div className="text-center mt-10">Selecciona un ciclo</div>;

  if (loading)
    return <div className="text-center mt-10">Cargando cursos...</div>;

  return (
    <div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[var(--usmp-red)]">
          {selectedNode.name}
        </h2>

        <span className="text-sm text-gray-500">
          {courses.length} cursos
        </span>
      </div>

      <div className="border rounded-lg overflow-hidden">

        <div className="grid grid-cols-5 bg-gray-100 text-xs font-semibold px-4 py-2 border-b">
          <div>ID</div>
          <div>Curso</div>
          <div>Sección</div>
          <div>Ciclo</div>
          <div className="text-center">Acciones</div>
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-5 items-center px-4 py-3 border-b hover:bg-gray-50"
          >
            <div className="text-xs">{course.id}</div>

            <div>
              <p className="text-sm font-medium">
                {getNombre(course.nombre)}
              </p>
              <p className="text-xs text-gray-400">
                {course.codigo}
              </p>
            </div>

            <div className="text-xs">
              {getSeccion(course.nombre)}
            </div>

            <div className="text-xs text-[var(--usmp-red)] font-semibold">
              {getCiclo(course.nombre)}
            </div>

            <div className="flex justify-center gap-2">

              <button
                onClick={() => handleValidate(course)}
                className="p-1 rounded hover:bg-gray-200 transition"
                title="Validar alumnos"
              >
                <CheckSquare size={16} />
              </button>

              <button
                onClick={() => handleView(course)}
                className="p-1 rounded hover:bg-green-100 transition"
                title="Ver alumnos"
              >
                <Eye size={16} />
              </button>

            </div>
          </div>
        ))}

      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={
          modalMode === "view"
            ? `Matriculados (${total})`
            : "Validación de alumnos"
        }
      >
        {modalMode === "view" ? (
          <StudentsTable
            data={students}
            loading={loadingStudents}
            error={error}
          />
        ) : (
          <StudentsTableValidations
            data={students}
            course={selectedCourse}
            loading={loadingStudents}
            error={error}
          />
        )}
      </Modal>

    </div>
  );
}