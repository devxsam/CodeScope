import { useState } from "react";

// Recursive TreeNode to represent folders and files
function TreeNode({ name, value, onFileClick, level }) {
  const [open, setOpen] = useState(false);
  const isFolder = typeof value === "object" && !(value instanceof File);

  const padding = level * 12;

  if (isFolder) {
    return (
      <li className="mb-1" style={{ paddingLeft: `${padding}px` }}>
        <div
          className="cursor-pointer hover:underline"
          onClick={() => setOpen(!open)}
        >
          📁 {name}
        </div>
        {open && (
          <ul>
            {Object.entries(value).map(([childName, childValue]) => (
              <TreeNode
                key={childName}
                name={childName}
                value={childValue}
                onFileClick={onFileClick}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className="mb-1" style={{ paddingLeft: `${padding}px` }}>
      <div
        className="cursor-pointer hover:text-blue-400"
        onClick={async () => {
          const content = await value.text();
          const fullPath = value.webkitRelativePath || name;
          onFileClick(fullPath, content);  // send full path
        }}

      >
        📄 {name}
      </div>
    </li>
  );
}

// FileTree: root component
function FileTree({ tree, onFileClick, level = 0 }) {
  return (
    <ul>
      {Object.entries(tree).map(([name, value]) => (
        <TreeNode
          key={name}
          name={name}
          value={value}
          onFileClick={onFileClick}
          level={level}
        />
      ))}
    </ul>
  );
}

export default FileTree;
