import CategoryTree from "../components/structure/CategoryTree";
import CoursesPanel from "../components/structure/CoursesPanel";
import { useCourses } from "../hooks/useCourses";

export const StructurePage = () => {
  const {
    courses,
    loading,
    selectedNode,
    selectedId,
    handleSelect,
  } = useCourses();

  return (
    <div className="flex h-screen bg-gray-100 gap-4 p-4">

      <div className="w-1/3 bg-white border rounded shadow-sm flex flex-col">
        <div className="px-4 py-3 border-b font-semibold text-gray-700">
          Categorías
        </div>

        <div className="p-3 overflow-auto">
          <CategoryTree
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        </div>
      </div>

      <div className="w-2/3 bg-white border rounded shadow-sm flex flex-col">
        <div className="px-4 py-3 border-b font-semibold text-gray-700">
          {selectedNode ? selectedNode.name : "USMP"}
        </div>

        <div className="p-4 overflow-auto">
          <CoursesPanel
            courses={courses}
            loading={loading}
            selectedNode={selectedNode}
          />
        </div>
      </div>

    </div>
  );
};