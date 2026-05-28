import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { adminApi } from "../../api/api";

const alternativaInicial = { texto: "", tipoResultado: "CORRETA", pontos: 10, perguntaId: "" };
const feedbackInicial = { titulo: "", mensagem: "", dica: "", alternativaId: "" };

function GerenciarAlternativas() {
  const [perguntas, setPerguntas] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [alternativa, setAlternativa] = useState(alternativaInicial);
  const [feedback, setFeedback] = useState(feedbackInicial);
  const [editandoAlternativa, setEditandoAlternativa] = useState(null);
  const [editandoFeedback, setEditandoFeedback] = useState(null);

  async function carregar() {
    const [listaPerguntas, listaAlternativas, listaFeedbacks] = await Promise.all([
      adminApi.listarPerguntas(),
      adminApi.listarAlternativas(),
      adminApi.listarFeedbacks(),
    ]);
    setPerguntas(listaPerguntas);
    setAlternativas(listaAlternativas);
    setFeedbacks(listaFeedbacks);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, []);

  async function salvarAlternativa(event) {
    event.preventDefault();
    const dados = { ...alternativa, perguntaId: Number(alternativa.perguntaId), pontos: Number(alternativa.pontos) };
    if (editandoAlternativa) {
      await adminApi.atualizarAlternativa(editandoAlternativa, dados);
    } else {
      await adminApi.criarAlternativa(dados);
    }
    setAlternativa(alternativaInicial);
    setEditandoAlternativa(null);
    carregar();
  }

  async function salvarFeedback(event) {
    event.preventDefault();
    const dados = { ...feedback, alternativaId: Number(feedback.alternativaId) };
    if (editandoFeedback) {
      await adminApi.atualizarFeedback(editandoFeedback, dados);
    } else {
      await adminApi.criarFeedback(dados);
    }
    setFeedback(feedbackInicial);
    setEditandoFeedback(null);
    carregar();
  }

  return (
    <AdminLayout title="Gerenciar Alternativas">
      <section className="admin-panel">
        <p className="admin-message">Alternativas</p>
        <form className="admin-form" onSubmit={salvarAlternativa}>
          <label className="wide">Texto<textarea value={alternativa.texto} onChange={(e) => setAlternativa({ ...alternativa, texto: e.target.value })} /></label>
          <label>Resultado<select value={alternativa.tipoResultado} onChange={(e) => setAlternativa({ ...alternativa, tipoResultado: e.target.value })}><option>CORRETA</option><option>PARCIAL</option><option>ERRADA</option></select></label>
          <label>Pontos<input type="number" value={alternativa.pontos} onChange={(e) => setAlternativa({ ...alternativa, pontos: e.target.value })} /></label>
          <label>Pergunta<select value={alternativa.perguntaId} onChange={(e) => setAlternativa({ ...alternativa, perguntaId: e.target.value })}><option value="">Selecione</option>{perguntas.map((item) => <option key={item.id} value={item.id}>{item.enunciado}</option>)}</select></label>
          <div className="admin-actions"><button className="admin-button" type="submit">Salvar alternativa</button></div>
        </form>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Texto</th><th>Resultado</th><th>Pontos</th><th>Pergunta</th><th>Acoes</th></tr></thead>
          <tbody>{alternativas.map((item) => (
            <tr key={item.id}>
              <td>{item.texto}</td><td>{item.tipoResultado}</td><td>{item.pontos}</td><td>{item.perguntaId}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => { setAlternativa(item); setEditandoAlternativa(item.id); }}>Editar</button>
                <button className="admin-button danger" onClick={async () => { await adminApi.excluirAlternativa(item.id); carregar(); }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      <section className="admin-panel">
        <p className="admin-message">Feedbacks</p>
        <form className="admin-form" onSubmit={salvarFeedback}>
          <label>Titulo<input value={feedback.titulo} onChange={(e) => setFeedback({ ...feedback, titulo: e.target.value })} /></label>
          <label className="wide">Mensagem<textarea value={feedback.mensagem} onChange={(e) => setFeedback({ ...feedback, mensagem: e.target.value })} /></label>
          <label>Dica<input value={feedback.dica} onChange={(e) => setFeedback({ ...feedback, dica: e.target.value })} /></label>
          <label>Alternativa<select value={feedback.alternativaId} onChange={(e) => setFeedback({ ...feedback, alternativaId: e.target.value })}><option value="">Selecione</option>{alternativas.map((item) => <option key={item.id} value={item.id}>{item.tipoResultado} - {item.texto}</option>)}</select></label>
          <div className="admin-actions"><button className="admin-button" type="submit">Salvar feedback</button></div>
        </form>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Titulo</th><th>Mensagem</th><th>Tipo</th><th>Alternativa</th><th>Acoes</th></tr></thead>
          <tbody>{feedbacks.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td><td>{item.mensagem}</td><td>{item.tipoResultado}</td><td>{item.alternativaId}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => { setFeedback(item); setEditandoFeedback(item.id); }}>Editar</button>
                <button className="admin-button danger" onClick={async () => { await adminApi.excluirFeedback(item.id); carregar(); }}>Excluir</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </AdminLayout>
  );
}

export default GerenciarAlternativas;
