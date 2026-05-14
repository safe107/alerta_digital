import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/Button/Button";

import "./Feedback.css";

function Feedback() {
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const jogadorId = localStorage.getItem("jogadorId");

    if (!jogadorId) {
      navigate("/jogador");
    }
  }, [navigate]);

  if (!state) {
    return <h1>Nenhum feedback encontrado.</h1>;
  }

  const cenariosConcluidos =
    JSON.parse(localStorage.getItem("cenariosConcluidos")) || [];

  const cenarioAtual = Number(
    localStorage.getItem("cenarioAtual")
  );

  if (!cenariosConcluidos.includes(cenarioAtual)) {
    cenariosConcluidos.push(cenarioAtual);

    localStorage.setItem(
      "cenariosConcluidos",
      JSON.stringify(cenariosConcluidos)
    );
  }

  const terminouTreinamento =
    cenariosConcluidos.length >= 5;

  return (
    <main className="feedback-container">
      <section className="feedback-card">
        <div className="feedback-resultado">
          Resultado: {state.resultado}
        </div>

        <div className="feedback-estrelas">
          {state.resultado === "CORRETA" && "⭐⭐⭐"}

          {state.resultado === "PARCIAL" && "⭐⭐"}

          {state.resultado === "ERRADA" && "⭐"}
        </div>

        <div className="feedback-pontos">
          +{state.pontosGanhos} pontos
        </div>

        <h2>{state.tituloFeedback}</h2>

        <p>{state.mensagemFeedback}</p>

        <div className="feedback-dica">
          <strong>Dica:</strong>

          <p>{state.dica}</p>
        </div>

        <div className="feedback-total">
          Pontuação total: {state.pontuacaoTotal}
        </div>

        <br />

        <div className="feedback-actions">
          {!terminouTreinamento ? (
            <Button onClick={() => navigate("/cenarios")}>
              Escolher outro cenário
            </Button>
          ) : (
            <Button onClick={() => navigate("/conclusao")}>
              Finalizar treinamento
            </Button>
          )}

          <Button onClick={() => navigate("/ranking")}>
            Ver Ranking
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Feedback;