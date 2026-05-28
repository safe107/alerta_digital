import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { adminApi } from "../../api/api";

function Dashboard() {
  const [totais, setTotais] = useState({ cenarios: 0, perguntas: 0, alternativas: 0, jogadores: 0 });

  useEffect(() => {
    async function carregar() {
      const [cenarios, perguntas, alternativas, ranking] = await Promise.all([
        adminApi.listarCenarios(),
        adminApi.listarPerguntas(),
        adminApi.listarAlternativas(),
        adminApi.listarRanking(),
      ]);

      setTotais({
        cenarios: cenarios.length,
        perguntas: perguntas.length,
        alternativas: alternativas.length,
        jogadores: ranking.length,
      });
    }

    carregar();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <section className="admin-grid">
        <div className="admin-panel"><strong>{totais.cenarios}</strong><p>Cenarios cadastrados</p></div>
        <div className="admin-panel"><strong>{totais.perguntas}</strong><p>Perguntas</p></div>
        <div className="admin-panel"><strong>{totais.alternativas}</strong><p>Alternativas</p></div>
        <div className="admin-panel"><strong>{totais.jogadores}</strong><p>Jogadores no ranking</p></div>
      </section>
    </AdminLayout>
  );
}

export default Dashboard;
