import "./BrandMark.css";

function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark--compact" : ""}`.trim()}>
      <span className="brand-mark__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M24 8c-6.1 0-10.5 4.6-10.5 10.9v5.5c0 2.4-1.2 4.7-3.2 6.1l-1.6 1.1v3.1h30.6v-3.1l-1.6-1.1c-2-1.4-3.2-3.7-3.2-6.1v-5.5C34.5 12.6 30.1 8 24 8Z" />
          <path d="M19.4 38.2a5 5 0 0 0 9.2 0" />
        </svg>
      </span>

      <span className="brand-mark__name">Alerta Digital</span>
    </div>
  );
}

export default BrandMark;
