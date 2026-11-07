import { useState, useEffect } from "react";
import { obtenerConsejo } from "../../services/institucionalService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBook, faChartPie, faUsers } from '@fortawesome/free-solid-svg-icons';
import InstitutionalHero from "../../components/institucional/InstitutionalHero";
import InstitutionalIntro from "../../components/institucional/InstitucionalIntro";
import "../../components/institucional/institucional.css";

// Datos estáticos para las tarjetas de responsabilidades (basados en tu prototipo)
const RESPONSABILIDADES = [
  { id: 1, icon: faBuilding, cargo: "DECANATO", defaultName: "Nombre por actualizar", desc: "Dirección general y representación institucional de la facultad." },
  { id: 2, icon: faBook, cargo: "FORMACIÓN", defaultName: "Nombre por actualizar", desc: "Coordinación de los procesos docentes y la trayectoria académica." },
  { id: 3, icon: faChartPie, cargo: "INVESTIGACIÓN Y POSGRADO", defaultName: "Nombre por actualizar", desc: "Impulso a la investigación, la innovación y la formación avanzada." },
  { id: 4, icon: faUsers, cargo: "EXTENSIÓN UNIVERSITARIA", defaultName: "Nombre por actualizar", desc: "Vínculo de la facultad con la vida cultural y social de la comunidad." },
];

export default function ConsejoPage() {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    obtenerConsejo().then(res => setMiembros(res)).catch(console.error);
  }, []);

  return (
    <div>
      <InstitutionalHero 
        eyebrow="CONSEJO DE UNIVERSITARIO · FTI"
        title="Consejo de Dirección"
        subtitle="El equipo que articula la formación, la investigación y la vida universitaria de nuestra facultad."
      />
      
      <InstitutionalIntro 
        eyebrow="LIDERAZGO Y COORDINACIÓN"
        title="Una dirección al servicio de la comunidad."
        description="El Consejo de Dirección acompaña las prioridades de la Facultad de Tecnologías Interactivas y trabaja de manera coordinada con docentes, estudiantes y personal de apoyo."
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <p className="inst-eyebrow">COMPOSICIÓN</p>
        <h2 className="inst-title" style={{ marginBottom: '2rem' }}>Responsabilidades del Consejo</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {RESPONSABILIDADES.map((resp) => (
            <div key={resp.id} className="inst-role-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>0{resp.id} / 05</span>
                <div style={{ background: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <FontAwesomeIcon icon={resp.icon} />
                </div>
              </div>
              <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>{resp.cargo}</p>
              <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>
                {/* Buscamos si hay un nombre real en la BD para este cargo, si no, mostramos el texto por defecto */}
                {miembros.find(m => m.cargo.toUpperCase() === resp.cargo)?.nombre || resp.defaultName}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{resp.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}