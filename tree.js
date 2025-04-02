import Node from "./node.js";
import mergeSort, { removeDuplicates } from "./mergeSort.js";

export default class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(arr) {
        if (arr.length === 0) return null;

        const sortedArr = mergeSort(arr);

        const uniqueArr = removeDuplicates(sortedArr);


        const mid = Math.floor((uniqueArr.length - 1) / 2);
        const root = new Node(uniqueArr[mid]);

        const queue = [{ node: root, range: [0, uniqueArr.length - 1] }];
        while (queue.length > 0) {
            const { node, range: [start, end] } = queue.shift();
            const midIndex = start + Math.floor((end - start) / 2);

            if (midIndex > start) {
                const leftMid = start + Math.floor((midIndex - 1 - start) / 2);
                node.left = new Node(uniqueArr[leftMid]);
                queue.push({ node: node.left, range: [start, midIndex - 1] });
            }

            if (midIndex < end) {
                const rightMid = midIndex + 1 + Math.floor((end - midIndex - 1) / 2);
                node.right = new Node(uniqueArr[rightMid]);
                queue.push({ node: node.right, range: [midIndex + 1, end] });
            }
        }
        this.root = root;
        return root;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (value > current.data) {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                return; // Value already exists in the tree
            }
        }
    }

    findMin(node) {
        while (node.left){
            node = node.left;
        }
        return node;
    }

    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }

    deleteNode(root, key) {
        if (!this.root) return null;

        if (key < root.data) {
            root.left = this.deleteNode(root.left,key);
        }else if(key > root.data){
            root.right = this.deleteNode(root.right,key)
        }else{
            if(!root.left && !root.right){
                return null
            }

            if(!root.left) return root.right;
            if(!root.right) return root.left;

            const successor = this.findMin(root.right)
            root.data = successor.data;
            root.right = this.deleteNode(root.right,successor.data)
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