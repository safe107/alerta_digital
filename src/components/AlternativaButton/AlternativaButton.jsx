import "./AlternativaButton.css";

function AlternativaButton({ texto, onClick }) {
  return (
    <button className="alternativa-button" onClick={onClick}>
      {texto}
    </button>
  );
}

export default AlternativaButton;