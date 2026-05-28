import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PageTransition from "../../components/PageTransition/PageTransition";

import "./ComoFunciona.css";

function ComoFunciona() {
  const navigate = useNavigate();

  const passos = [
    "Voc\u00ea ver\u00e1 situa\u00e7\u00f5es inspiradas em golpes digitais reais no whatsapp.",
    "Leia as mensagens com calma e aten\u00e7\u00e3o.",
    "Escolha a atitude que parece mais segura.",
    "Receba feedback, pontos e uma dica de prote\u00e7\u00e3o.",
    "Acompanhe seu resultado no ranking.",
  ];

  return (
    <PageTransition>
      <main className="como-container">
        <section className="como-card">
          <p className="page-kicker">Treinamento interativo</p>
          <h1>Como funciona?</h1>

          <div className="como-passos">
            {passos.map((passo, index) => (
              <p key={passo}>
                <span>{index + 1}</span>
                {passo}
              </p>
            ))}
          </div>

          <Button onClick={() => navigate("/jogador")}>Come&ccedil;ar</Button>
        </section>
      </main>
    </PageTransition>
  );
}

export default ComoFunciona;
