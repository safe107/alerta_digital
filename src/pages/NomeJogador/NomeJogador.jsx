import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";

import Button from "../../components/Button/Button";
import { criarJogador } from "../../api/api";

import "./NomeJogador.css";



function NomeJogador() {
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  async function handleCriarJogador() {
    try {
      const jogador = await criarJogador(nome);

      localStorage.setItem("jogadorId", jogador.id);
      localStorage.setItem("jogadorNome", jogador.nome);
      localStorage.removeItem("cenarioAtual");
      localStorage.removeItem("cenariosConcluidos");

      navigate("/cenarios");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar jogador");
    }
  }

  return (
    <PageTransition>
  <main className="home-container">
      <section className="nome-card">
        <h1>Qual é o seu nome?</h1>

        <p>
          Digite seu nome para começar sua jornada no Alerta Digital.
        </p>

        <input
          className="nome-input"
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Button onClick={handleCriarJogador}>
          Continuar
        </Button>
      </section>
    </main>
    </PageTransition>
  );
}

export default NomeJogador;