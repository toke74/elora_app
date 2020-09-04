export function createDataTree(dataTree) {
  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < dataTree.length; i += 1) {
    map[dataTree[i]._id] = i;
    dataTree[i].children = [];
  }

  for (i = 0; i < dataTree.length; i += 1) {
    node = dataTree[i];
    if (node.parentId !== '0') {
      dataTree[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
