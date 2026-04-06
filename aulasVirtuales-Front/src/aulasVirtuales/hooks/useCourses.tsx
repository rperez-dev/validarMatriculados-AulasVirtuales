import { useState } from "react";
import { getCoursesByCategory } from "../service/CourseService";
import type { Course, TreeNode } from "../utils/types";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = async (node: TreeNode) => {
    if (node.id === selectedId) return;

    setSelectedId(node.id);
    setSelectedNode(node);

    if (node.children && node.children.length > 0) {
      setCourses([]);
      return;
    }

    try {
      setLoading(true);
      const data = await getCoursesByCategory(node.id);
      setCourses(data);
    } catch (error) {
      console.error(error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    selectedNode,
    selectedId,
    handleSelect,
  };
};