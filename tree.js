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
        while (node.left) {
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
            root.left = this.deleteNode(root.left, key);
        } else if (key > root.data) {
            root.right = this.deleteNode(root.right, key)
        } else {
            if (!root.left && !root.right) {
                return null
            }

            if (!root.left) return root.right;
            if (!root.right) return root.left;

            const successor = this.findMin(root.right)
            root.data = successor.data;
            root.right = this.deleteNode(root.right, successor.data)
        }

        return root;
    }

    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.data) {
                return current;
            }
            if (value < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback must be a function")
        }

        if (!this.root) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    // levelOrder(callback) {           recursive version
    //     if (typeof callback !== 'function') {
    //         throw new Error("Callback is not a function!");
    //     }

    //     const traversal = (queue) => {
    //         if (queue.length === 0) return;

    //         const node = queue.shift();
    //         callback(node);

    //         if (node.left) queue.push(node.left);
    //         if (node.right) queue.push(node.right);

    //         traversal(queue);

    //     }
    //     if (!this.root) return;
    //     traversal([this.root])
    // }

    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback is not a function");
        }

        const traversal = (node) => {
            if (!node) return;
            traversal(node.left);
            callback(node);
            traversal(node.right);
        }
        traversal(this.root)
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback is not a function");
        }

        const traversal = (node) => {
            if (!node) return;
            callback(node);
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root)

    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback is not a function");
        }

        const traversal = (node) => {
            if (!node) return;
            traversal(node.left);
            traversal(node.right);
            callback(node);
        }
        traversal(this.root)
    }

    height(node = this.root) {
        if (!node) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node) return -1;;
        let edges = 0;
        let current = node;
        while (current !== this.root) {
            edges++;
            current = this.#findParent(current)
        }
        return edges;
    }

    #findParent(targetNode, current = this.root) { // helper for depth method
        if (!current) return null;
        if (current.left === targetNode || current.right === targetNode) {
            return current;
        }
        return targetNode.data < current.data
            ? this.#findParent(targetNode, current.left)
            : this.#findParent(targetNode, current.right);
    }

    isBalanced(node = this.root) {
        if (!node) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    rebalance() {
        if (!this.root) return null;
        const arr = [];
        this.inOrder(node => arr.push(node.data));
        this.root = this.buildTree(arr)
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