const API_URL = "http://localhost:8080";

export async function criarJogador(nome) {
  const response = await fetch(`${API_URL}/jogadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar jogador");
  }

  return response.json();
}

export async function buscarCenarios() {
  const response = await fetch(`${API_URL}/cenarios`);
  return response.json();
}

export async function buscarCenarioPorId(id) {
  const response = await fetch(`${API_URL}/cenarios/${id}`);
  return response.json();
}

export async function responder(alternativaId, jogadorId) {
  const response = await fetch(`${API_URL}/respostas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      alternativaId,
      jogadorId,
    }),
  });

  return response.json();
}

export async function buscarRanking() {
  const response = await fetch(`${API_URL}/ranking`);
  return response.json();
}