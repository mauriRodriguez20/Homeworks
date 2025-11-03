export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  isLeaf() {
    return !this.left && !this.right;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let curr = this.root;
    while (true) {
      if (value === curr.value) return; 
      if (value < curr.value) {
        if (curr.left) curr = curr.left;
        else { curr.left = new Node(value); return; }
      } else {
        if (curr.right) curr = curr.right;
        else { curr.right = new Node(value); return; }
      }
    }
  }

  contains(value) {
    let curr = this.root;
    while (curr) {
      if (value === curr.value) return true;
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  preorder(node, visit) { // N-L-R
    if (!node) return;
    visit(node.value);
    this.preorder(node.left, visit);
    this.preorder(node.right, visit);
  }

  inorder(node, visit) { // L-N-R
    if (!node) return;
    this.inorder(node.left, visit);
    visit(node.value);
    this.inorder(node.right, visit);
  }

  postorder(node, visit) { // L-R-N
    if (!node) return;
    this.postorder(node.left, visit);
    this.postorder(node.right, visit);
    visit(node.value);
  }

  // (name/children)
  toD3(node = this.root) {
    if (!node) return null;
    const children = [];
    if (node.left) children.push(this.toD3(node.left));
    if (node.right) children.push(this.toD3(node.right));
    const d3Node = { name: String(node.value) };
    if (children.length) d3Node.children = children;
    return d3Node;
  }
}