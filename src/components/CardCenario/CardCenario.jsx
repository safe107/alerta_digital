import "./CardCenario.css";

function CardCenario({
  titulo,
  descricao,
  categoria,
  concluido,
  onClick,
}) {
  return (
    <article className="card-cenario" onClick={onClick}>
      <span className="card-categoria">{categoria}</span>

      <h2>{titulo}</h2>

      <p>{descricao}</p>

      {concluido && (
        <span className="cenario-concluido">
          ✔ Cenário concluído
        </span>
      )}

      <button className="card-button">
        Jogar cenário
      </button>
    </article>
  );
}

export default CardCenario;