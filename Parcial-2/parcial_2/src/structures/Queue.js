export class Queue {
  constructor() { this.items = []; }
  enqueue(v) { this.items.push(v); }   // entra al final
  dequeue() { return this.items.shift(); } // sale el primero
  peek() { return this.items.length ? this.items[0] : null; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() { return [...this.items]; }
}
