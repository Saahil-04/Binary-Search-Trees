import Tree from "./tree.js";

const tree = new Tree();
const arr = [3, 1, 4, 6, 5, 2, 7, 8];
const root = tree.buildTree(arr);
tree.prettyPrint(root);
tree.insert(9);

console.log("after inserting 9");
tree.prettyPrint(root)
tree.delete(7);;
tree.prettyPrint(root);
