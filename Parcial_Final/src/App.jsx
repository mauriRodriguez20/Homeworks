import { useEffect, useRef, useState } from "react";
import { CityGraph } from "./structures/CityGraph";
import { GraphView } from "./components/GraphView";


function renderZonesTree(node, level) {
  if (!node) return null;

  return (
    <li>
      <span>
        {"-".repeat(level)} {node.name}
      </span>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => renderZonesTree(child, level + 1))}
        </ul>
      )}
    </li>
  );
}

function App() {
  const [version, setVersion] = useState(0);

  const [newCityName, setNewCityName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [connCityA, setConnCityA] = useState("");
  const [connCityB, setConnCityB] = useState("");

  const [zoneName, setZoneName] = useState("");
  const [parentZoneName, setParentZoneName] = useState("");

  const [editOldZoneName, setEditOldZoneName] = useState("");
  const [editNewZoneName, setEditNewZoneName] = useState("");


  const graphRef = useRef(new CityGraph());
  const graph = graphRef.current;

  const forceRerender = () => setVersion((v) => v + 1);

 
  useEffect(() => {
    try {
      const stored = localStorage.getItem("city-graph");
      if (stored) {
        const parsed = JSON.parse(stored);
        graph.loadFromData(parsed);
        forceRerender();
      }
    } catch (error) {
      console.error("No se pudo cargar el grafo", error);
    }
  }, [graph]);

  
  useEffect(() => {
    try {
      const payload = JSON.stringify(graph.toJSON());
      localStorage.setItem("city-graph", payload);
    } catch (error) {
      console.error("No se pudo guardar el grafo", error);
    }
  }, [graph, version]);

  const cities = graph.cities;
  const currentCity = selectedCity ? graph.getCity(selectedCity) : null;
  const currentStats = selectedCity
    ? graph.getCityZonesStats(selectedCity)
    : { total: 0, height: 0 };
  const neighbors = selectedCity ? graph.getNeighbors(selectedCity) : [];

  
  const handleAddCity = () => {
    const name = newCityName.trim();
    if (!name) return;

    graph.addCity(name);
    setNewCityName("");
    forceRerender();
  };

  
  const handleDeleteCity = (name) => {
    graph.removeCity(name);
    if (selectedCity === name) {
      setSelectedCity("");
    }
    forceRerender();
  };

  
  const handleAddConnection = () => {
    const a = connCityA.trim();
    const b = connCityB.trim();

    if (!a || !b || a === b) return;
    if (!graph.getCity(a) || !graph.getCity(b)) {
      alert("Ambas ciudades deben existir para crear la conexion.");
      return;
    }

    graph.addConnection(a, b);
    forceRerender();
  };

  
  const handleAddZone = () => {
    if (!selectedCity) return;

    const name = zoneName.trim();
    if (!name) return;

    const parent = parentZoneName.trim();
    const city = graph.getCity(selectedCity);
    if (!city) return;

    const newZone = city.addZone(name, parent || null);
    if (!newZone) {
      alert("No se pudo agregar la zona. Revisa el nombre de la zona padre.");
    } else {
      setZoneName("");
      setParentZoneName("");
      forceRerender();
    }
  };

  
  const handleEditZone = () => {
    if (!selectedCity) return;

    const oldName = editOldZoneName.trim();
    const newName = editNewZoneName.trim();

    if (!oldName || !newName) return;

    const city = graph.getCity(selectedCity);
    if (!city) return;

    const ok = city.editZoneName(oldName, newName);
    if (!ok) {
      alert("No se encontro la zona a editar.");
    } else {
      setEditOldZoneName("");
      setEditNewZoneName("");
      forceRerender();
    }
  };

  const { total, height } = currentStats;

  return (
    <div className="app-container">
      <h1>Parcial Final</h1>
      <h2>Redes de Ciudades y Zonas</h2>

      
      <section className="panel">
        <h2>Ciudades</h2>

          <div className="card">
          <h3>Agregar ciudad</h3>
          <input
            type="text"
            placeholder="Nombre de la ciudad"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
          />
          <button onClick={handleAddCity}>Agregar</button>
        </div>

        
        <div className="card">
          <h3>Listado de ciudades</h3>
          {cities.length === 0 ? (
            <p className="hint">No hay ciudades aún.</p>
          ) : (
            <ul className="city-list">
              {cities.map((city) => (
                <li key={city.name}>
                  <button
                    className={`city-btn ${
                      selectedCity === city.name ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCity(city.name)}
                  >
                    {city.name}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCity(city.name)}
                    aria-label={`Delete ${city.name}`}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="card">
          <h3>Conexiones</h3>
          <div className="connection-row">
            <select
              value={connCityA}
              onChange={(e) => setConnCityA(e.target.value)}
            >
              <option value="">Ciudad A</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <span> &lt;-&gt; </span>
            <select
              value={connCityB}
              onChange={(e) => setConnCityB(e.target.value)}
            >
              <option value="">Ciudad B</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddConnection}>Conectar</button>

          {selectedCity && (
            <div>
              <h4>Vecinos de {selectedCity}:</h4>
              {neighbors.length === 0 ? (
                <p className="hint">No hay conexiones.</p>
              ) : (
                <ul>
                  {neighbors.map((neighbor) => (
                    <li key={neighbor}>{neighbor}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="panel">
        <h2>Zonas Verdes</h2>

        {!currentCity ? (
          <p className="hint">Selecciona una ciudad para gestionar sus zonas verdes.</p>
        ) : (
          <div className="card">
            <div>
              <h3>Ciudad seleccionada</h3>
              <p>
                <strong>{currentCity.name}</strong>
              </p>
              <p>Total de zonas verdes: {total}</p>
              <p>Altura máxima: {height}</p>
            </div>

            <div>
              <h3>Agregar zona</h3>
              <input
                type="text"
                placeholder="Nombre de la zona"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Zona padre (opcional)"
                value={parentZoneName}
                onChange={(e) => setParentZoneName(e.target.value)}
              />
              <button onClick={handleAddZone}>Agregar zona</button>
              <p className="hint">
                Primera zona: raiz del arbol. Si especificas una zona padre, se
                agregara como subzona.
              </p>
            </div>

            <div>
              <h3>Editar zona</h3>
              <input
                type="text"
                placeholder="Nombre actual de la zona"
                value={editOldZoneName}
                onChange={(e) => setEditOldZoneName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nuevo nombre de la zona"
                value={editNewZoneName}
                onChange={(e) => setEditNewZoneName(e.target.value)}
              />
              <button onClick={handleEditZone}>Editar zona</button>
            </div>

            
            <div>
              <h3>Árbol de zonas</h3>
              {!currentCity.zonesRoot ? (
                <p className="hint">No hay zonas aún.</p>
              ) : (
                <ul className="zones-tree">
                  {renderZonesTree(currentCity.zonesRoot, 0)}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Grafo</h2>
        {cities.length === 0 ? (
          <p className="hint">Agrega algunas ciudades para ver el grafo.</p>
        ) : (
          <GraphView
            graphInstance={graph}
            onSelectCity={(cityName) => setSelectedCity(cityName)}
          />
        )}
      </section>
    </div>
  );
}

export default App;
