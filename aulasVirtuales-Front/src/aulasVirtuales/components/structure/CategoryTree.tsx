import { treeData } from "../../model/treeData";
import type { TreeNode } from "../../utils/types";
import Node from "./Node";

interface Props {
  onSelect: (node: TreeNode) => void;
  selectedId: number | null;
}

export default function CategoryTree({ onSelect, selectedId }: Props) {
  return (
    <div className="text-sm">
      {treeData.map((node: TreeNode) => (
        <Node
          key={node.id}
          node={node}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}