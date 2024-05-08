const TreeNode = require('./tree_node')

module.exports = class Tree {

    constructor(initial) {
        this._root = this.buildTree(initial);
    }

    get root() {
        return this._root;
    }

    buildTree(values) {
        if (values.length == 1) {
            return values[0];
        }
        values.sort();
        let midIndex = Math.floor(values.length / 2);
        let left = values.slice(0, midIndex);
        let right = values.slice(midIndex + 1);
        return new TreeNode(values[midIndex], new TreeNode(this.buildTree(left)), new TreeNode(this.buildTree(right))); 
    }

    toString(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
