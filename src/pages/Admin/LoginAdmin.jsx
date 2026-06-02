import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/api";
import "./LoginAdmin.css";

function LoginAdmin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("admin");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar(event) {
    event.preventDefault();
    setErro("");

    try {
      const data = await loginAdmin(usuario, senha);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch {
      setErro("Usuario ou senha invalidos.");
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={entrar}>
        <span>Alerta Digital</span>
        <h1>Login Admin</h1>

        {erro && <p className="admin-login-error">{erro}</p>}

        <label>
          Usuario
          <input value={usuario} onChange={(event) => setUsuario(event.target.value)} />
        </label>

        <label>
          Senha
          <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} />
        </label>

        <button type="submit">Entrar</button>
        <button type="button" className="admin-login-back" onClick={() => navigate("/jogador")}>
          Voltar ao jogo
        </button>
      </form>
    </main>
  );
}

export default LoginAdmin;
