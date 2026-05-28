import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import { buscarCenarioPorId, responder } from "../../api/api";

import AlternativaButton from "../../components/AlternativaButton/AlternativaButton";
import Loading from "../../components/Loading/Loading";

import "./Alternativas.css";

function criarFeedbackLocal(alternativa) {
  const resultado = alternativa.tipoResultado || "ERRADA";
  const pontosGanhos = Number(alternativa.pontos) || 0;
  const pontuacaoAnterior = Number(localStorage.getItem("pontuacaoTotal")) || 0;
  const pontuacaoTotal = pontuacaoAnterior + pontosGanhos;

  const feedbacks = {
    CORRETA: {
      tituloFeedback: "Boa decis\u00e3o!",
      mensagemFeedback: "Voc\u00ea escolheu uma atitude segura para evitar o golpe.",
      dica: "Sempre confirme pedidos suspeitos por outro canal antes de agir.",
    },
    PARCIAL: {
      tituloFeedback: "Voc\u00ea evitou o risco, mas...",
      mensagemFeedback: "Sua escolha ajudou, mas ainda poderia deixar voc\u00ea exposto.",
      dica: "O ideal \u00e9 confirmar a informa\u00e7\u00e3o diretamente com a pessoa ou institui\u00e7\u00e3o oficial.",
    },
    ERRADA: {
      tituloFeedback: "Isso era um golpe",
      mensagemFeedback: "Golpistas usam urg\u00eancia para fazer a v\u00edtima agir sem pensar.",
      dica: "Nunca envie dinheiro, dados ou clique em links antes de confirmar se a mensagem \u00e9 verdadeira.",
    },
  };

  localStorage.setItem("pontuacaoTotal", String(pontuacaoTotal));

  return {
    resultado,
    pontosGanhos,
    pontuacaoTotal,
    ...feedbacks[resultado],
  };
}

function Alternativas() {
  const [cenario, setCenario] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const jogadorId = localStorage.getItem("jogadorId");

    if (!jogadorId) {
      navigate("/jogador");
    }
  }, [navigate]);

  useEffect(() => {
    async function carregarCenario() {
      try {
        const data = await buscarCenarioPorId(id);
        setCenario(data);
      } catch (error) {
        console.error(error);
      }
    }

    carregarCenario();
  }, [id]);

  async function handleResponder(alternativa) {
    try {
      const jogadorId = localStorage.getItem("jogadorId");
      const resposta = await responder(alternativa.id, jogadorId);

      navigate("/feedback", {
        state: resposta,
      });
    } catch (error) {
      console.error(error);

      navigate("/feedback", {
        state: criarFeedbackLocal(alternativa),
      });
    }
  }

  if (!cenario) {
    return <Loading />;
  }

  const dadosCenario = cenario.cenario || cenario;
  const pergunta = cenario.pergunta || {};
  const alternativas = cenario.alternativas || [];

  return (
    <PageTransition>
      <main className="alternativas-page">
        <section className="alternativas-card">
          <p className="page-kicker">{dadosCenario.titulo}</p>
          <h1>{pergunta.enunciado}</h1>

          <div className="alternativas-list">
            {alternativas.map((alternativa) => (
              <AlternativaButton
                key={alternativa.id}
                texto={alternativa.texto}
                onClick={() => handleResponder(alternativa)}
              />
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

export default Alternativas;
