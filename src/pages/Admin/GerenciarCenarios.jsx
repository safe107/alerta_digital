import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { adminApi } from "../../api/api";

const cenarioInicial = { titulo: "", descricao: "", categoria: "", ativo: true };
const mensagemInicial = { texto: "", remetente: "SISTEMA", ordem: 1, cenarioId: "" };

function GerenciarCenarios() {
  const [cenarios, setCenarios] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [cenario, setCenario] = useState(cenarioInicial);
  const [mensagem, setMensagem] = useState(mensagemInicial);
  const [editandoCenario, setEditandoCenario] = useState(null);
  const [editandoMensagem, setEditandoMensagem] = useState(null);

  async function carregar() {
    const [listaCenarios, listaMensagens] = await Promise.all([
      adminApi.listarCenarios(),
      adminApi.listarMensagens(),
    ]);
    setCenarios(listaCenarios);
    setMensagens(listaMensagens);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, []);

  async function salvarCenario(event) {
    event.preventDefault();
    if (editandoCenario) {
      await adminApi.atualizarCenario(editandoCenario, cenario);
    } else {
      await adminApi.criarCenario(cenario);
    }
    setCenario(cenarioInicial);
    setEditandoCenario(null);
    carregar();
  }

  async function salvarMensagem(event) {
    event.preventDefault();
    const dados = { ...mensagem, cenarioId: Number(mensagem.cenarioId), ordem: Number(mensagem.ordem) };
    if (editandoMensagem) {
      await adminApi.atualizarMensagem(editandoMensagem, dados);
    } else {
      await adminApi.criarMensagem(dados);
    }
    setMensagem(mensagemInicial);
    setEditandoMensagem(null);
    carregar();
  }

  return (
    <AdminLayout title="Gerenciar Cenarios">
      <section className="admin-panel">
        <p className="admin-message">Cenarios</p>
        <form className="admin-form" onSubmit={salvarCenario}>
          <label>Titulo<input value={cenario.titulo} onChange={(e) => setCenario({ ...cenario, titulo: e.target.value })} /></label>
          <label className="wide">Descricao<textarea value={cenario.descricao} onChange={(e) => setCenario({ ...cenario, descricao: e.target.value })} /></label>
          <label>Categoria<input value={cenario.categoria} onChange={(e) => setCenario({ ...cenario, categoria: e.target.value })} /></label>
          <label>Ativo<select value={String(cenario.ativo)} onChange={(e) => setCenario({ ...cenario, ativo: e.target.value === "true" })}><option value="true">Sim</option><option value="false">Nao</option></select></label>
          <div className="admin-actions"><button className="admin-button" type="submit">Salvar</button></div>
        </form>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Titulo</th><th>Categoria</th><th>Ativo</th><th>Acoes</th></tr></thead>
          <tbody>{cenarios.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td><td>{item.categoria}</td><td>{item.ativo ? "Sim" : "Nao"}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => { setCenario(item); setEditandoCenario(item.id); }}>Editar</button>
                <button className="admin-button danger" onClick={async () => {
                  try {
                    await adminApi.excluirCenario(item.id);
                    carregar();
                  } catch (error) {
                    alert(error.message || "Erro ao excluir cenario.");
                  }
                }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      <section className="admin-panel">
        <p className="admin-message">Mensagens do chat</p>
        <form className="admin-form" onSubmit={salvarMensagem}>
          <label className="wide">Texto<textarea value={mensagem.texto} onChange={(e) => setMensagem({ ...mensagem, texto: e.target.value })} /></label>
          <label>Remetente<input value={mensagem.remetente} onChange={(e) => setMensagem({ ...mensagem, remetente: e.target.value })} /></label>
          <label>Ordem<input type="number" value={mensagem.ordem} onChange={(e) => setMensagem({ ...mensagem, ordem: e.target.value })} /></label>
          <label>Cenario<select value={mensagem.cenarioId} onChange={(e) => setMensagem({ ...mensagem, cenarioId: e.target.value })}><option value="">Selecione</option>{cenarios.map((item) => <option key={item.id} value={item.id}>{item.titulo}</option>)}</select></label>
          <div className="admin-actions"><button className="admin-button" type="submit">Salvar mensagem</button></div>
        </form>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Ordem</th><th>Texto</th><th>Remetente</th><th>Cenario</th><th>Acoes</th></tr></thead>
          <tbody>{mensagens.map((item) => (
            <tr key={item.id}>
              <td>{item.ordem}</td><td>{item.texto}</td><td>{item.remetente}</td><td>{item.cenarioId}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => { setMensagem(item); setEditandoMensagem(item.id); }}>Editar</button>
                <button className="admin-button danger" onClick={async () => {
                  try {
                    await adminApi.excluirMensagem(item.id);
                    carregar();
                  } catch (error) {
                    alert(error.message || "Erro ao excluir mensagem.");
                  }
                }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </AdminLayout>
  );
}

export default GerenciarCenarios;
