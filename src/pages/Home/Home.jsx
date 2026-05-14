import { useNavigate } from "react-router-dom";
import BrandMark from "../../components/BrandMark/BrandMark";
import Button from "../../components/Button/Button";
import "./Home.css";
import PageTransition from "../../components/PageTransition/PageTransition";

function Home() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <main className="home-container">
        <section className="home-card" aria-labelledby="home-title">
          <BrandMark />

          <div className="home-content">
            <h1 id="home-title">Aprenda a identificar golpes digitais</h1>

            <p>
              Treine com situa&ccedil;&otilde;es simuladas, parecidas com mensagens
              reais, e ganhe confian&ccedil;a para se proteger no dia a dia.
            </p>
          </div>

          <Button className="home-button" onClick={() => navigate("/como-funciona")}>
            Iniciar
          </Button>
        </section>
      </main>
    </PageTransition>
  );
}

export default Home;
