import { useEffect, useMemo, useState } from "react";
import { BinaryTree } from "./structures/BinaryTree";
import TreeViz from "./components/TreeViz";
import { DEFAULT_NUMBERS } from "./data/binaryInput";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState(DEFAULT_NUMBERS.join(","));
  const [query, setQuery] = useState("");
  const [found, setFound] = useState(null);
  const [tree, setTree] = useState(() => new BinaryTree());

  
  useEffect(() => {
    const values = input
      .split(",")
      .map(v => Number(v.trim()))
      .filter(v => !Number.isNaN(v));

    const t = new BinaryTree();
    values.forEach(n => t.insert(n));
    setTree(t);

    
    const pre = [], ino = [], pos = [];
    t.preorder(t.root, v => pre.push(v));
    t.inorder(t.root, v => ino.push(v));
    t.postorder(t.root, v => pos.push(v));
    console.clear();
    console.log("PreOrder (N-L-R):", pre.join(" "));
    console.log("InOrder (L-N-R):", ino.join(" "));
    console.log("PostOrder (L-R-N):", pos.join(" "));
  }, [input]);

  const d3Data = useMemo(() => tree.toD3(), [tree]);

  const handleSearch = () => {
    const num = Number(query);
    if (Number.isNaN(num)) { setFound(false); return; }
    setFound(tree.contains(num));
  };

  return (
    <div className="container">
      <h1>Challenge 14 - Árbol Binario</h1>

      <div className="card">
        <h2 className="card__title">Inserte serie de números</h2>
        <p className="muted">Escriba los números separados por coma.</p>
        <div className="row">
          <input
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ejemplo: 8,3,10,1,6,14,4,7,13"
          />
          <button className="btn" onClick={() => setInput(input)}>Aplicar</button>
        </div>
      </div>

      <div className="card">
        <h2 className="card__title">Buscar valor en el árbol</h2>
        <div className="row">
          <input
            className="input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Número a buscar"
          />
          <button className="btn" onClick={handleSearch}>Buscar</button>
        </div>
        {found !== null && (
          <p className={found ? "ok" : "error"}>
            {found ? "Sí está en el árbol" : "No se encuentra"}
          </p>
        )}
        <p className="muted">Recorridos (F12).</p>
      </div>

      
      <TreeViz data={d3Data} />
    </div>
  );
}
