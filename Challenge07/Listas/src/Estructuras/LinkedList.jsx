
export function Node(value) {
  this.value = value
  this.next = null
}


export function LinkedList() {
  this.head = null
  this.tail = null
  this._size = 0
  this.cursor = null 

  this.append = function (value) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this._size++
    if (!this.cursor) this.cursor = this.head
  }

  this.size = function () {
    return this._size
  }

  // Reproducir
  this.next = function () {
    if (!this.cursor) return null
    const current = this.cursor
    this.cursor = this.cursor.next
    return current.value
  }

  // Mirar el actual sin avanzar
  this.peek = function () {
    return this.cursor ? this.cursor.value : null
  }

  // Reiniciar 
  this.reset = function () {
    this.cursor = this.head
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
