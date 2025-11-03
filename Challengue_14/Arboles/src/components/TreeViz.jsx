import { useMemo } from "react";
import Tree from "react-d3-tree";
import "../styles.css";

export default function TreeViz({ data }) {
  const translated = useMemo(() => ({ x: 300, y: 80 }), []);
  if (!data) return <p className="muted">No hay datos para visualizar.</p>;
  return (
    <div className="card">
      <h2 className="card__title">Visualización del Árbol</h2>
      <div className="tree-wrapper">
        <Tree
          data={data}
          translate={translated}
          orientation="vertical"
          collapsible={false}
          zoom={0.75}
        />
      </div>
    </div>
  );
}
