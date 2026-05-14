import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import "./ComoFunciona.css";

function ComoFunciona() {
  const navigate = useNavigate();

  return (
    <main className="como-container">
      <section className="como-card">
        <h1>Como funciona?</h1>

        <div className="como-passos">
          <p>1. Você verá situações inspiradas em golpes digitais reais.</p>
          <p>2. Leia as mensagens com atenção.</p>
          <p>3. Escolha a atitude mais segura.</p>
          <p>4. Receba feedback e aprenda como se proteger.</p>
          <p>5. Ganhe pontos e acompanhe sua posição no ranking.</p>
        </div>

        <Button onClick={() => navigate("/jogador")}>
          Entendi
        </Button>
      </section>
    </main>
  );
}

export default ComoFunciona;