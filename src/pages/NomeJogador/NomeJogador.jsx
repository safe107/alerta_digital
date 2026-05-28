import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import Button from "../../components/Button/Button";
import { criarJogador } from "../../api/api";

import "./NomeJogador.css";

function NomeJogador() {
  const [nome, setNome] = useState("");
  const [jogadorSalvo, setJogadorSalvo] = useState(() => ({
    id: localStorage.getItem("jogadorId"),
    nome: localStorage.getItem("jogadorNome"),
    pontuacao: localStorage.getItem("pontuacaoTotal") || "0",
    cenariosConcluidos: JSON.parse(localStorage.getItem("cenariosConcluidos")) || [],
  }));
  const navigate = useNavigate();

  function limparProgresso() {
    localStorage.removeItem("jogadorId");
    localStorage.removeItem("jogadorNome");
    localStorage.removeItem("cenarioAtual");
    localStorage.removeItem("cenariosConcluidos");
    localStorage.removeItem("pontuacaoTotal");

    setJogadorSalvo({
      id: null,
      nome: null,
      pontuacao: "0",
      cenariosConcluidos: [],
    });
    setNome("");
  }

  function continuarProgresso() {
    if (jogadorSalvo.cenariosConcluidos.length >= 5) {
      navigate("/conclusao");
      return;
    }

    navigate("/cenarios");
  }

  async function handleCriarJogador() {
    if (!nome.trim()) {
      return;
    }

    try {
      const jogador = await criarJogador(nome.trim());

      localStorage.setItem("jogadorId", jogador.id);
      localStorage.setItem("jogadorNome", jogador.nome);
      localStorage.removeItem("cenarioAtual");
      localStorage.removeItem("cenariosConcluidos");
      localStorage.removeItem("pontuacaoTotal");

      navigate("/cenarios");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao criar jogador");
    }
  }

  return (
    <PageTransition>
      <main className="nome-container">
        <section className="nome-card">
          <p className="page-kicker">Identifica&ccedil;&atilde;o</p>
          <h1>Digite seu nome para come&ccedil;ar</h1>

          {jogadorSalvo.id && jogadorSalvo.nome && (
            <div className="nome-progress-card">
              <span>Progresso encontrado</span>
              <strong>{jogadorSalvo.nome}</strong>
              <p>
                {jogadorSalvo.cenariosConcluidos.length} cen&aacute;rio(s)
                conclu&iacute;do(s) &bull; {jogadorSalvo.pontuacao} pontos
              </p>

              <div className="nome-progress-actions">
                <button type="button" onClick={continuarProgresso}>
                  Continuar
                </button>
                <button type="button" onClick={limparProgresso}>
                  Novo jogador
                </button>
              </div>
            </div>
          )}

          <label className="nome-label" htmlFor="nome">
            Nome do jogador
          </label>

          <input
            id="nome"
            className="nome-input"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Button onClick={handleCriarJogador}>Continuar</Button>
        </section>

        <button
          type="button"
          className="nome-admin-button"
          onClick={() => navigate("/admin/login")}
        >
          Admin
        </button>
      </main>
    </PageTransition>
  );
}

export default NomeJogador;
