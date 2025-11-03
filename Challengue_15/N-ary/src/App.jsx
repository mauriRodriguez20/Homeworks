import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Generic from "./pages/Generic";
import Sidebar from "./components/Slidebar";
import { NNode, NaryTree } from "./structures/NaryTree";


function buildMenuTree() {
  const root = new NNode({ title: "Inicio", link: "/home", component: "Home" });

  // REPORTES
  const reports = new NNode({ title: "Reportes", link: "/reports", component: "Reports" });
  const monthly = new NNode({ title: "Mensuales", link: "/reports/monthly", component: "Reports" });
  const quarterly = new NNode({ title: "Trimestrales", link: "/reports/quarterly", component: "Reports" });
  const yearly  = new NNode({ title: "Anuales", link: "/reports/yearly", component: "Reports" });

  // Subniveles 
  const q1 = new NNode({ title: "Q1", link: "/reports/quarterly/q1", component: "Generic" });
  const q2 = new NNode({ title: "Q2", link: "/reports/quarterly/q2", component: "Generic" });
  const q3 = new NNode({ title: "Q3", link: "/reports/quarterly/q3", component: "Generic" });
  const q4 = new NNode({ title: "Q4", link: "/reports/quarterly/q4", component: "Generic" });
  quarterly.addChild(q1); quarterly.addChild(q2); quarterly.addChild(q3); quarterly.addChild(q4);

  reports.addChild(monthly);
  reports.addChild(quarterly);
  reports.addChild(yearly);

  // CONFIGURACIÓN
  const settings = new NNode({ title: "Configuración", link: "/settings", component: "Settings" });
  const profile  = new NNode({ title: "Perfil", link: "/settings/profile", component: "Generic" });
  const prefs    = new NNode({ title: "Preferencias", link: "/settings/prefs", component: "Generic" });
  const security = new NNode({ title: "Seguridad", link: "/settings/security", component: "Generic" });
  const password = new NNode({ title: "Cambio de contraseña", link: "/settings/security/password", component: "Generic" });
  const twofa    = new NNode({ title: "2FA", link: "/settings/security/2fa", component: "Generic" });
  security.addChild(password); security.addChild(twofa);
  settings.addChild(profile); settings.addChild(prefs); settings.addChild(security);

  // HERRAMIENTAS
  const tools   = new NNode({ title: "Herramientas", link: "/tools", component: "Generic" });
  const importT = new NNode({ title: "Importar datos", link: "/tools/import", component: "Generic" });
  const exportT = new NNode({ title: "Exportar datos", link: "/tools/export", component: "Generic" });
  const cleanT  = new NNode({ title: "Limpieza de datos", link: "/tools/cleaner", component: "Generic" });
  tools.addChild(importT); tools.addChild(exportT); tools.addChild(cleanT);

  // AYUDA
  const help   = new NNode({ title: "Ayuda", link: "/help", component: "Generic" });
  const faq    = new NNode({ title: "FAQ", link: "/help/faq", component: "Generic" });
  const contact= new NNode({ title: "Contacto", link: "/help/contact", component: "Generic" });
  help.addChild(faq); help.addChild(contact);

  // ADMINISTRACIÓN
  const admin  = new NNode({ title: "Administración", link: "/admin", component: "Generic" });
  const users  = new NNode({ title: "Usuarios", link: "/admin/users", component: "Generic" });
  const roles  = new NNode({ title: "Roles", link: "/admin/roles", component: "Generic" });
  const system = new NNode({ title: "Sistema", link: "/admin/system", component: "Generic" });
  const logs   = new NNode({ title: "Logs", link: "/admin/system/logs", component: "Generic" });
  const audit  = new NNode({ title: "Auditoría", link: "/admin/system/audit", component: "Generic" });
  system.addChild(logs); system.addChild(audit);
  admin.addChild(users); admin.addChild(roles); admin.addChild(system);

  
  root.addChild(reports);
  root.addChild(settings);
  root.addChild(tools);
  root.addChild(help);
  root.addChild(admin);

  return new NaryTree(root);
}

export default function App(){
  const tree = useMemo(() => buildMenuTree(), []);
  const [active, setActive] = useState(tree.root.value);

  // DFS/BFS 
  useEffect(() => {
    console.clear();
    console.log("DFS:");  tree.dfs(v => console.log(" -", v.title));
    console.log("BFS:");  tree.bfs(v => console.log(" -", v.title));
  }, [tree]);

  function getComponentToRender() {
    switch (active.component) {
      case "Home": return <Home />;
      case "Reports": {
        const variant =
          active.link.endsWith("monthly")   ? "Mensuales"  :
          active.link.endsWith("quarterly") ? "Trimestrales" :
          active.link.endsWith("yearly")    ? "Anuales"    : null;
        return <Reports variant={variant} />;
      }
      case "Settings": return <Settings />;
      case "Generic": {
        // Derivar títulos legibles desde el link
        const parts = active.link.split("/").filter(Boolean).slice(0); // ["reports","quarterly","q1"]
        const title = (parts[0] || "").toUpperCase();                  // REPORTES / SETTINGS / 
        const subtitle = parts.slice(1).map(s => s.toUpperCase()).join(" / ") || null;
        return <Generic title={title} subtitle={subtitle} />;
      }
      default: return <Home />;
    }
  }

  return (
    <div className="layout">
      <Sidebar
        root={tree.root}
        activeLink={active.link}
        onPick={(val) => setActive(val)}
      />

      <main className="content">
        <div className="toolbar">
          <button className="btn" onClick={() => {
            console.log("DFS:"); tree.dfs(v => console.log(" -", v.title));
          }}>Imprimir DFS</button>
          <button className="btn" onClick={() => {
            console.log("BFS:"); tree.bfs(v => console.log(" -", v.title));
          }}>Imprimir BFS</button>
        </div>

        <div className="card">
          {getComponentToRender()}
        </div>
      </main>
    </div>
  );
}
