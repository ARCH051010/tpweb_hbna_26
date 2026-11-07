import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "./theme-button.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === "light" ? (
        <FontAwesomeIcon icon={faMoon} /> // Icono de luna si estamos en claro
      ) : (
        <FontAwesomeIcon icon={faSun} /> // Icono de sol si estamos en oscuro
      )}
    </button>
  );
}