const API_URL = "http://localhost:8080";

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

async function adminRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAdminToken()}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error("Erro na operacao administrativa");
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function criarJogador(nome) {
  const response = await fetch(`${API_URL}/jogadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });

  if (!response.ok) {
    const detalhe = await response.text();
    let mensagem;
    try {
      const erro = JSON.parse(detalhe);
      mensagem = erro.mensagem;
    } catch {
      // Segue para a mensagem generica abaixo quando a resposta nao for JSON.
    }
    throw new Error(mensagem || detalhe || `Erro ao criar jogador (${response.status})`);
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

  if (!response.ok) {
    throw new Error("Erro ao registrar resposta");
  }

  return response.json();
}

export async function buscarRanking() {
  const response = await fetch(`${API_URL}/ranking`);
  return response.json();
}

export async function loginAdmin(usuario, senha) {
  const response = await fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, senha }),
  });

  if (!response.ok) {
    throw new Error("Usuario ou senha invalidos");
  }

  return response.json();
}

export const adminApi = {
  listarCenarios: () => adminRequest("/admin/cenarios"),
  criarCenario: (dados) => adminRequest("/admin/cenarios", {
    method: "POST",
    body: JSON.stringify(dados),
  }),
  atualizarCenario: (id, dados) => adminRequest(`/admin/cenarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  }),
  excluirCenario: (id) => adminRequest(`/admin/cenarios/${id}`, { method: "DELETE" }),

  listarMensagens: (cenarioId = "") => adminRequest(`/admin/mensagens${cenarioId ? `?cenarioId=${cenarioId}` : ""}`),
  criarMensagem: (dados) => adminRequest("/admin/mensagens", {
    method: "POST",
    body: JSON.stringify(dados),
  }),
  atualizarMensagem: (id, dados) => adminRequest(`/admin/mensagens/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  }),
  excluirMensagem: (id) => adminRequest(`/admin/mensagens/${id}`, { method: "DELETE" }),

  listarPerguntas: (cenarioId = "") => adminRequest(`/admin/perguntas${cenarioId ? `?cenarioId=${cenarioId}` : ""}`),
  criarPergunta: (dados) => adminRequest("/admin/perguntas", {
    method: "POST",
    body: JSON.stringify(dados),
  }),
  atualizarPergunta: (id, dados) => adminRequest(`/admin/perguntas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  }),
  excluirPergunta: (id) => adminRequest(`/admin/perguntas/${id}`, { method: "DELETE" }),

  listarAlternativas: (perguntaId = "") => adminRequest(`/admin/alternativas${perguntaId ? `?perguntaId=${perguntaId}` : ""}`),
  criarAlternativa: (dados) => adminRequest("/admin/alternativas", {
    method: "POST",
    body: JSON.stringify(dados),
  }),
  atualizarAlternativa: (id, dados) => adminRequest(`/admin/alternativas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  }),
  excluirAlternativa: (id) => adminRequest(`/admin/alternativas/${id}`, { method: "DELETE" }),

  listarFeedbacks: () => adminRequest("/admin/feedbacks"),
  criarFeedback: (dados) => adminRequest("/admin/feedbacks", {
    method: "POST",
    body: JSON.stringify(dados),
  }),
  atualizarFeedback: (id, dados) => adminRequest(`/admin/feedbacks/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  }),
  excluirFeedback: (id) => adminRequest(`/admin/feedbacks/${id}`, { method: "DELETE" }),

  listarRanking: () => adminRequest("/admin/ranking"),
  atualizarPontuacao: (id, pontuacaoTotal) => adminRequest(`/admin/ranking/${id}`, {
    method: "PUT",
    body: JSON.stringify({ pontuacaoTotal }),
  }),
  resetarRanking: () => adminRequest("/admin/ranking/reset", { method: "POST" }),
  excluirJogador: (id) => adminRequest(`/admin/ranking/${id}`, { method: "DELETE" }),
};
