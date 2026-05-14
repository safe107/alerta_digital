import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import { buscarCenarioPorId, responder } from "../../api/api";

import ChatBubble from "../../components/ChatBubble/ChatBubble";
import AlternativaButton from "../../components/AlternativaButton/AlternativaButton";
import Loading from "../../components/Loading/Loading";

import "./Jogo.css";

function Jogo() {
  const [cenario, setCenario] = useState(null);
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);

  const chatRef = useRef(null);
  const { id } = useParams();
  const numeroCenario = Number(id);
  localStorage.setItem("cenarioAtual", numeroCenario);
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

  useEffect(() => {
    if (!cenario || !cenario.mensagens) return;

    const timers = [];

    cenario.mensagens.forEach((mensagem, index) => {
      const timer = setTimeout(() => {
        setMensagensVisiveis((prev) => [...prev, mensagem]);
      }, index * 1200);

      timers.push(timer);
    });

    return () => {
      setMensagensVisiveis([]);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [cenario]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagensVisiveis]);

  async function handleResponder(alternativaId) {
    try {
      const jogadorId = localStorage.getItem("jogadorId");

      const resposta = await responder(alternativaId, jogadorId);

      navigate("/feedback", {
        state: resposta,
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao responder");
    }
  }

  if (!cenario) {
    return <Loading />;
  }

  <header className="chat-header">
    <div className="progresso-container">
      <div
        className="progresso-barra"
        style={{
          width: `${(numeroCenario / 5) * 100}%`,
        }}
      ></div>
    </div>

    <p className="progresso-texto">Cenário {numeroCenario} de 5</p>
    <div className="chat-avatar">
      {cenario.mensagens[0]?.remetente?.charAt(0)}
    </div>

    <div>
      <strong>{cenario.mensagens[0]?.remetente}</strong>

      <p>online</p>
    </div>
  </header>;

  return (
    <PageTransition>
      <main className="home-container">
        <section className="chat-container" ref={chatRef}>
          {mensagensVisiveis.map((mensagem) => (
            <ChatBubble
              key={mensagem.id}
              texto={mensagem.texto}
              remetente={mensagem.remetente}
            />
          ))}
        </section>

        <div className="chat-input-fake">Digite uma mensagem...</div>

        {mensagensVisiveis.length === cenario.mensagens.length && (
          <section className="alternativas-container">
            <h2>{cenario.pergunta.enunciado}</h2>

            {cenario.alternativas.map((alternativa) => (
              <AlternativaButton
                key={alternativa.id}
                texto={alternativa.texto}
                onClick={() => handleResponder(alternativa.id)}
              />
            ))}
          </section>
        )}
      </main>
    </PageTransition>
  );
}

export default Jogo;
