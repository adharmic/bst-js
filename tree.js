const TreeNode = require('./tree_node')

module.exports = class Tree {

    constructor(initial) {
        this._root = this.buildTree(initial);
    }

    get root() {
        return this._root;
    }

    buildTree(values) {
        if (values.length == 0) {
          return null;
        }
        if (values.length == 1) {
            return new TreeNode(values[0]);
        }
        values = [...new Set(values)];
        values.sort((a, b) => {
          return a < b ? -1 : 1;
        });
        let midIndex = Math.floor(values.length / 2);
        let left = values.slice(0, midIndex);
        let right = values.slice(midIndex + 1);
        return new TreeNode(values[midIndex], this.buildTree(left), this.buildTree(right)); 
    }

    insert(value, node = null) {
      if (node == null) {
        node = this.root;
      }
      let toInsert = new TreeNode(value);
      if (value < node.data) {
        // Go left.
        if (node.left == null) {
          node.left = toInsert;
          return true;
        }
        return this.insert(value, node.left);
      }
      if (value > node.data) {
        // Go right.
        if (node.right == null) {
          node.right = toInsert;
          return true;
        }
        return this.insert(value, node.right);
      }
      return true;
    }

}
