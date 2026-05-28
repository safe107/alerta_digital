import { Link, NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ title, children }) {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">Alerta Digital</Link>
        <nav>
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/cenarios">Cenarios</NavLink>
          <NavLink to="/admin/perguntas">Perguntas</NavLink>
          <NavLink to="/admin/alternativas">Alternativas</NavLink>
          <NavLink to="/admin/ranking">Ranking</NavLink>
        </nav>
        <button type="button" className="admin-logout" onClick={sair}>Sair</button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>Painel administrativo</span>
            <h1>{title}</h1>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
