// Function adds path to given tree, works ONLY with 3 level tree.
// If needed more levels, reWrite with recursion function find method.

export const addPathToTree = (tree) =>
  tree.map((node) => {
    const rootID = 0;
    const path = [rootID];
    if (node.parent !== rootID) {
      const parentNode = tree.find((n) => n.id === node.parent);
      if (parentNode.parent !== rootID) {
        const nextParentNode = tree.find((n) => n.id === parentNode.parent);
        nextParentNode && path.push(nextParentNode.id);
        parentNode && path.push(parentNode.id);
      } else {
        parentNode && path.push(parentNode.id);
      }
    }
    path.push(node.id);
    return {
      ...node,
      data: {
        ...node.data,
        level: path.length,
        path,
      },
    };
  });
