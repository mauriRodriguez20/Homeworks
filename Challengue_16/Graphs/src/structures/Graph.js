export class Graph {
  constructor() {
    this.nodes = [];
    this.adj = {}; // objeto de adyacencia
    this._id = 1;  // contador simple de ids
  }

  _newId() { return String(this._id++); }

  addNode(payload) {
    // payload: { type: 'person'|'city', label, ... }
    // evita duplicar por etiqueta y tipo
    const exists = this.nodes.find(n => n.type === payload.type && n.label === payload.label);
    if (exists) return exists;
    const node = { id: this._newId(), ...payload };
    this.nodes.push(node);
    this.adj[node.id] = new Set();
    return node;
  }

  addEdge(idA, idB) {
    // no dirigido
    if (!this.adj[idA] || !this.adj[idB]) return;
    this.adj[idA].add(idB);
    this.adj[idB].add(idA);
  }

  // Utilidades del reto
  addCity(name) {
    return this.addNode({ type: "city", label: name });
  }

  addPerson(name, age, cityName) {
    const city = this.addCity(cityName); // garantiza existencia
    const person = this.addNode({ type: "person", label: name, age: Number(age) });
    this.addEdge(person.id, city.id);
    return { person, city };
  }

  // Búsquedas pedidas en la slide (search en lista de nodos y adyacencia)
  // Devuelve todas las personas que viven en una ciudad dada
  getPeopleByCity(cityName) {
    const city = this.nodes.find(n => n.type === "city" && n.label === cityName);
    if (!city) return [];
    const neighbors = Array.from(this.adj[city.id] || []);
    return neighbors
      .map(id => this.nodes.find(n => n.id === id))
      .filter(n => n && n.type === "person");
  }

  // "Print": mostramos estructura por consola (nodos y adyacencias)
  print() {
    console.log("NODES:");
    this.nodes.forEach(n => {
      console.log(` - ${n.id} [${n.type}] ${n.label}${n.age!==undefined? " ("+n.age+")":""}`);
    });
    console.log("ADJACENCY LIST:");
    Object.keys(this.adj).forEach(id => {
      const lbl = (this.nodes.find(n => n.id === id) || {}).label;
      const neigh = Array.from(this.adj[id]).map(nid => {
        const n = this.nodes.find(nn => nn.id === nid);
        return n ? `${n.label}[${n.type}]` : nid;
      }).join(", ");
      console.log(` - ${id}${lbl?`(${lbl})`:""} -> ${neigh}`);
    });
  }

  // Conversión a formato que pide react-d3-graph: { nodes:[{id}], links:[{source,target}] }
  toD3() {
    return {
      nodes: this.nodes.map(n => ({
        id: n.id,
        // etiqueta como "name" visual:
        name: n.type === "person" ? `${n.label} (${n.age})` : n.label,
        svgBadge: n.type, // lo usamos en config para color
      })),
      links: Object.keys(this.adj).flatMap(a => {
        const arr = Array.from(this.adj[a]);
        // Reducimos duplicados (A-B y B-A) manteniendo A<B
        return arr
          .filter(b => Number(a) < Number(b))
          .map(b => ({ source: a, target: b }));
      })
    };
  }
}
