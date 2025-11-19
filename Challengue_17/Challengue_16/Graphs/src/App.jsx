import React, { useMemo, useState } from "react";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import GraphViz from "./components/GraphViz";
import { Graph as G } from "./structures/Graph";
import { ToastProvider, useToast } from "./components/ToastProvider.jsx";
import ParticlesBg from "./components/ParticlesBg.jsx";
import Avatar from "./components/Avatar.jsx";

const DEFAULT_CITY = "Cali";

function AppContent() {
  const [graph] = useState(() => {
    const g = new G();
    g.addPerson("Ana", 21, "Cali");
    g.addPerson("Luis", 25, "Cali");
    g.addPerson("Marta", 30, "Palmira");
    g.addCity("Jamundi");
    g.print();
    return g;
  });

  // Form states
  const [pName, setPName] = useState("");
  const [pAge, setPAge] = useState("");
  const [pCity, setPCity] = useState("");
  // Validation states
  const [cityTouched, setCityTouched] = useState(false);
  const [personTouched, setPersonTouched] = useState({ name: false, age: false, city: false });
  const [filterQuery, setFilterQuery] = useState(DEFAULT_CITY);
  const [activeCityFilter, setActiveCityFilter] = useState(DEFAULT_CITY);
  const [people, setPeople] = useState(() => graph.getPeopleByCity(DEFAULT_CITY));

  const refreshPeopleList = (cityName) => {
    const query = cityName?.trim();
    if (query) {
      setPeople(graph.getPeopleByCity(query));
    } else {
      setPeople(graph.getAllPeople());
    }
  };

  const d3data = useMemo(
    () => graph.toD3(activeCityFilter),
    [graph, people, activeCityFilter]
  );
  const stats = useMemo(
    () => ({
      nodes: d3data?.nodes?.length ?? 0,
      links: d3data?.links?.length ?? 0,
    }),
    [d3data]
  );
  const { push } = useToast();
  const [showCity, setShowCity] = useState(true);
  const [showPerson, setShowPerson] = useState(true);

  const cityError = cityTouched && !pCity.trim();
  const handleAddCity = () => {
    setCityTouched(true);
    const name = pCity.trim();
    if (!name) return;
    graph.addCity(name);
    graph.print();
    refreshPeopleList(activeCityFilter);
    setPCity("");
    setCityTouched(false);
    push({ message: `Ciudad agregada: ${name} 💡`, variant: "info" });
  };

  const personErrors = {
    name: personTouched.name && !pName.trim(),
    age: personTouched.age && (!pAge.trim() || isNaN(Number(pAge)) || Number(pAge) < 0),
    city: personTouched.city && !(pCity.trim() || activeCityFilter.trim()),
  };
  const handleAddPerson = () => {
    setPersonTouched({ name: true, age: true, city: true });
    const name = pName.trim();
    const age = Number(pAge);
    const city = pCity.trim() || activeCityFilter.trim();
    if (!name || Number.isNaN(age) || age < 0 || !city) return;
    graph.addPerson(name, age, city);
    graph.print();
    refreshPeopleList(activeCityFilter);
    setPName("");
    setPAge("");
    setPersonTouched({ name: false, age: false, city: false });
    push({ message: `Persona agregada: ${name} ✔`, variant: "success" });
  };

  const handleFilter = () => {
    const query = filterQuery.trim();
    setActiveCityFilter(query);
    refreshPeopleList(query);
    console.clear();
    const label = query || "todas las ciudades";
    console.log(`People in ${label}:`);
    const list = query ? graph.getPeopleByCity(query) : graph.getAllPeople();
    list.forEach((p) => console.log(` - ${p.label} (${p.age})`));
  };

  const handleClearFilter = () => {
    setFilterQuery("");
    setActiveCityFilter("");
    refreshPeopleList("");
  };

  return (
    <div className="container">
      <header className="topbar">
        <div>
          <p className="badge badge--info">Universidad Autonoma de Occidente</p>
          <h1>Gestor de grafos</h1>
        </div>
      </header>
      <p className="muted">Agrega ciudades y personas; visualiza el grafo en tiempo real.</p>

      <section className="card card--form" aria-labelledby="city-form-title" aria-live="polite">
        <p className="badge badge--info">Nueva ciudad</p>
        <div className="row row--between">
          <h2 className="card__title" id="city-form-title">Crear ciudad</h2>
        </div>
        <form className="form-grid" onSubmit={e => { e.preventDefault(); handleAddCity(); }} noValidate>
          <label className="field" htmlFor="city-name">
            <span className="field__label">Nombre de la ciudad</span>
            <input
              id="city-name"
              className={`field__control input${cityError ? " input--error" : pCity && !cityError ? " input--ok" : ""}`}
              placeholder="Ej: Cali"
              value={pCity}
              onChange={e => { setPCity(e.target.value); setCityTouched(true); }}
              aria-invalid={!!cityError}
              aria-describedby="city-name-desc city-name-err"
              onBlur={() => setCityTouched(true)}
            />
            <span className="field__desc" id="city-name-desc">Escribe el nombre de la ciudad a agregar.</span>
            {cityError && <span className="field__error" id="city-name-err"><IconAlertCircle size={16}/> Este campo es obligatorio.</span>}
            {!cityError && pCity && <span className="field__ok"><IconCheck size={16}/> ¡Correcto!</span>}
          </label>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={!!cityError}
          >
            Agregar ciudad
          </button>
        </form>
        <p className="card__body">Cada ciudad se representa como un nodo independiente y puede visualizarse aunque no tenga habitantes todavía.</p>
      </section>

      <section className="card card--form" aria-labelledby="person-form-title">
        <p className="badge badge--success">Nueva persona</p>
        <div className="row row--between">
          <h2 className="card__title" id="person-form-title">Añadir persona</h2>
        </div>
        <form className="form-grid" onSubmit={e => { e.preventDefault(); handleAddPerson(); }} noValidate>
          <label className="field" htmlFor="person-name">
            <span className="field__label">Nombre</span>
            <input
              id="person-name"
              className={`field__control input${personErrors.name ? " input--error" : pName && !personErrors.name ? " input--ok" : ""}`}
              placeholder="Nombre"
              value={pName}
              onChange={e => { setPName(e.target.value); setPersonTouched(t => ({ ...t, name: true })); }}
              aria-invalid={!!personErrors.name}
              aria-describedby="person-name-desc person-name-err"
              onBlur={() => setPersonTouched(t => ({ ...t, name: true }))}
            />
            <span className="field__desc" id="person-name-desc">Nombre de la persona.</span>
            {personErrors.name && <span className="field__error" id="person-name-err"><IconAlertCircle size={16}/> Este campo es obligatorio.</span>}
            {!personErrors.name && pName && <span className="field__ok"><IconCheck size={16}/> ¡Correcto!</span>}
          </label>
          <label className="field" htmlFor="person-age">
            <span className="field__label">Edad</span>
            <input
              id="person-age"
              className={`field__control input${personErrors.age ? " input--error" : pAge && !personErrors.age ? " input--ok" : ""}`}
              placeholder="Edad"
              value={pAge}
              onChange={e => { setPAge(e.target.value); setPersonTouched(t => ({ ...t, age: true })); }}
              aria-invalid={!!personErrors.age}
              aria-describedby="person-age-desc person-age-err"
              onBlur={() => setPersonTouched(t => ({ ...t, age: true }))}
              inputMode="numeric"
            />
            <span className="field__desc" id="person-age-desc">Edad en años (número positivo).</span>
            {personErrors.age && <span className="field__error" id="person-age-err"><IconAlertCircle size={16}/> Ingresa una edad válida.</span>}
            {!personErrors.age && pAge && <span className="field__ok"><IconCheck size={16}/> ¡Correcto!</span>}
          </label>
          <label className="field" htmlFor="person-city">
            <span className="field__label">Ciudad</span>
            <input
              id="person-city"
              className={`field__control input${personErrors.city ? " input--error" : (pCity || activeCityFilter) && !personErrors.city ? " input--ok" : ""}`}
              placeholder="Vacío = usa ciudad filtrada"
              value={pCity}
              onChange={e => { setPCity(e.target.value); setPersonTouched(t => ({ ...t, city: true })); }}
              aria-invalid={!!personErrors.city}
              aria-describedby="person-city-desc person-city-err"
              onBlur={() => setPersonTouched(t => ({ ...t, city: true }))}
            />
            <span className="field__desc" id="person-city-desc">Si está vacío, se usará la ciudad filtrada.</span>
            {personErrors.city && <span className="field__error" id="person-city-err"><IconAlertCircle size={16}/> Especifica una ciudad válida.</span>}
            {!personErrors.city && (pCity || activeCityFilter) && <span className="field__ok"><IconCheck size={16}/> ¡Correcto!</span>}
          </label>
          <button
            type="submit"
            className="btn btn--subtle"
            disabled={!!personErrors.name || !!personErrors.age || !!personErrors.city}
          >
            Agregar persona
          </button>
        </form>
        <p className="card__body">Si la ciudad no existe aún, agrégala desde el panel anterior. Si el campo queda vacío, se usará automáticamente la ciudad que estás filtrando.</p>
      </section>

      <div className="card card--form">
        <div className="row row--between">
          <h2 className="card__title">Personas por ciudad</h2>
          <span className="badge badge--muted">{people.length} resultados</span>
        </div>
        <div className="form-grid">
          <label className="field">
            <span className="field__label">Ciudad a consultar</span>
            <input
              className="field__control input"
              placeholder="Ej: Cali"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleFilter}
            >
              Listar
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleClearFilter}
            >
              Clear
            </button>
          </div>
        </div>
        <p className="card__body">
          Personas que viven en <strong>{activeCityFilter || "todas las ciudades"}</strong>:
        </p>
        <ul className="people-list list-reset">
          {people.map((p) => (
            <li key={p.id} className="people-card">
              <span className="row">
                <Avatar type="person" />
                <span>{p.label}</span>
              </span>
              <span className="people-card__meta">{p.age} años</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card card--graph">
        <div className="row row--between">
          <h2 className="card__title">Visualización del grafo</h2>
          <div className="btn-group">
            <span className="badge badge--info">Nodos: {stats.nodes}</span>
            <span className="badge badge--warning">Aristas: {stats.links}</span>
          </div>
        </div>
        <div className="graph-wrapper">
          <GraphViz data={d3data} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <div className="bg-animate" aria-hidden="true" />
      <ParticlesBg />
      <AppContent />
    </ToastProvider>
  );
}
