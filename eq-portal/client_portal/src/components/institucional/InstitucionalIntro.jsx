import "./institucional-intro.css";

export default function InstitutionalIntro({ eyebrow, title, description }) {
  return (
    <section className="inst-intro">
      
      {/* Columna Izquierda: Etiqueta y Título */}
      <div className="inst-intro-header">
        {eyebrow && <p className="inst-eyebrow">{eyebrow}</p>}
        <h2 className="inst-title">{title}</h2>
      </div>

      {/* Columna Derecha: Descripción */}
      <div className="inst-intro-text">
        <p>{description}</p>
      </div>
      
    </section>
  );
}