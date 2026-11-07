import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";
import Suggestion from "../Suggestion/Suggestion"; 
import { useState } from "react";
import "./footer.css";

// Datos de las columnas para que el codigo allá bajo sea menos 
const columnaQuienesSomos = {
  titulo: "Quiénes somos",
  items: [
    { texto: "Decanato FTI", url: "#!" },
    { texto: "Claustro Docente", url: "consejo-direccion" },
    { texto: "Consejo Científico", url: "#!" },
    { texto: "Federación Estudiantil (FEU)", url: "estudiantes-feu" },
  ]
};

const columnaContacto = {
  titulo: "Ubicación y Contacto",
  items: [
    { texto: '📍 Edificio Docente 5, "José Antonio Echeverría", Campus UCI, La Habana, Cuba.' }, 
    { texto: "✉️ fti@uci.cu", url: "mailto:fti@uci.cu" },
    { texto: "📞 (+53) 7 837 2500 · Ext. 2404", url: "tel:+5378372500" },
  ]
};

export default function Footer() {
  // Estado para manejar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <footer id="contacto" className="footer">
      <div className="footer-contenedor">
        
        <div className="footer-fila-principal">
          {/* Columna 1 */}
          <FooterBrand />

          {/* Columna 2 */}
          <div className="footer-col-enlaces">
            <FooterColumn 
              titulo={columnaQuienesSomos.titulo} 
              items={columnaQuienesSomos.items} 
            />
          </div>

          {/* Columna 3 */}
          <div className="footer-col-contacto">
            <FooterColumn 
              titulo={columnaContacto.titulo} 
              items={columnaContacto.items} 
            />

            {/* Botton para abrir el buzón de sugerencias */}
            <button 
              className="footer-btn-sugerencia" 
              onClick={() => setIsModalOpen(true)}
            >
              Buzón de sugerencias
            </button>

            {/* Panel para el buzón de sugerencias, se muestra si le dan un click */}
            <Suggestion
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />
            </div>
          </div>

        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} Facultad de Tecnologías Interactivas · UCI. Todos los derechos reservados.</span>  
          
          {/* Enlace para volver arriba */}
          <a href="#" className="footer-enlace-volver">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
    </>
  );
}