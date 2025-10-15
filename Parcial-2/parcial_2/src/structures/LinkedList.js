class Node {
  constructor(value) {
    this.value = value;    
    this.next = null;     
  }
}

export class LinkedList {
  constructor() {
    this.head = null;     
    this.tail = null;       
    this.length = 0;
  }

  append(value) {           
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  peek(index = 0) {          
    if (index < 0 || index >= this.length) return null;
    let curr = this.head;
    let i = 0;
    while (i < index) { curr = curr.next; i++; }
    return curr?.value ?? null;
  }

  size() { return this.length; }

  remove(index = 0) {    
    if (index < 0 || index >= this.length) return null;
    let removed = null;

    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
      if (this.length === 1) this.tail = null;
    } else {
      let prev = this.head;
      let i = 0;
      while (i < index - 1) { prev = prev.next; i++; }
      removed = prev.next;
      prev.next = removed.next;
      if (index === this.length - 1) this.tail = prev;
    }
    this.length--;
    return removed.value;
  }

  print() {
    const items = [];
    let curr = this.head;
    while (curr) { items.push(curr.value); curr = curr.next; }
    return items;
  }
}
