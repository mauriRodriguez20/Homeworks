import { useMemo, useState } from "react";
import "./styles.css";
import GraphViz from "./components/GraphViz";
import { Graph as G } from "./structures/Graph";

export default function App(){
  // Grafo en memoria
  const [graph] = useState(() => {
    const g = new G();
    // Mock inicial (personas + ciudades) para arrancar la pantalla:
    g.addPerson("Ana", 21, "Cali");
    g.addPerson("Luis", 25, "Cali");
    g.addPerson("Marta", 30, "Palmira");
    g.addCity("Jamundí"); // ciudad aún sin personas
    g.print(); // "Print" en consola al inicio
    return g;
  });

  // Inputs controlados
  const [pName, setPName] = useState("");
  const [pAge, setPAge] = useState("");
  const [pCity, setPCity] = useState("");
  const [filterCity, setFilterCity] = useState("Cali");
  const [people, setPeople] = useState(() => graph.getPeopleByCity("Cali"));

  const d3data = useMemo(() => graph.toD3(), [graph, people, filterCity]);

  const handleAddCity = () => {
    const name = pCity.trim();
    if (!name) return;
    graph.addCity(name);
    graph.print();
    // no hace falta setState del grafo; forzamos re-render actualizando "people"
    setPeople(graph.getPeopleByCity(filterCity));
    setPCity("");
  };

  const handleAddPerson = () => {
    const name = pName.trim();
    const age = Number(pAge);
    const city = pCity.trim() || filterCity.trim();
    if (!name || Number.isNaN(age) || !city) return;
    graph.addPerson(name, age, city);
    graph.print();
    setPeople(graph.getPeopleByCity(filterCity));
    setPName(""); setPAge("");
  };

  const handleFilter = () => {
    setPeople(graph.getPeopleByCity(filterCity));
    console.clear();
    console.log(`People in ${filterCity}:`);
    graph.getPeopleByCity(filterCity).forEach(p => console.log(` - ${p.label} (${p.age})`));
  };

  return (
    <div className="container">
      <h1>Challenge 16 - Grafos</h1>

      <div className="card">
        <h2 className="card__title">Crear Ciudad</h2>
        <div className="row">
          <input className="input" placeholder="Nombre de la ciudad" value={pCity} onChange={e=>setPCity(e.target.value)} />
          <button className="btn" onClick={handleAddCity}>Agregar ciudad</button>
        </div>
        <p className="muted">Cada ciudad es un nodo. Las personas se conectan a su ciudad con una arista.</p>
      </div>

      <div className="card">
        <h2 className="card__title">Crear Persona</h2>
        <div className="row">
          <input className="input" placeholder="Nombre" value={pName} onChange={e=>setPName(e.target.value)} />
          <input className="input" placeholder="Edad" value={pAge} onChange={e=>setPAge(e.target.value)} />
          <input className="input" placeholder="Ciudad (vacío = usar ciudad del filtro)" value={pCity} onChange={e=>setPCity(e.target.value)} />
          <button className="btn" onClick={handleAddPerson}>Agregar persona</button>
        </div>
      </div>

      <div className="card">
        <h2 className="card__title">Filtrar por Ciudad</h2>
        <div className="row">
          <input className="input" placeholder="Ciudad a consultar" value={filterCity} onChange={e=>setFilterCity(e.target.value)} />
          <button className="btn" onClick={handleFilter}>Listar</button>
        </div>
        <p className="muted">Personas que viven en <strong>{filterCity}</strong>:</p>
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.label} <span className="muted">({p.age} años)</span></li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="card__title">Visualización del Grafo</h2>
        <GraphViz data={d3data} />
      </div>
    </div>
  );
}
