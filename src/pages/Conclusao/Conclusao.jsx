import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { buscarRanking } from "../../api/api";

import Button from "../../components/Button/Button";
import PageTransition from "../../components/PageTransition/PageTransition";
import Loading from "../../components/Loading/Loading";

import "./Conclusao.css";

function Conclusao() {
  const [pontuacaoFinal, setPontuacaoFinal] = useState(null);

  const navigate = useNavigate();

  const jogadorId = Number(localStorage.getItem("jogadorId"));
  const nome = localStorage.getItem("jogadorNome");

  useEffect(() => {
    async function carregarPontuacao() {
      try {
        const ranking = await buscarRanking();

        const jogadorAtual = ranking.find((jogador) => jogador.id === jogadorId);

        if (jogadorAtual) {
          setPontuacaoFinal(jogadorAtual.pontuacaoTotal);
        } else {
          setPontuacaoFinal(0);
        }
      } catch (error) {
        console.error(error);
        setPontuacaoFinal(0);
      }
    }

    carregarPontuacao();
  }, [jogadorId]);

  if (pontuacaoFinal === null) {
    return <Loading />;
  }

  return (
    <PageTransition>
      <main className="conclusao-container">
        <section className="conclusao-card">
          <h1>🎉 Parabéns!</h1>

          <h2>{nome}</h2>

          <p>Você concluiu o treinamento do Alerta Digital.</p>

          <div className="conclusao-pontuacao">
            Pontuação final: <strong>{pontuacaoFinal} pontos</strong>
          </div>

          <p>
            Agora você está mais preparado para identificar golpes digitais
            e agir com segurança na internet.
          </p>

          <div className="conclusao-alerta">
            Continue sempre desconfiando de:
            <ul>
              <li>Pedidos urgentes de dinheiro</li>
              <li>Links desconhecidos</li>
              <li>Promoções milagrosas</li>
              <li>Mensagens de números estranhos</li>
            </ul>
          </div>

          <Button onClick={() => navigate("/ranking")}>
            Ver Ranking Final
          </Button>
        </section>
      </main>
    </PageTransition>
  );
}

export default Conclusao;