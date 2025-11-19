import { Graph } from "react-d3-graph";

// Config minimalista, con buen contraste para modo oscuro.
const baseConfig = {
  directed: false,
  height: 500,
  width: 980,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  node: {
    size: 350,
    fontSize: 11,
    highlightFontSize: 13,
    labelProperty: "name",
    color: "#22d3ee",
    // Texto claro para fondo oscuro
    fontColor: "#e5e7eb",
  },
  link: {
    // Enlaces más claros para mayor contraste
    color: "#cbd5e1",
    highlightColor: "#22d3ee",
    renderLabel: false
  }
};

export default function GraphViz({ data }) {
  if (!data) return null;

  // Colorea personas/ciudades distinto usando "svgBadge"
  const config = {
    ...baseConfig,
    node: {
      ...baseConfig.node,
      color: "#22d3ee",
      // Pequeña función para colorear por tipo:
      renderLabel: true
    }
  };

  // Nota: react-d3-graph no acepta función directa de color por nodo en config,
  // pero sí respeta "color" por nodo si lo añadimos en data.nodes.
  const colored = {
    nodes: data.nodes.map(n => ({
      ...n,
      color: n.svgBadge === "person" ? "#22c55e" : "#60a5fa"
    })),
    links: data.links
  };

  return (
    <div className="graph-wrapper">
      <Graph id="graph-id" data={colored} config={config} />
    </div>
  );
}
