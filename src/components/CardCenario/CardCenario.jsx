import "./CardCenario.css";

const categoriaIcones = {
  WhatsApp: "!",
  Banco: "$",
  Loja: "%",
  Cartao: "#",
  "Cart\u00e3o": "#",
  Pix: "$",
};

function CardCenario({
  titulo,
  descricao,
  categoria,
  concluido,
  onClick,
}) {
  const icone = categoriaIcones[categoria] || "!";

  return (
    <article className="card-cenario" onClick={onClick}>
      <div className="card-cenario__icon" aria-hidden="true">
        {icone}
      </div>

      <span className="card-categoria">{categoria}</span>

      <h2>{titulo}</h2>

      <p>{descricao}</p>

      {concluido && (
        <span className="cenario-concluido">Cen&aacute;rio conclu&iacute;do</span>
      )}

      <button className="card-button">Jogar cen&aacute;rio</button>
    </article>
  );
}

export default CardCenario;
