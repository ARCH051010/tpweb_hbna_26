import { useState } from "react";
import {  Link } from "react-router-dom";
import "./navbar.css";
import Logo from "../logo/Logo";

{/* Enlaces de navegación, array con los datos de cada enlace */}
const navLinks = [
  { label: "Facultad", href: "#facultad" },
  { label: "Noticias", href: "#noticias" },
  { label: "Investigación", href: "#investigacion" },
  { label: "Extensión Universitaria", href: "#extension" },
  { label: "Consejo de Dirección", href: "#consejo-direccion" },
];

export default function Navbar() {

  /* Estado para controlar si el menú de navegación está abierto o cerrado*/
  const [menuOpen, setMenuOpen] = useState(false);
  
  /* Función para cerrar el menú de hamburguesa */
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-contenedor">
        
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <Logo size={65} />
        </Link>

        {/* Botón de Hamburguesa (Móvil) */}
        <button 
          className="boton-menu" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Enlaces del Menú cuando se presiona el botón de hamburguesa */}
        <nav className={`menu-navegacion ${menuOpen ? "abierto" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="enlace" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}