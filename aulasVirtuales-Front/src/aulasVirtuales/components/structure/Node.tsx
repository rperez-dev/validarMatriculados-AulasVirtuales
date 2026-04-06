import { useState } from "react";
import type { TreeNode } from "../../utils/types";

interface Props {
  node: TreeNode;
  level?: number;
  onSelect: (node: TreeNode) => void;
  selectedId: number | null;
}

export default function Node({
  node,
  level = 0,
  onSelect,
  selectedId,
}: Props) {
  const [open, setOpen] = useState(level === 0);

  const hasChildren = node.children?.length;
  const isSelected = selectedId === node.id;

  return (
    <div className="mb-1">
      <div
        className={`
          flex items-center justify-between rounded-lg px-3 py-2 border transition
          ${isSelected 
            ? "bg-red-50 border-[var(--usmp-red)] shadow-sm" 
            : "hover:bg-gray-50 border-gray-200"}
        `}
        style={{ marginLeft: level * 14 }}
      >
        <div className="flex items-center gap-2">

          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="text-[var(--usmp-red)] font-bold"
            >
              {open ? "−" : "+"}
            </button>
          ) : (
            <span className="w-3" />
          )}

          <input
            type="radio"
            checked={isSelected}
            onChange={() => onSelect(node)}
          />

          <span
            onClick={() => onSelect(node)}
            className="cursor-pointer text-sm"
          >
            {node.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <span>👁</span>
          <span>⚙</span>
          <span className="bg-gray-200 px-2 rounded">
            {node.id}
          </span>
        </div>
      </div>

      {open &&
        hasChildren &&
        node.children!.map((child) => (
          <Node
            key={child.id}
            node={child}
            level={level + 1}
            onSelect={onSelect}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
}