export class GreenZoneNode {
  constructor(name) {
    this.name = name;
    this.children = []; 
  }

  addChild(childNode) {
    this.children.push(childNode);
  }

 
  findZone(name) {
    if (this.name === name) {
      return this;
    }

    for (let i = 0; i < this.children.length; i++) {
      const found = this.children[i].findZone(name);
      if (found) {
        return found;
      }
    }

    return null;
  }

  countZones() {
    let total = 1; 

    for (let i = 0; i < this.children.length; i++) {
      total += this.children[i].countZones();
    }

    return total;
  }


  height() {
    if (this.children.length === 0) {
      return 1;
    }

    let maxChildHeight = 0;

    for (let i = 0; i < this.children.length; i++) {
      const h = this.children[i].height();
      if (h > maxChildHeight) {
        maxChildHeight = h;
      }
    }

    return 1 + maxChildHeight;
  }

  serialize() {
    const childrenData = [];
    for (let i = 0; i < this.children.length; i++) {
      childrenData.push(this.children[i].serialize());
    }
    return { name: this.name, children: childrenData };
  }

  static deserialize(data) {
    const node = new GreenZoneNode(data.name);
    if (data.children && Array.isArray(data.children)) {
      for (let i = 0; i < data.children.length; i++) {
        const child = GreenZoneNode.deserialize(data.children[i]);
        node.addChild(child);
      }
    }
    return node;
  }
}
