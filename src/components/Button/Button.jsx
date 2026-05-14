import "./Button.css";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button className={`button ${className}`.trim()} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
