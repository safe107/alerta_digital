import Button from "../Button/Button";

import "./ErrorMessage.css";

function ErrorMessage({ mensagem, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <h2>Ops...</h2>

        <p>{mensagem}</p>

        <Button onClick={onRetry}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}

export default ErrorMessage;