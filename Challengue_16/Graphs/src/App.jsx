import { useMemo, useState } from "react";
import "./styles/main.scss";
import GraphViz from "./components/GraphViz";
import { Graph as G } from "./structures/Graph";

export default function App() {
  const [graph] = useState(() => {
    const g = new G();
    g.addPerson("Ana", 21, "Cali");
    g.addPerson("Luis", 25, "Cali");
    g.addPerson("Marta", 30, "Palmira");
    g.addCity("Jamundi");
    g.print();
    return g;
  });

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
    setPName("");
    setPAge("");
  };

  const handleFilter = () => {
    setPeople(graph.getPeopleByCity(filterCity));
    console.clear();
    console.log(`People in ${filterCity}:`);
    graph.getPeopleByCity(filterCity).forEach(p => console.log(` - ${p.label} (${p.age})`));
  };

  return (
    <div className="container">
      <header className="page-heading">
        <p className="badge badge--info">Relaciones persona - ciudad</p>
        <h1>Challenge 16 - Grafos</h1>
        <p className="muted">
          Construye nodos para ciudades y conecta personas en un grafo semantico con jerarquia clara.
        </p>
      </header>

      <div className="info-grid">
        <div className="card card--soft">
          <h2 className="card__title">Crear Ciudad</h2>
          <div className="row">
            <input
              className="input"
              placeholder="Nombre de la ciudad"
              value={pCity}
              onChange={e => setPCity(e.target.value)}
            />
            <button className="btn btn--ghost" onClick={handleAddCity}>
              Agregar ciudad
            </button>
          </div>
          <p className="muted">
            Cada ciudad es un nodo con efecto glass. Las aristas conectan personas a su lugar de residencia.
          </p>
        </div>

        <div className="card card--soft">
          <h2 className="card__title">Crear Persona</h2>
          <div className="row">
            <input className="input" placeholder="Nombre" value={pName} onChange={e => setPName(e.target.value)} />
            <input className="input" placeholder="Edad" value={pAge} onChange={e => setPAge(e.target.value)} />
            <input
              className="input"
              placeholder="Ciudad (vacio = usar ciudad del filtro)"
              value={pCity}
              onChange={e => setPCity(e.target.value)}
            />
            <button className="btn btn--primary" onClick={handleAddPerson}>
              Agregar persona
            </button>
          </div>
        </div>

        <div className="card card--soft">
          <div className="row row--between">
            <h2 className="card__title">Filtrar por Ciudad</h2>
            <span className="badge badge--muted">{filterCity}</span>
          </div>
          <div className="row">
            <input
              className="input"
              placeholder="Ciudad a consultar"
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
            />
            <button className="btn btn--success" onClick={handleFilter}>
              Listar
            </button>
          </div>
          <p className="muted">Personas que viven en <strong>{filterCity}</strong>:</p>
          <ul className="people-list">
            {people.map(p => (
              <li className="people-list__item" key={p.id}>
                <div>
                  <strong>{p.label}</strong>
                  <p className="people-list__meta">{p.age} anios</p>
                </div>
                <span className="badge badge--muted">{p.city || filterCity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card card--graph">
        <div className="row row--between">
          <h2 className="card__title">Visualizacion del Grafo</h2>
          <span className="badge badge--info">Modo flotante</span>
        </div>
        <GraphViz data={d3data} />
      </div>
    </div>
  );
}
