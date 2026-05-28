import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./Feedback.css";

function pickValue(source, keys, fallback = "") {
  for (const key of keys) {
    const value = key.split(".").reduce((obj, part) => obj?.[part], source);

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

function normalizeResultado(resultado) {
  const value = String(resultado || "").toUpperCase();

  if (value.includes("CORRETA") || value.includes("CERTO") || value === "BOA") {
    return "CORRETA";
  }

  if (value.includes("PARCIAL") || value.includes("RISCO")) {
    return "PARCIAL";
  }

  return "ERRADA";
}

function toNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isNaN(number) ? fallback : number;
}

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
    return (
      <main className="feedback-container">
        <section className="feedback-card">
          <h1>Nenhum feedback encontrado.</h1>
          <Button onClick={() => navigate("/cenarios")}>Voltar aos cen&aacute;rios</Button>
        </section>
      </main>
    );
  }

  const resultado = normalizeResultado(
    pickValue(state, ["resultado", "status", "tipoResultado", "classificacao"], "ERRADA")
  );

  const pontosGanhos = toNumber(
    pickValue(
      state,
      [
        "pontosGanhos",
        "pontos",
        "pontuacaoGanha",
        "pontuacao",
        "scoreGanho",
        "score",
        "feedback.pontos",
        "resposta.pontos",
        "resposta.pontosGanhos",
        "alternativa.pontos",
      ],
      0
    )
  );

  const pontuacaoTotal = toNumber(
    pickValue(
      state,
      [
        "pontuacaoTotal",
        "totalPontos",
        "jogador.pontuacaoTotal",
        "jogador.pontuacao",
        "resposta.pontuacaoTotal",
      ],
      localStorage.getItem("pontuacaoTotal") || 0
    )
  );

  const tituloFeedback = pickValue(
    state,
    ["tituloFeedback", "titulo", "feedback.titulo", "mensagem.titulo"],
    resultado === "CORRETA"
      ? "Boa decis\u00e3o!"
      : resultado === "PARCIAL"
        ? "Voc\u00ea evitou o risco, mas..."
        : "Isso era um golpe"
  );

  const mensagemFeedback = pickValue(
    state,
    ["mensagemFeedback", "mensagem", "feedback.mensagem", "explicacao", "descricao"],
    "Observe os sinais do golpe e tente escolher a atitude mais segura."
  );

  const dica = pickValue(
    state,
    [
      "dica",
      "dicaFeedback",
      "dicaEducativa",
      "feedback.dica",
      "resposta.dica",
      "alternativa.dica",
      "orientacao",
      "recomendacao",
    ],
    "Desconfie de mensagens urgentes, links desconhecidos e pedidos de dados pessoais."
  );

  localStorage.setItem("pontuacaoTotal", String(pontuacaoTotal));

  const cenariosConcluidos =
    JSON.parse(localStorage.getItem("cenariosConcluidos")) || [];

  const cenarioAtual = Number(localStorage.getItem("cenarioAtual"));

  if (cenarioAtual && !cenariosConcluidos.includes(cenarioAtual)) {
    cenariosConcluidos.push(cenarioAtual);

    localStorage.setItem(
      "cenariosConcluidos",
      JSON.stringify(cenariosConcluidos)
    );
  }

  const terminouTreinamento = cenariosConcluidos.length >= 5;
  const feedbackClass = `feedback-card feedback-card--${resultado.toLowerCase()}`;

  return (
    <main className="feedback-container">
      <section className={feedbackClass}>
        <div className="feedback-icon" aria-hidden="true">
          {resultado === "CORRETA" ? "\u2713" : resultado === "PARCIAL" ? "!" : "\u00d7"}
        </div>

        <p className="feedback-label">Resultado</p>

        <h1>{tituloFeedback}</h1>

        <p className="feedback-message">{mensagemFeedback}</p>

        <div className="feedback-score">
          <span>+{pontosGanhos} pontos</span>
          <strong>Total: {pontuacaoTotal} pontos</strong>
        </div>

        <div className="feedback-tip">
          <strong>Dica de prote&ccedil;&atilde;o</strong>
          <p>{dica}</p>
        </div>

        <div className="feedback-actions">
          {!terminouTreinamento ? (
            <Button onClick={() => navigate("/cenarios")}>
              Escolher outro cen&aacute;rio
            </Button>
          ) : (
            <Button onClick={() => navigate("/conclusao")}>
              Finalizar treinamento
            </Button>
          )}

          <Button className="button-secondary" onClick={() => navigate("/ranking")}>
            Ver ranking
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Feedback;
