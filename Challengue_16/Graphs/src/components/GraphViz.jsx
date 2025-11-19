import { Graph } from "react-d3-graph";

const baseConfig = {
  directed: false,
  height: 520,
  width: 980,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  node: {
    size: 360,
    fontSize: 12,
    highlightFontSize: 14,
    labelProperty: node => node.displayLabel,
    color: "#22d3ee",
    fontColor: "#e5e7eb",
    opacity: 0.95,
    highlightStrokeColor: "#fcd34d",
    highlightFontWeight: "700"
  },
  link: {
    color: "#cbd5e1",
    highlightColor: "#22d3ee",
    renderLabel: false,
    opacity: 0.75,
    type: "STRAIGHT"
  },
  d3: {
    gravity: -180,
    linkLength: 210,
    linkStrength: 1,
    alphaTarget: 0.04
  }
};

export default function GraphViz({ data }) {
  if (!data) return null;

  const config = {
    ...baseConfig,
    node: {
      ...baseConfig.node,
      renderLabel: true,
      labelPosition: "bottom"
    },
    panAndZoom: true,
    freezeAllDragEvents: false
  };

  const colored = {
    nodes: data.nodes.map(n => ({
      ...n,
      color: n.svgBadge === "person" ? "#22c55e" : "#60a5fa",
      size: n.svgBadge === "city" ? 600 : 320,
      strokeColor: n.svgBadge === "person" ? "#15803d" : "#1d4ed8"
    })),
    links: data.links
  };

  return (
    <div className="graph-wrapper">
      <Graph id="graph-id" data={colored} config={config} />
    </div>
  );
}
