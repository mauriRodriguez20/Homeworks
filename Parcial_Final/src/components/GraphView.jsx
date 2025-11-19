
export const GraphView = ({ graphInstance, onSelectCity }) => {
  
  const nodes = graphInstance.cities.map((city) => ({
    name: city.name,
    stats: graphInstance.getCityZonesStats(city.name),
  }));
  const adjacency = graphInstance.adjacency;

  
  const edges = [];
  for (const cityName in adjacency) {
    const neighbors = adjacency[cityName] || [];
    for (let i = 0; i < neighbors.length; i++) {
      const neighborName = neighbors[i];
      if (cityName < neighborName) {
        edges.push({ source: cityName, target: neighborName });
      }
    }
  }


  const width = 720;
  const height = 480;
  const radius = Math.min(width, height) * 0.35;
  const centerX = width / 2;
  const centerY = height / 2;
  const positions = {};

  for (let i = 0; i < nodes.length; i++) {
    const angle = (2 * Math.PI * i) / Math.max(nodes.length, 1);
    positions[nodes[i].name] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  }

  const handleClick = (name) => {
    if (onSelectCity) {
      onSelectCity(name);
    }
  };

  if (nodes.length === 0) {
    return <p className="hint">Agrega algunas ciudades para ver el Grafo</p>;
  }

  return (
    <div className="panel">
      <svg
        className="graph-canvas"
        width="100%"
        height="500"
        viewBox={`0 0 ${width} ${height}`}
      >
        {edges.map((edge) => {
          const from = positions[edge.source];
          const to = positions[edge.target];
          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="edge"
            />
          );
        })}

        {nodes.map((node) => {
          const pos = positions[node.name];
          return (
            <g
              key={node.name}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => handleClick(node.name)}
              className="graph-node"
            >
              <circle r="26" />
              <text dy="6" textAnchor="middle">
                {node.name}
              </text>
              <text dy="38" textAnchor="middle" className="node-subtext">
                Zones: {node.stats.total}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
