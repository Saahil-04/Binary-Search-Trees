import Tree from "./tree.js";

const tree = new Tree();
const arr = [1, 2, 3, 4, 5, 6, 7];
const root = tree.buildTree(arr);
tree.prettyPrint(root)