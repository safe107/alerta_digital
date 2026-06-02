import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import { buscarCenarioPorId } from "../../api/api";

import ChatBubble from "../../components/ChatBubble/ChatBubble";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";

import "./Jogo.css";

function montarMensagensComLink(mensagens, cenarioId) {
  if (!mensagens.length) {
    return [];
  }

  return [
    ...mensagens,
    {
      id: `link-visual-${cenarioId}`,
      texto: "https://clique aqui.com.br",
      remetente: mensagens[0]?.remetente,
      linkVisual: true,
    },
  ];
}

function Jogo() {
  const [cenario, setCenario] = useState(null);
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);

  const chatRef = useRef(null);
  const { id } = useParams();
  const numeroCenario = Number(id);
  const navigate = useNavigate();

  localStorage.setItem("cenarioAtual", numeroCenario);

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
    const mensagensComLink = montarMensagensComLink(cenario.mensagens, id);

    mensagensComLink.forEach((mensagem, index) => {
      const timer = setTimeout(() => {
        setMensagensVisiveis((prev) => [...prev, mensagem]);
      }, index * 1200);

      timers.push(timer);
    });

    return () => {
      setMensagensVisiveis([]);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [cenario, id]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagensVisiveis]);

  if (!cenario) {
    return <Loading />;
  }

  const dadosCenario = cenario.cenario || cenario;
  const mensagens = montarMensagensComLink(cenario.mensagens || [], id);
  const remetente = mensagens?.[0]?.remetente || "Contato desconhecido";
  const progresso = Math.min((numeroCenario / 5) * 100, 100);
  const mensagensCarregadas = mensagensVisiveis.length === mensagens.length;

  return (
    <PageTransition>
      <main className="jogo-container">
        <section className="jogo-intro">
          <p className="page-kicker">Cen&aacute;rio {numeroCenario} de 5</p>
          <h1>{dadosCenario.titulo}</h1>
          <p>{dadosCenario.descricao}</p>

          <div className="progresso-container" aria-hidden="true">
            <div
              className="progresso-barra"
              style={{
                width: `${progresso}%`,
              }}
            />
          </div>
        </section>

        <section className="chat-shell">
          <header className="chat-header">
            <div className="chat-avatar">{remetente.charAt(0)}</div>

            <div>
              <strong>{remetente}</strong>
              <p>online</p>
            </div>
          </header>

          <div className="chat-container" ref={chatRef}>
            {mensagensVisiveis.map((mensagem) => (
              <ChatBubble
                key={mensagem.id}
                texto={mensagem.texto}
                remetente={mensagem.remetente}
                linkVisual={mensagem.linkVisual}
              />
            ))}

            {!mensagensCarregadas && (
              <div className="chat-loading">Digitando...</div>
            )}
          </div>

          <div className="chat-input-fake">Digite uma mensagem...</div>
        </section>

        {mensagensCarregadas && (
          <section className="jogo-responder">
            <Button onClick={() => navigate(`/jogo/${id}/alternativas`)}>
              Responder
            </Button>
          </section>
        )}
      </main>
    </PageTransition>
  );
}

export default Jogo;
