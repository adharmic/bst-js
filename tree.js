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
      return this.find(value, node.left, leftCallback, rightCallback, foundCallback);
    }
    if (value > node.data) {
      // Go right
      if (node.right == null) {
        if (rightCallback) {
          return rightCallback(value, node);
        }
        return null;
      }
      return this.find(value, node.right, leftCallback, rightCallback, foundCallback);
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

  findSuccessor(value) {
    return this.levelOrder((node) => {
      if (node.data > value) {
        return node;
      }
    })
  }

  handleDeletion(node) {
    if (node.left && node.right) {
      // Two child nodes!
      // Find in-order successor or predecessor
      let successor = this.findSuccessor(node.data);
      if (!successor) {
        node.data = null;
        return null;
      }
      // Swap node with found node
      node.data = successor.data;
      // Delete node
      this.handleDeletion(successor);
      return node;
    }
    else if (node.left) {
      node.data = node.left.data;
      node.left = node.left.left;
      node.right = node.left.right;
      return node;
    }
    else if (node.right) {
      node.data = node.right.data;
      node.left = node.right.left;
      node.right = node.right.right;
      return node;
    }
    node.data = null;
    delete node.left;
    delete node.right;
    return null;
  }

  delete(value) {
    this.find(value, this.root, null, null, this.handleDeletion.bind(this));
    this.cleanup();
  }

  cleanup() {
    this.levelOrder((node) => {
      if (node.right?.data === null) {
        node.right = null;
      }
      if (node.left?.data === null) {
        node.left = null;
      }
    })
  }

  levelOrder(callback, node = null, visitQueue = []) {
    if (node == null) {
      node = this.root;
    }
    if (visitQueue[0] === node) {
      visitQueue.shift();
    }
    if (node.left) {
      visitQueue.push(node.left);
    }
    if (node.right) {
      visitQueue.push(node.right);
    }
    let res = callback(node);
    if (res !== null && res !== undefined) {
      return res;
    }
    if (visitQueue[0]) {
      return this.levelOrder(callback, visitQueue[0], visitQueue)
    }
    return null;
  }

}
