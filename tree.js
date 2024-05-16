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

    find(value, node = null, leftCallback, rightCallback, foundCallback) {
      if (node == null) {
        node = this.root;
      }
      if (value < node.data) {
        // Go left
        if (node.left == null) {
          if (leftCallback) {
            return leftCallback(value, node);
          }
          return null;
        }
        return this.find(value, node.left, leftCallback, rightCallback);
      }
      if (value > node.data) {
        // Go right
        if (node.right == null) {
          if (rightCallback) {
            return rightCallback(value, node);
          }
          return null;
        }
        return this.find(value, node.right, leftCallback, rightCallback);
      }
      if (foundCallback) {
        return foundCallback(node);
      }
      return node;
    }

    insertLeft(value, node) {
      node.left = new TreeNode(value);
      return null;
    }

    insertRight(value, node) {
      node.right = new TreeNode(value);
      return null;
    }

    insert(value) {
      this.find(value, this.root, this.insertLeft, this.insertRight);
    }

    handleDeletion(node) {
      if (node.left && node.right) {
        // Two child nodes!
        // Find in-order successor or predecessor
        // Swap node with found node
        // Delete node
      }
      else if (node.left) {
        node = node.left;
        node.left = null;
        return true;
      }
      else if(node.right) {
        node = node.right;
        node.right = null;
        return true;
      }
      return false;
    }

    delete(value) {
      this.find(value, this.root, null, null, this.handleDeletion);
    }

}
