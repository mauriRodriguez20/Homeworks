import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [imagenes, setImagenes] = useState([
    { id: 1, title: 'Computador 1',   url: 'https://picsum.photos/id/1/200/300' },
    { id: 2, title: 'Computador 2', url: 'https://picsum.photos/id/2/200/300' },
    { id: 3, title: 'Computador 3', url: 'https://picsum.photos/id/3/200/300' },
    { id: 4, title: 'Computador 4', url: 'https://picsum.photos/id/4/200/300' },
  ]);

  
  const [nuevoId, setNuevoId] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  const agregarImagen = (e) => {
    e.preventDefault();
    if (!nuevoId || !nuevoTitulo) return;

    const nueva = {
      id: parseInt(nuevoId, 10),
      title: nuevoTitulo,
      url: `https://picsum.photos/id/${nuevoId}/200/300`,
    };
    setImagenes((prev) => [...prev, nueva]);
    setNuevoId('');
    setNuevoTitulo('');
  };

  const norm = (s) =>
    (s || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const imagenesFiltradas = useMemo(() => {
    const q = norm(filtroTitulo);
    if (!q) return imagenes;
    return imagenes.filter((img) => norm(img.title).includes(q));
  }, [imagenes, filtroTitulo]);

  return (
    <div className="app">
      <div className="container">
        <div>
          <h1 className="main-title">Parcial Estructuras 2 - Mauriel</h1>
        </div>
        
        <div className="form-container card">
          <h2>Agregar Nueva Imagen</h2>
          <form onSubmit={agregarImagen} className="form">
            <div className="form-group">
              <label>ID de Imagen (número)</label>
              <input
                type="number"
                value={nuevoId}
                onChange={(e) => setNuevoId(e.target.value)}
                placeholder="Ej: 5"
                required
              />
            </div>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                placeholder="Ej: Mi nueva imagen"
                required
              />
            </div>
            <button type="submit" className="btn-add">Agregar</button>
          </form>
        </div>

       
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
              className="search-input"
              placeholder="Buscar por título…"
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        
        <div className="images-grid">
          {imagenesFiltradas.map((img) => (
            <div key={`${img.id}-${img.title}`} className="image-card">
              <div className="image-wrapper">
                <img
                  src={img.url}
                  alt={img.title}
                  className="image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x300/cccccc/666666?text=ID+${img.id}`;
                  }}
                />
                <div className="image-id">ID: {img.id}</div>
              </div>
              <div className="image-info">
                <h3 className="image-title">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {imagenesFiltradas.length === 0 && filtroTitulo !== '' && (
          <div className="no-results">
            <p>No se encontraron imágenes con el título “{filtroTitulo}”.</p>
          </div>
        )}

        <div className="results-info">
          {filtroTitulo !== ''
            ? <p>Mostrando {imagenesFiltradas.length} de {imagenes.length} imágenes</p>
            : <p>Total: {imagenes.length} imágenes</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
