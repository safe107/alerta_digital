import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import { buscarRanking } from "../../api/api";
import Button from "../../components/Button/Button";

import "./Ranking.css";

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarRanking() {
      try {
        const data = await buscarRanking();
        setRanking(data);
      } catch (error) {
        console.error(error);
      }
    }

    carregarRanking();
  }, []);

  const top3 = ranking.slice(0, 3);
  const restante = ranking.slice(3);

  function handleReiniciar() {
  localStorage.removeItem("jogadorId");
  localStorage.removeItem("jogadorNome");
  localStorage.removeItem("cenarioAtual");
  localStorage.removeItem("cenariosConcluidos");

  navigate("/");
}

  return (
    <PageTransition>
  <main className="home-container">
      <h1>Ranking</h1>

      <section className="podium">
        {top3.map((jogador, index) => (
          <div className={`podium-card lugar-${index + 1}`} key={jogador.id}>
            <span className="podium-position">#{index + 1}</span>
            <h2>{jogador.nome}</h2>
            <strong>{jogador.pontuacaoTotal} pts</strong>
          </div>
        ))}
      </section>

      <section className="ranking-list">
        {restante.map((jogador, index) => (
          <div className="ranking-item" key={jogador.id}>
            <span>
              #{index + 4} - {jogador.nome}
            </span>

            <strong>{jogador.pontuacaoTotal} pts</strong>
          </div>
        ))}
      </section>

      <div className="ranking-actions">
  <Button onClick={() => navigate("/cenarios")}>
    Jogar outro cenário
  </Button>

  <Button onClick={handleReiniciar}>
    Novo jogador
  </Button>
</div>
    </main>
    </PageTransition>
  );
}

export default Ranking;