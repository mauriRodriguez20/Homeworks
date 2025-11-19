export class Graph {
  constructor() {
    this.nodes = [];
    this.adj = {};
    this._id = 1;
  }

  _newId() {
    return String(this._id++);
  }

  addNode(payload) {
    const exists = this.nodes.find(n => n.type === payload.type && n.label === payload.label);
    if (exists) return exists;
    const node = { id: this._newId(), ...payload };
    this.nodes.push(node);
    this.adj[node.id] = new Set();
    return node;
  }

  addEdge(idA, idB) {
    if (!this.adj[idA] || !this.adj[idB]) return;
    this.adj[idA].add(idB);
    this.adj[idB].add(idA);
  }

  addCity(name) {
    return this.addNode({ type: "city", label: name });
  }

  addPerson(name, age, cityName) {
    const city = this.addCity(cityName);
    const person = this.addNode({
      type: "person",
      label: name,
      age: Number(age),
      city: city.label
    });
    this.addEdge(person.id, city.id);
    return { person, city };
  }

  getPeopleByCity(cityName) {
    const city = this.nodes.find(n => n.type === "city" && n.label === cityName);
    if (!city) return [];
    const neighbors = Array.from(this.adj[city.id] || []);
    return neighbors
      .map(id => this.nodes.find(n => n.id === id))
      .filter(n => n && n.type === "person");
  }

  print() {
    console.log("NODES:");
    this.nodes.forEach(n => {
      console.log(` - ${n.id} [${n.type}] ${n.label}${n.age !== undefined ? " (" + n.age + ")" : ""}`);
    });
    console.log("ADJACENCY LIST:");
    Object.keys(this.adj).forEach(id => {
      const lbl = (this.nodes.find(n => n.id === id) || {}).label;
      const neigh = Array.from(this.adj[id])
        .map(nid => {
          const n = this.nodes.find(nn => nn.id === nid);
          return n ? `${n.label}[${n.type}]` : nid;
        })
        .join(", ");
      console.log(` - ${id}${lbl ? `(${lbl})` : ""} -> ${neigh}`);
    });
  }

  toD3() {
    const nodes = this.nodes.map(n => {
      const displayLabel = n.type === "person" ? `${n.label} - ${n.age} anios` : `${n.label}`;
      return {
        id: n.id,
        name: n.label,
        displayLabel,
        subtitle: n.type === "person" ? `Ciudad: ${n.city}` : "Ciudad",
        svgBadge: n.type
      };
    });

    return {
      nodes,
      links: Object.keys(this.adj).flatMap(a => {
        const arr = Array.from(this.adj[a]);
        return arr
          .filter(b => Number(a) < Number(b))
          .map(b => ({ source: a, target: b }));
      })
    };
  }
}
