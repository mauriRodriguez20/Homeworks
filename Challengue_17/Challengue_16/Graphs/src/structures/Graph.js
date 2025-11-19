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
    const normalized = cityName?.trim().toLowerCase();
    if (!normalized) return [];
    const city = this.nodes.find(
      n => n.type === "city" && n.label.toLowerCase() === normalized
    );
    if (!city) return [];
    const neighbors = Array.from(this.adj[city.id] || []);
    return neighbors
      .map(id => this.nodes.find(n => n.id === id))
      .filter(n => n && n.type === "person");
  }

  getAllPeople() {
    return this.nodes.filter(n => n.type === "person");
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

  toD3(filterCity) {
    const normalizedFilter = filterCity?.trim().toLowerCase();
    let allowedIds = null;

    if (normalizedFilter) {
      allowedIds = new Set();
      const cityNode = this.nodes.find(
        n => n.type === "city" && n.label.toLowerCase() === normalizedFilter
      );
      if (cityNode) {
        allowedIds.add(cityNode.id);
        Array.from(this.adj[cityNode.id] || []).forEach(id => allowedIds.add(id));
      }
    }

    const sourceNodes =
      allowedIds === null
        ? this.nodes
        : this.nodes.filter(n => allowedIds.has(n.id));

    const total = Math.max(sourceNodes.length, 1);
    const perRow = Math.ceil(Math.sqrt(total));
    const spacingX = 220;
    const spacingY = 170;
    const offsetX = 140;
    const offsetY = 110;

    const nodes = sourceNodes.map((n, index) => {
      const displayLabel = n.type === "person" ? `${n.label} - ${n.age} años` : `${n.label}`;
      const row = Math.floor(index / perRow);
      const col = index % perRow;
      const x = offsetX + col * spacingX;
      const y = offsetY + row * spacingY;
      return {
        id: n.id,
        name: n.label,
        displayLabel,
        subtitle: n.type === "person" ? `Ciudad: ${n.city}` : "Ciudad",
        svgBadge: n.type,
        x,
        y,
        fx: x,
        fy: y
      };
    });

    const links = Object.keys(this.adj).flatMap(a => {
      if (allowedIds && !allowedIds.has(a)) return [];
      const arr = Array.from(this.adj[a]);
      return arr
        .filter(b => (!allowedIds || allowedIds.has(b)) && Number(a) < Number(b))
        .map(b => ({ source: a, target: b }));
    });

    return { nodes, links };
  }
}
