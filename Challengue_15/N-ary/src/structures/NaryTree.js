export class NNode {
  constructor({ title, link, component }) {
    this.value = { title, link, component };
    this.children = [];
    this.open = false; 
  }
  addChild(childNode) { this.children.push(childNode); }
}

export class NaryTree {
  constructor(root = null) { this.root = root; }

  dfs(visit, node = this.root) {
    if (!node) return;
    visit(node.value);
    for (let i = 0; i < node.children.length; i++) {
      this.dfs(visit, node.children[i]);
    }
  }

  bfs(visit) {
    const q = [];
    if (this.root) q.push(this.root);
    while (q.length) {
      const n = q.shift();
      visit(n.value);
      for (let i = 0; i < n.children.length; i++) q.push(n.children[i]);
    }
  }
}
