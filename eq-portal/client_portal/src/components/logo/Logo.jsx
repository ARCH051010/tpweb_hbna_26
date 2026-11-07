import logoImg from "../../assets/logo-caiman-removebg-preview.png";

export default function Logo({ size = 40, className = "" }) {
  return (
    <img 
      src={logoImg} 
      alt="Logo FTI Caimanes" 
      className={`logo-img ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        objectFit: "contain" 
      }} 
    />
  );
}