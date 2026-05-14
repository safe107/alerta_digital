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
  const cenariosConcluidos =
  JSON.parse(localStorage.getItem("cenariosConcluidos")) || [];

  const navigate = useNavigate();

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
      mensagem="Não foi possível carregar os cenários."
      onRetry={() => window.location.reload()}
    />
  );
}

  return (
    <PageTransition>
  <main className="home-container">
      <header className="cenarios-header">
  <h1>Escolha um cenário</h1>
  <p>
    Cada cenário simula uma situação comum de golpe digital. Leia com atenção,
    escolha a melhor atitude e aprenda como se proteger.
  </p>
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