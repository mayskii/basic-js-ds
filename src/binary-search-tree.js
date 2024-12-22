const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null){
      this.rootNode = newNode;
      return;
    }
    
    const insertNode = (node, newNode) => {
      if(newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }

    insertNode(this.rootNode, newNode);
  }

  has(data) {
    
    const searchNode = (node, data) => {
      if (node === null) {
        return false;
     }

      if (data < node.data) {
        return searchNode(node.left, data);
      } else if (data > node.data) {
        return searchNode(node.right, data);
      }
      return true;
    }
    return searchNode(this.rootNode, data);
  }

  find(data) {
    
    const searchNode = (node, data) => {
      if (node === null) {
        return null;
      }

      if (data < node.data) {
        return searchNode(node.left, data);
      } else if (data > node.data) {
        return searchNode(node.right, data);
      }
      return node;
    }
    return searchNode(this.rootNode, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left
      }

      const minNode = (node) => {
        while (node && node.left !== null){
          node = node.left;
        }
        return node;
      }

      let successor = minNode(node.right);
      node.data = successor.data;
      node.right = removeNode(node.right, successor.data);
      return node;
    }
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }

    let currentNode = this.rootNode;
    while(currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }

    let currentNode = this.rootNode;
    while (currentNode.right !== null){
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};