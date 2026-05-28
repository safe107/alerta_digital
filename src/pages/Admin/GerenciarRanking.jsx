import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { adminApi } from "../../api/api";

function GerenciarRanking() {
  const [jogadores, setJogadores] = useState([]);

  async function carregar() {
    setJogadores(await adminApi.listarRanking());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, []);

  async function editarPontuacao(id, pontuacaoAtual) {
    const valor = window.prompt("Nova pontuacao", pontuacaoAtual);
    if (valor === null) {
      return;
    }

    await adminApi.atualizarPontuacao(id, Number(valor));
    carregar();
  }

  async function resetar() {
    if (!window.confirm("Resetar a pontuacao de todos os jogadores?")) {
      return;
    }
    await adminApi.resetarRanking();
    carregar();
  }

  return (
    <AdminLayout title="Gerenciar Ranking">
      <section className="admin-panel">
        <div className="admin-actions">
          <button className="admin-button danger" type="button" onClick={resetar}>Resetar pontuacoes</button>
        </div>
      </section>

      <section className="admin-panel admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Jogador</th><th>Pontuacao</th><th>Criado em</th><th>Acoes</th></tr></thead>
          <tbody>{jogadores.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.pontuacaoTotal}</td>
              <td>{item.dataCriacao}</td>
              <td className="admin-actions">
                <button className="admin-button ghost" onClick={() => editarPontuacao(item.id, item.pontuacaoTotal)}>Editar pontos</button>
                <button className="admin-button danger" onClick={async () => { await adminApi.excluirJogador(item.id); carregar(); }}>Remover</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </AdminLayout>
  );
}

export default GerenciarRanking;
