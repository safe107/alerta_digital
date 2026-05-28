import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { adminApi } from "../../api/api";

const perguntaInicial = { enunciado: "", contexto: "", cenarioId: "" };

function GerenciarPerguntas() {
  const [cenarios, setCenarios] = useState([]);
  const [perguntas, setPerguntas] = useState([]);
  const [pergunta, setPergunta] = useState(perguntaInicial);
  const [editando, setEditando] = useState(null);

  async function carregar() {
    const [listaCenarios, listaPerguntas] = await Promise.all([
      adminApi.listarCenarios(),
      adminApi.listarPerguntas(),
    ]);
    setCenarios(listaCenarios);
    setPerguntas(listaPerguntas);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, []);

  async function salvar(event) {
    event.preventDefault();
    const dados = { ...pergunta, cenarioId: Number(pergunta.cenarioId) };
    if (editando) {
      await adminApi.atualizarPergunta(editando, dados);
    } else {
      await adminApi.criarPergunta(dados);
    }
    setPergunta(perguntaInicial);
    setEditando(null);
    carregar();
  }

  return (
    <AdminLayout title="Gerenciar Perguntas">
      <section className="admin-panel">
        <form className="admin-form" onSubmit={salvar}>
          <label className="wide">Enunciado<textarea value={pergunta.enunciado} onChange={(e) => setPergunta({ ...pergunta, enunciado: e.target.value })} /></label>
          <label className="wide">Contexto<textarea value={pergunta.contexto} onChange={(e) => setPergunta({ ...pergunta, contexto: e.target.value })} /></label>
          <label>Cenario<select value={pergunta.cenarioId} onChange={(e) => setPergunta({ ...pergunta, cenarioId: e.target.value })}><option value="">Selecione</option>{cenarios.map((item) => <option key={item.id} value={item.id}>{item.titulo}</option>)}</select></label>
          <div className="admin-actions"><button className="admin-button" type="submit">Salvar</button></div>
        </form>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Enunciado</th><th>Contexto</th><th>Cenario</th><th>Acoes</th></tr></thead>
          <tbody>{perguntas.map((item) => (
            <tr key={item.id}>
              <td>{item.enunciado}</td><td>{item.contexto}</td><td>{item.cenarioId}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => { setPergunta(item); setEditando(item.id); }}>Editar</button>
                <button className="admin-button danger" onClick={async () => { await adminApi.excluirPergunta(item.id); carregar(); }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </AdminLayout>
  );
}

export default GerenciarPerguntas;
