import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageTransition from "../../components/PageTransition/PageTransition";

import { buscarCenarios } from "../../api/api";

import CardCenario from "../../components/CardCenario/CardCenario";
import Loading from "../../components/Loading/Loading";

import "./Cenarios.css";

function Cenarios() {
  const [cenarios, setCenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const cenariosConcluidos =
    JSON.parse(localStorage.getItem("cenariosConcluidos")) || [];

  useEffect(() => {
    const jogadorId = localStorage.getItem("jogadorId");

    if (!jogadorId) {
      navigate("/jogador");
    }
  }, [navigate]);

  useEffect(() => {
    async function carregarCenarios() {
      try {
        const data = await buscarCenarios();
        setCenarios(data);
      } catch (error) {
        console.error(error);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    carregarCenarios();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (erro) {
    return (
      <ErrorMessage
        mensagem={"N\u00e3o foi poss\u00edvel carregar os cen\u00e1rios."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <PageTransition>
      <main className="cenarios-container">
        <header className="cenarios-header">
          <p className="page-kicker">Situa&ccedil;&otilde;es simuladas</p>
          <div>
            <h1>Escolha uma situa&ccedil;&atilde;o</h1>
            <p>
              Leia com aten&ccedil;&atilde;o, escolha a melhor atitude e aprenda
              como se proteger.
            </p>
          </div>
          <button className="ranking-link" onClick={() => navigate("/ranking")}>
            Ranking
          </button>
        </header>

        <section className="cenarios-grid">
          {cenarios.map((cenario) => (
            <CardCenario
              concluido={cenariosConcluidos.includes(cenario.id)}
              key={cenario.id}
              titulo={cenario.titulo}
              descricao={cenario.descricao}
              categoria={cenario.categoria}
              onClick={() => navigate(`/jogo/${cenario.id}`)}
            />
          ))}
        </section>
      </main>
    </PageTransition>
  );
}

export default Cenarios;
