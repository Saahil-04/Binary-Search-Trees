import Tree from "./tree.js";

const tree = new Tree();
const arr = [3, 1, 4, 6, 90, 80, 45, 62, 15, 55, 32, 12, 91, 92, 93, 94, 95, 96, 97, 98, 99,120,150,200];
const root = tree.buildTree(arr);
tree.prettyPrint(root)
console.log("Is the tree balanced?", tree.isBalanced(root))
console.log("Preorder")
tree.preOrder(node => console.log(node.data));
console.log("Inorder")
tree.inOrder(node => console.log(node.data));
console.log("Postorder")
tree.postOrder(node => console.log(node.data));
console.log("Level order")
tree.levelOrder(node => console.log(node.data))

