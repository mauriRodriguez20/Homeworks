export class Stack {
  constructor() { this.items = []; }
  push(v) { this.items.push(v); } 
  pop() { return this.items.pop(); } 
  peek() { return this.items.length ? this.items[this.items.length - 1] : null; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() { return [...this.items].reverse(); }
}
