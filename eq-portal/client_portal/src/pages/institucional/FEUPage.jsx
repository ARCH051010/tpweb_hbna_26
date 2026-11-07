import { useState, useEffect } from "react";
import { obtenerFEU } from "../../services/institucionalService";
import InstitutionalHero from "../../components/institucional/InstitutionalHero";
import InstitutionalIntro from "../../components/institucional/InstitucionalIntro";
import "../../components/institucional/institucional.css";

export default function FEUPage() {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    obtenerFEU().then(res => setMiembros(res)).catch(console.error);
  }, []);

  return (
    <div>
      <InstitutionalHero 
        eyebrow="COMUNIDAD FEU"
        title="Ideas, compromiso y participación para una universidad viva."
      />
      
      <InstitutionalIntro 
        eyebrow="REPRESENTACIÓN ESTUDIANTIL"
        title="Una facultad que se construye entre todos."
        description="La FEU conecta a estudiantes de distintos años y carreras. Su trabajo impulsa la participación, el intercambio de ideas y las iniciativas que dan forma a la comunidad universitaria."
      />

      {/* Callout box verde */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 3rem', padding: '0 2rem' }}>
        <div style={{ background: 'var(--color-primary)', color: 'white', padding: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ border: '1px solid var(--color-light)', color: 'var(--color-light)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-headings)' }}>
            FEU
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>La voz estudiantil tiene un lugar.</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Conoce la estructura de representación de la facultad y los frentes que acompañan la vida universitaria.</p>
          </div>
        </div>
      </div>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 className="inst-title" style={{ marginBottom: '2rem' }}>Nuestros Representantes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {miembros.map((m) => (
            <div key={m.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: 'var(--color-dark)', fontSize: '1.2rem' }}>{m.nombre} {m.apellidos}</h3>
              <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1rem' }}>{m.cargo}</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{m.biografia}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}