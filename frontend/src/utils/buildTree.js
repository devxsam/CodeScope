export function buildTree(files) {
  const root = {};

  files.forEach((file) => {
    const pathParts = file.webkitRelativePath.split("/");
    let current = root;

    pathParts.forEach((part, index) => {
      if (index === pathParts.length - 1) {
        current[part] = file;
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    });
  });

  return root;
}
