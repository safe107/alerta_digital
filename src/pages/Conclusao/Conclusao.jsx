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
          localStorage.setItem("pontuacaoTotal", String(jogadorAtual.pontuacaoTotal));
        } else {
          setPontuacaoFinal(Number(localStorage.getItem("pontuacaoTotal")) || 0);
        }
      } catch (error) {
        console.error(error);
        setPontuacaoFinal(Number(localStorage.getItem("pontuacaoTotal")) || 0);
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
          <div className="conclusao-icon" aria-hidden="true">
            ✓
          </div>

          <p className="page-kicker">Treinamento conclu&iacute;do</p>
          <h1>Parab&eacute;ns, {nome}!</h1>

          <p>
            Voc&ecirc; concluiu o treinamento do Alerta Digital e est&aacute; mais
            preparado para reconhecer golpes digitais.
          </p>

          <div className="conclusao-pontuacao">
            Pontua&ccedil;&atilde;o final
            <strong>{pontuacaoFinal} pontos</strong>
          </div>

          <div className="conclusao-alerta">
            <strong>Continue desconfiando de:</strong>
            <ul>
              <li>Pedidos urgentes de dinheiro</li>
              <li>Links desconhecidos</li>
              <li>Promo&ccedil;&otilde;es milagrosas</li>
              <li>Mensagens de n&uacute;meros estranhos</li>
            </ul>
          </div>

          <Button onClick={() => navigate("/ranking")}>Ver ranking final</Button>
        </section>
      </main>
    </PageTransition>
  );
}

export default Conclusao;
