import "./institucional.css";

export default function InstitutionalHero({ eyebrow, title, subtitle }) {
  return (
    <section className="inst-hero">
      <div className="inst-hero-content">
        {eyebrow && <p className="inst-hero-eyebrow">{eyebrow}</p>}
        <h1 className="inst-hero-title">{title}</h1>
        {subtitle && <p className="inst-hero-subtitle">{subtitle}</p>}
      </div>
      <div className="inst-hero-meta">
        <span>01 · COMUNIDAD FTI</span>
        <span className="inst-hero-line"></span>
        <span>UNIVERSIDAD DE LAS CIENCIAS INFORMÁTICAS</span>
      </div>
    </section>
  );
}