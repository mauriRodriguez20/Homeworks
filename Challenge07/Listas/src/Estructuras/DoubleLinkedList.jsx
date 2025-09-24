export function DNode(value) {
  this.value = value
  this.prev = null
  this.next = null
}


export function DoublyLinkedList() {
  this.head = null
  this.tail = null
  this.current = null 
  this._size = 0

  
  this.visit = function (value) {
    const node = new DNode(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else if (!this.current || this.current === this.tail) {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    } else {
      this.current.next = null
      this.tail = this.current
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }
    this.current = node
    this._size++
  }

  this.back = function () {
    if (this.current && this.current.prev) {
      this.current = this.current.prev
      return this.current.value
    }
    return null
  }

  this.forward = function () {
    if (this.current && this.current.next) {
      this.current = this.current.next
      return this.current.value
    }
    return null
  }

  this.peek = function () {
    return this.current ? this.current.value : null
  }

  this.size = function () {
    return this._size
  }

  this.toArray = function () {
    const out = []
    let p = this.head
    while (p) {
      out.push(p.value)
      p = p.next
    }
    return out
  }
}
