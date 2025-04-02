import Node from "./node.js";

export default class Tree {
    constructor() {
        this.root = null
    }

    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor((arr.length - 1) / 2);
        const root = new Node(arr[mid]);

        const queue = [{ node: root, range: [0, arr.length - 1] }];
        while (queue.length > 0) {
            const { node, range: [start, end] } = queue.shift();
            const midIndex = start + Math.floor((end - start) / 2);

            if (midIndex > start) {
                const leftMid = start + Math.floor((midIndex - 1 - start) / 2);
                node.left = new Node(arr[leftMid]);
                queue.push({ node: node.left, range: [start, midIndex - 1] });
            }

            if (midIndex < end) {
                const rightMid = midIndex + 1 + Math.floor((end - midIndex - 1) / 2);
                node.right = new Node(arr[rightMid]);
                queue.push({ node: node.right, range: [midIndex + 1, end] });
            }
        }
        return root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

}