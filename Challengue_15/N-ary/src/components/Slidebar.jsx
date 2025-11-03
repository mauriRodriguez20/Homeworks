import "../styles.css";
import { useState } from "react";


function Item({ node, level, activeLink, onPick, onToggle }) {
  const isActive = activeLink === node.value.link;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="menu-item" style={{ paddingLeft: 4 + level * 8 }}>
      <div
        className={"menu-row" + (isActive ? " active" : "")}
        onClick={() => onPick(node.value)}
      >
        <span
          className="chev"
          onClick={(e) => { e.stopPropagation(); if (hasChildren) onToggle(node); }}
          title={hasChildren ? (node.open ? "Colapsar" : "Expandir") : ""}
        >
          {hasChildren ? (node.open ? "▾" : "▸") : "•"}
        </span>
        <span className="title">{node.value.title}</span>
      </div>

      {hasChildren && node.open && (
        <div className="children">
          {node.children.map((ch, i) => (
            <Item
              key={node.value.link + "-" + i}
              node={ch}
              level={level + 1}
              activeLink={activeLink}
              onPick={onPick}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ root, activeLink, onPick }) {
  const [, setTick] = useState(0);
  const force = () => setTick(t => t + 1);

  const handleToggle = (node) => {
    node.open = !node.open;
    force();
  };

  if (!root) return null;
  return (
    <aside className="sidebar">
      <h3 className="sidebar__title">Menú</h3>
      <Item
        node={root}
        level={0}
        activeLink={activeLink}
        onPick={onPick}
        onToggle={handleToggle}
      />
    </aside>
  );
}
